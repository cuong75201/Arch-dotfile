#!/bin/zsh
STATE_FILE="$HOME/.cache/battery_notify_state"
BATTERY=$(upower -i $(upower -e | grep 'BAT') | grep percentage | awk '{print $2}' | tr -d '%')

# Create state file if it doesn't exist
if [ ! -f "$STATE_FILE" ]; then
    echo "normal_notified=0" > "$STATE_FILE"
    echo "critical_notified=0" >> "$STATE_FILE"
fi

# Load previous state
source "$STATE_FILE"

# Notify when battery is below 20% (only once)
if [ "$BATTERY" -lt 101 ] && [ "$normal_notified" -eq 0 ]; then
    notify-send -u normal "⚠️  BATTERY LOW" "Battery level is below 20%. Please prepare to plug in the charger."
    sed -i 's/normal_notified=0/normal_notified=1/' "$STATE_FILE"
fi

# Notify when battery is below 5% (only once)
if [ "$BATTERY" -lt 5 ] && [ "$critical_notified" -eq 0 ]; then
    notify-send -u critical "⚠️ BATTERY CRITICAL" "Battery level is below 5%! Plug in the charger immediately!"
    sed -i 's/critical_notified=0/critical_notified=1/' "$STATE_FILE"
fi

# Reset state when battery goes above 20% again
if [ "$BATTERY" -gt 20 ]; then
    sed -i 's/normal_notified=1/normal_notified=0/' "$STATE_FILE"
    sed -i 's/critical_notified=1/critical_notified=0/' "$STATE_FILE"
fi