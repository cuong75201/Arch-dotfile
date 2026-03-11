#!/bin/sh


datetime=$(date "+%a %d/%m %H:%M")  

color="#fabd2f"

printf "^c%s^%s ^d^\n" "$color" "$datetime"
