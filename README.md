**WHIP CURSOR — INSTALLATION GUIDE
**
Ubuntu GNOME 46 • Wayland

Whip Cursor adds a whip animation whenever you left-click.

***************************************************************************************
_HOW IT WORKS_

    Physical Mouse
          |
          v
    Python Daemon
          |
          +---- passes mouse events through
          |
          +---- writes /tmp/whip-cursor-trigger
                    |
                    v
          GNOME Whip Extension
                    |
                    v
              Whip Animation
              
****************************************************************************************


The project has two separate components:

1.  GNOME Extension Displays the whip animation.
2.  Python Mouse Daemon Detects the physical left-click and triggers the
    GNOME extension.

No D-Bus is required. for now :P sa bisaya ngayun lang uy

REQUIREMENTS
-   Ubuntu with GNOME Shell v46
-   bash: Wayland session
-   A physical mouse ofc
-   Py3

PROJECT STRUCTURE

After downloading/cloning the repository:

~/whip-cursor/
│
├── daemon/
│   └── whip-daemon.py
│
└── extension/
    ├── metadata.json
    ├── extension.js
    └── assets/
        ├── whip_frame_01_rest.svg
        ├── whip_frame_02_windup.svg
        ├── whip_frame_03_overhead.svg
        ├── whip_frame_04_throw.svg
        ├── whip_frame_05_wave.svg
        ├── whip_frame_06_straighten.svg
        ├── whip_frame_07_crack.svg
        ├── whip_frame_08_rebound.svg
        └── whip_frame_09_settle.svg

**PART 1 — GNOME EXTENSION**
**STEP 1** — Download the repository

Clone the repository:

    git clone {"/url"}

Then:

    cd ~/whip-cursor

**STEP 2** — Install the extension

Create the GNOME extension directory:

    mkdir -p ~/.local/share/gnome-shell/extensions/whip-cursor@local

Copy the extension files:

    cp extension/metadata.json ~/.local/share/gnome-shell/extensions/whip-cursor@local/
    cp extension/extension.js ~/.local/share/gnome-shell/extensions/whip-cursor@local/

Copy the animation assets:

    mkdir -p ~/.local/share/gnome-shell/extensions/whip-cursor@local/assets
    cp extension/assets/*.svg ~/.local/share/gnome-shell/extensions/whip-cursor@local/assets/

**STEP 3** — Enable the extension

    gnome-extensions enable whip-cursor@local

**STEP 4** — Log out and log back in

Because GNOME Shell is running under Wayland, log out and log back in after installing or updating the extension.

You can log out normally, or run:

    gnome-session-quit --logout --no-prompt

**PART 2 — PYTHON MOUSE DAEMON**

**STEP 1** — Install Python evdev

    sudo apt update
    sudo apt install python3-evdev

**STEP 2** — Add the user to the input group

    sudo usermod -aG input "$USER"

Log out and log back in after running this command.

Check:

    groups

You should see:

    input

**STEP 3** — Enable Linux uinput

    sudo modprobe uinput

**STEP 4** — Configure uinput permissions

Create the udev rule:

    sudo nano /etc/udev/rules.d/99-whip-cursor.rules

Add:

    KERNEL=="uinput", GROUP="input", MODE="0660"

Save the file, then run:

    sudo udevadm control --reload-rules
    sudo udevadm trigger
    sudo modprobe uinput

**STEP 5** — Run the daemon

From the repository:

    cd ~/whip-cursor/daemon

Run:

    python3 whip-daemon.py

IMPORTANT: Do NOT run the daemon with sudo.

You should see:

    ==============================
           WHIP CURSOR READY
    ==============================

    Every left click = WHIP

After installation:

1.  Make sure the GNOME extension is enabled.
2.  Start the daemon:

        cd ~/whip-cursor/daemon
        python3 whip-daemon.py

3.  Leave the daemon terminal running.
4.  Left-click anywhere.




STOPPING WHIP CURSOR

Stop the Python daemon:

    Ctrl+C

Disable the GNOME extension:

    gnome-extensions disable whip-cursor@local

UPDATING FROM GITHUB

After downloading a newer version:

    cd ~/whip-cursor

Update the extension:

    cp extension/metadata.json ~/.local/share/gnome-shell/extensions/whip-cursor@local/
    cp extension/extension.js ~/.local/share/gnome-shell/extensions/whip-cursor@local/
    cp extension/assets/*.svg ~/.local/share/gnome-shell/extensions/whip-cursor@local/assets/

Then log out and log back in.

Update the daemon by replacing:

    daemon/whip-daemon.py

with the newer version from the repository.

NOTES

-   Run the Python daemon as the logged-in user, not with sudo ;)
-   The GNOME extension handles the visual animation.
-   The Python daemon handles mouse-click detection.
-   The trigger file is /tmp/whip-cursor-trigger.
-   GNOME Shell 46 is the target version kasi yun yung meron!!.
