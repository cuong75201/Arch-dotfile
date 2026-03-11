#!/bin/sh

export XDG_SESSION_TYPE=x11
export XDG_CURRENT_DESKTOP=dwm
export DESKTOP_SESSION=dwm
export GTK_USE_PORTAL=1


flameshot &
dwmblocks &
feh --bg-fill ~/Pictures/wallpapers/thumb-1920-1362052.png &
nm-applet &

exec dbus-run-session -- sh -c 'fcitx5 & exec dwm'
