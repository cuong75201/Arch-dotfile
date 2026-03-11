#!/bin/zsh

bluetoothctl power on > /dev/null 2>&1
echo "Đang quét thiết bị Bluetooth..."

# Bật scan mode
bluetoothctl -t 10 scan on> /dev/null 2>&1 


# Hiển thị devices realtime
echo "Danh sách thiết bị (nhập MAC address để kết nối, 'q' để thoát):"
echo "-----------------------------------------------------------"

while true; do
    # Lấy danh sách devices hiện tại
    DEVICES=$(bluetoothctl devices 2>/dev/null)
    
    # Clear màn hình và hiển thị lại
    echo "Đang quét thiết bị Bluetooth..."
    echo "Danh sách thiết bị (nhập MAC address để kết nối, 'q' để thoát):"
    echo "-----------------------------------------------------------"
    
    if [ -z "$DEVICES" ]; then
        echo "(Chưa tìm thấy thiết bị nào...)"
    else
        echo "$DEVICES"
    fi
    
    echo "-----------------------------------------------------------"
    echo -n "Nhập MAC address: "
    
    # Đọc input với timeout 2 giây
    read -t 2 MAC_INPUT
    
    # Nếu có input
    if [ -n "$MAC_INPUT" ]; then
        if [ "$MAC_INPUT" = "q" ] || [ "$MAC_INPUT" = "Q" ]; then
            echo "Thoát..."
            kill $SCAN_PID 2>/dev/null
            bluetoothctl scan off > /dev/null 2>&1
            exit 0
        fi

        
        # Kiểm tra MAC có trong danh sách không
        if echo "$DEVICES" | grep -q "$MAC_INPUT"; then
            echo "Đang kết nối đến $MAC_INPUT..."
            kill $SCAN_PID 2>/dev/null
            bluetoothctl scan off > /dev/null 2>&1
            
            # Kết nối
            bluetoothctl connect "$MAC_INPUT"
            exit 0
        else
            echo "MAC address không hợp lệ! Thử lại..."
            sleep 2
        fi
    fi
done