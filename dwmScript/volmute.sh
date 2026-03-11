#!/bin/bash
amixer set Master toggle >/dev/null
pkill -RTMIN+1 dwmblocks
