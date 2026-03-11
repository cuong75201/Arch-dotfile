#!/bin/sh

wifi=$(nmcli -t -f ACTIVE,SSID dev wifi | grep '^yes' | cut -d: -f2)

if [ -n "$wifi" ]; then
    echo "  $wifi"
else
    echo "󰖪  No WiFi "
fi
