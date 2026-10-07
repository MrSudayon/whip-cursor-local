import St from 'gi://St';
import GLib from 'gi://GLib';
import Gio from 'gi://Gio';

import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';

export default class WhipCursor extends Extension {
    enable() {
        console.log('WHIP: ENABLED');

        this._triggerFile = '/tmp/whip-cursor-trigger';
        this._lastSize = 0;
        this._animations = [];

        // Make sure the trigger file exists.
        try {
            const file = Gio.File.new_for_path(this._triggerFile);

            if (!file.query_exists(null)) {
                file.create(
                    Gio.FileCreateFlags.NONE,
                    null
                );
            }
        } catch (error) {
            console.error(`WHIP: Could not create trigger file: ${error}`);
        }

        // Remember current file size so old clicks don't replay.
        this._updateTriggerPosition();

        // Poll the trigger file.
        this._triggerTimer = GLib.timeout_add(
            GLib.PRIORITY_DEFAULT,
            30,
            () => {
                this._checkTriggerFile();

                return GLib.SOURCE_CONTINUE;
            }
        );

        console.log('WHIP: READY');
    }

    _updateTriggerPosition() {
        try {
            const file = Gio.File.new_for_path(this._triggerFile);
            const info = file.query_info(
                'standard::size',
                Gio.FileQueryInfoFlags.NONE,
                null
            );

            this._lastSize = info.get_size();
        } catch (error) {
            this._lastSize = 0;
        }
    }

    _checkTriggerFile() {
        try {
            const file = Gio.File.new_for_path(this._triggerFile);

            if (!file.query_exists(null)) {
                return;
            }

            const [success, contents] = file.load_contents(null);

            if (!success) {
                return;
            }

            const text = new TextDecoder().decode(contents);
            const currentSize = contents.length;

            // File was truncated/reset.
            if (currentSize < this._lastSize) {
                this._lastSize = 0;
            }

            if (currentSize > this._lastSize) {
                const newData = text.substring(this._lastSize);

                const lines = newData
                    .split('\n')
                    .filter(line => line.trim() !== '');

                for (const line of lines) {
                    this._showWhip();
                }

                this._lastSize = currentSize;
            }
        } catch (error) {
            console.error(`WHIP: Trigger error: ${error}`);
        }
    }

    _showWhip() {
        const [x, y] = global.get_pointer();

        console.log(`WHIP: CLICK at ${x}, ${y}`);

        const actor = new St.Widget({
            width: 300,
            height: 180,
            reactive: false,
        });

        Main.layoutManager.addChrome(actor);

        actor.set_position(
            x - 700,
            y - 400
        );

        this._animations.push(actor);

        this._animateWhip(actor, 0);
    }

    _animateWhip(actor, frame) {
        const frames = [
            'whip_frame_01_rest.svg',
            'whip_frame_02_windup.svg',
            'whip_frame_03_overhead.svg',
            'whip_frame_04_throw.svg',
            'whip_frame_05_wave.svg',
            'whip_frame_06_straighten.svg',
            'whip_frame_07_crack.svg',
            'whip_frame_08_rebound.svg',
            'whip_frame_09_settle.svg',
        ];

        if (frame >= frames.length) {
            this._removeAnimation(actor);
            return;
        }

        // Remove previous frame.
        actor.destroy_all_children();

        const filename = frames[frame];

        const file = Gio.File.new_for_path(
            `${this.path}/assets/${filename}`
        );

        const icon = new St.Icon({
            gicon: new Gio.FileIcon({
                file: file,
            }),
            icon_size: 850,
        });

        actor.add_child(icon);

        GLib.timeout_add(
            GLib.PRIORITY_DEFAULT,
            35,
            () => {
                if (!actor || actor.destroyed) {
                    return GLib.SOURCE_REMOVE;
                }

                this._animateWhip(actor, frame + 1);

                return GLib.SOURCE_REMOVE;
            }
        );
    }

    _removeAnimation(actor) {
        const index = this._animations.indexOf(actor);

        if (index !== -1) {
            this._animations.splice(index, 1);
        }

        if (actor && !actor.destroyed) {
            actor.destroy();
        }
    }

    disable() {
        console.log('WHIP: DISABLED');

        if (this._triggerTimer) {
            GLib.source_remove(this._triggerTimer);
            this._triggerTimer = null;
        }

        for (const actor of this._animations) {
            if (actor && !actor.destroyed) {
                actor.destroy();
            }
        }

        this._animations = [];
    }
}
