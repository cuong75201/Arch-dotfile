#!/bin/sh

free -h | awk '/^Mem/ {
used = $3
total = $2
perc = used * 100 /total 
if (perc >= 80)
	color ="#fb4934"
else if (perc >=50)
	color = "#fabd2f"
else 
	color = "#00ff00"
printf"^c%s^RAM:%s/%s^d^\n",
color,
used,
total
 }' | sed s/i//g
