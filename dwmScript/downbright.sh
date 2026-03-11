#!/bin/sh

brightnessctl set 10%- > /dev/null

pkill -RTMIN+2 dwmblocks
