
window.setInterval(() => {
  const player = document.querySelector(`.video-js video[src]`);

  if (player) {
    if (!window.isLoaded) {
      window.isLoaded = true;
      window.dispatchEvent(new CustomEvent("ejoyVideoReady"));
    }
  } else {
    window.isLoaded = false;
  }
}, 500);

(open => {
  XMLHttpRequest.prototype.open = function (method, url) {
    if (url.match(/^http/g) !== null) {
      const urlObject = new URL(url);
      if (method === 'GET' && urlObject.pathname.indexOf('getClosedCaptionsDetailsByMediaId') >= 0) {
        this.addEventListener('loadend', function (e) {
          window.dispatchEvent(new CustomEvent("ejoy_data", { detail: JSON.parse(e.currentTarget.responseText) }));
        })
      } else if (method === 'GET' && urlObject.pathname.indexOf('.vtt') >= 0) {
        window.dispatchEvent(new CustomEvent("ejoy_get_lang_from_href", { detail: url }));
      }
    }
    open.call(this, method, url);
  };
})(XMLHttpRequest.prototype.open);
