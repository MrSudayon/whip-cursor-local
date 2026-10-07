#!/usr/bin/env bash

set -e

cat > whip-01.svg <<'EOF'
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180">
<g fill="none" stroke="#4b2a18" stroke-width="9" stroke-linecap="round">
<path d="M25 135 Q55 105 80 110 Q105 115 130 80"/>
</g>
<path d="M25 135 Q55 105 80 110 Q105 115 130 80"
      fill="none" stroke="#a86f3d" stroke-width="4"/>
</svg>
EOF

cat > whip-02.svg <<'EOF'
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180">
<g fill="none" stroke="#4b2a18" stroke-width="9" stroke-linecap="round">
<path d="M25 135 Q60 95 90 105 Q120 115 150 65"/>
</g>
<path d="M25 135 Q60 95 90 105 Q120 115 150 65"
      fill="none" stroke="#a86f3d" stroke-width="4"/>
</svg>
EOF

cat > whip-03.svg <<'EOF'
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180">
<g fill="none" stroke="#4b2a18" stroke-width="9" stroke-linecap="round">
<path d="M25 135 Q65 85 100 100 Q135 115 165 45"/>
</g>
<path d="M25 135 Q65 85 100 100 Q135 115 165 45"
      fill="none" stroke="#a86f3d" stroke-width="4"/>
</svg>
EOF

cat > whip-04.svg <<'EOF'
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180">
<g fill="none" stroke="#4b2a18" stroke-width="9" stroke-linecap="round">
<path d="M25 135 Q70 70 110 90 Q145 105 170 30"/>
</g>
<path d="M25 135 Q70 70 110 90 Q145 105 170 30"
      fill="none" stroke="#a86f3d" stroke-width="4"/>
</svg>
EOF

cat > whip-05.svg <<'EOF'
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180">
<g fill="none" stroke="#4b2a18" stroke-width="8" stroke-linecap="round">
<path d="M25 135 Q70 65 115 80 Q150 90 172 18"/>
</g>
<path d="M25 135 Q70 65 115 80 Q150 90 172 18"
      fill="none" stroke="#a86f3d" stroke-width="3"/>
</svg>
EOF

cat > whip-06.svg <<'EOF'
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180">
<g fill="none" stroke="#4b2a18" stroke-width="7" stroke-linecap="round">
<path d="M25 135 Q75 55 120 70 Q155 80 175 8"/>
</g>
<path d="M25 135 Q75 55 120 70 Q155 80 175 8"
      fill="none" stroke="#c18a52" stroke-width="3"/>
</svg>
EOF

cat > whip-07.svg <<'EOF'
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180">
<g fill="none" stroke="#4b2a18" stroke-width="6" stroke-linecap="round">
<path d="M25 135 Q80 45 125 60 Q160 70 178 0"/>
</g>

<path d="M25 135 Q80 45 125 60 Q160 70 178 0"
      fill="none" stroke="#d19a61" stroke-width="2"/>

<g stroke="#ffffff" stroke-width="4" stroke-linecap="round">
<path d="M145 25 L170 5"/>
<path d="M150 35 L178 30"/>
<path d="M140 15 L145 -5"/>
</g>
</svg>
EOF

echo "Whip frames generated."
