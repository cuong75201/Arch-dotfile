#!/bin/bash

get_cpu() {
    awk '/^cpu /{print $2+$3+$4+$5+$6+$7+$8+$9, $5+$6}' /proc/stat
}

read total1 idle1 <<< $(get_cpu)
sleep 1
read total2 idle2 <<< $(get_cpu)

diff_idle=$((idle2 - idle1))
diff_total=$((total2 - total1))


cpu_usage=$(awk "BEGIN {printf \"%.1f\", 100 * ($diff_total - $diff_idle) / $diff_total}")


cpu_int=${cpu_usage%.*}


if (( cpu_int >= 80 )); then
    color="#fb4934"
elif (( cpu_int >= 50 )); then
    color="#fabd2f"
else
    color="#00ff00"
fi


printf "^c%s^CPU:%s%% ^d^\n" "$color" "$cpu_usage"
