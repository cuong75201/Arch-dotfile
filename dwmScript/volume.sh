#!/bin/sh

 amixer get Master | awk -F'[][]' 'END{
if ($4 =="on")
	printf "^c#83a598^  %d^d^\n", $2
else
	printf "^c#fb4934^  Mute^d^"
	
}'

