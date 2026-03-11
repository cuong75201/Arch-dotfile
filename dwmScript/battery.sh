#!/bin/sh

BAT="BAT0"
BASE="/sys/class/power_supply/$BAT"

[ ! -d "$BASE" ] && exit 0

cap=$(cat "$BASE/capacity")
stat=$(cat "$BASE/status")


GREEN="^c#98c379^"
YELLOW="^c#e5c07b^"
RED="^c#e06c75^"
BLUE="^c#61afef^"
RESET="^d^"

if [ "$cap" -ge 80 ]; then
    icon=""
    color="$GREEN"
elif [ "$cap" -ge 50 ]; then
    icon=""
    color="$YELLOW"
elif [ "$cap" -ge 20 ]; then
    icon=""
    color="$RED"
else
    icon=""
    color="$RED"
fi

if [ "$stat" = "Charging" ]; then
    icon=" $icon"
    color="$BLUE"
fi

echo "$color$icon $cap%$RESET"
