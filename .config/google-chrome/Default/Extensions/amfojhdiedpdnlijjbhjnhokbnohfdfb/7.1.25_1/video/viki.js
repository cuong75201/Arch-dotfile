
window.currentLanguage = '';

window.setInterval(() => {
  const player = document.querySelector("#vmplayer_id_html5_api");
  if (player) {
    if (!window.isLoaded) {
      window.isLoaded = true;
      window.dispatchEvent(new CustomEvent("ejoyVideoReady"));
      window.dispatchEvent(new CustomEvent("ejoySubtitlesChanged", { detail: window.currentLanguage }));
    }
  } else {
    window.isLoaded = false;
  }
}, 500);

(open => {
  XMLHttpRequest.prototype.open = function (method, url) {
    if (method === 'GET' && url.indexOf('timed_comments/all') > 0) {
      window.dispatchEvent(new CustomEvent("ejoy_get_all_lang_sub", { detail: { url } }));
    } else if (url.match(/\/subtitles\//g) !== null) {
      let lang = '';
      try {
        lang = url.split('/subtitles/')[1].split('.')[0];
      } catch (error) {

      }
      window.currentLanguage = lang;
      window.dispatchEvent(new CustomEvent("ejoySubtitlesChanged", { detail: lang }));
    }
    open.call(this, method, url);
  };
})(XMLHttpRequest.prototype.open);

