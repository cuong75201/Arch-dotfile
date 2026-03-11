if [ -z "${DISPLAY}" ] && [ "${XDG_VTNR}" -eq 1 ]; then
       startx 
fi
export GTK_IM_MODULE=fcitx5
export QT_IM_MODULE=fcitx5
export XMODIFIERS="@im=fcitx5"
export INPUT_METHOD=fcitx5
export SDL_IM_MODULE=fcitx5
