#!/bin/bash
amixer set Master 5%- >/dev/null
pkill -RTMIN+1 dwmblocks
