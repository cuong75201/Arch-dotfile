
brightnessctl -m | awk -F, '{
b = $4 + 0
if (b < 21)
	printf "^c#ebdbb2^󰃞 %d^d^\n", $4
else if (b < 71)
	printf "^c#ebdbb2^󰃟 %d^d^\n", $4
else 
	printf "^c#ebdbb2^󰃠 %d^d^\n", $4
 }'
