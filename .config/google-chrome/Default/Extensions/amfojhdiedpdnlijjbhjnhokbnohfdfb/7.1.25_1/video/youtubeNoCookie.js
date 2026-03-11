window.currentUrl = ''
const _setting = {
  subsToggleElement: "[role=\"main\"] .ytp-subtitles-button",
  subsToggleElementEmbed: "#player .ytp-subtitles-button",
  subsToggleElementAttrCheck: "aria-pressed",
  subsToggleElementAttrCheckValueTrue: "true",
  subsToggleElementAttrCheckValueFalse: "false",
  playerContainerSelector: "[role=\"main\"] .html5-video-player",
  playerContainerSelectorEmbed: "#player .html5-video-player",
  checkShowIcon: "[role=\"main\"] .ejoy-settings",
  checkShowIconEmbed: "#player .ejoy-settings",
  checkHasPreview: "ytd-browsefdsfsdfsdf",
  speedData: [
    0.25,
    0.5,
    0.75,
    1,
    1.25,
    1.5,
    1.75,
    2
  ],
  checkUrlRemovePreview: "youtube.com/watch?v"
}
let videoId = null;
let settingCache = null;
function detectVideoIdInDom() {
  const videoContainer = document.querySelector('[video-id]');

  if (videoContainer) {
    const id = videoContainer.getAttribute('video-id');
    if (id) return id;
  }

  return null;
}

function getSetting() {
  const host = window.location.host;
  if (settingCache) return settingCache;
  const settingConfigCheck = localStorage.getItem(`${host}_check`) || '';
  const settingConfig = localStorage.getItem(`${host}_config`);
  if (settingConfigCheck === 'true') settingCache = _setting
  if (settingConfig) {
    settingCache = JSON.parse(settingConfig);
    return settingCache
  }
  return _setting;
}

window.setInterval(() => {
  const setting = getSetting();
  const isEmbed = (location.pathname || '').startsWith('/embed')
  const player = document.querySelector(".video-stream.html5-main-video");
  const subsToggleElement = document.querySelector(".ytp-subtitles-button");
  if (window.location.href != window.currentUrl) {
    if (window.location.href.match(/embed\/[A-z0-9]*/) != null &&
      window.location.href.match(/embed\/[A-z0-9]*/).length > 0) {
        const videoEmbed = window.location.href.match(/embed\/[A-z0-9\-]*/)[0].split("/")[1];
        if (videoEmbed) {
          window.dispatchEvent(new CustomEvent("get_subtile_list", { detail: videoEmbed }));
          window.dispatchEvent(new CustomEvent("renderIconEjoy"));
          // window.dispatchEvent(new CustomEvent("ejoy_get_all_lang_sub", { detail: videoId }));
        }
    }
    window.dispatchEvent(new CustomEvent("ejoyGetVideoId"));
    window.currentUrl = window.location.href;
  }

  // if (player) {
  //   if (!window.isLoaded) {
  //     window.isLoaded = true;
  //     window.dispatchEvent(new CustomEvent("ejoyVideoReady"));
  //     window.dispatchEvent(new CustomEvent("ejoySubtitlesChanged", { detail: "" }));
  //   }
  // } else {
  //   window.isLoaded = false;
  // }

  if (player) {
    if (!window.isLoaded) {
      window.isLoaded = true;
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("ejoyVideoReady"));
        if (subsToggleElement && subsToggleElement.getAttribute(setting.subsToggleElementAttrCheck) === setting.subsToggleElementAttrCheckValueTrue) {
          player && player.toggleSubtitles && player.toggleSubtitles();
          player && player.toggleSubtitles && player.toggleSubtitles();
        } else {
          window.dispatchEvent(new CustomEvent("ejoySubtitlesChanged", { detail: "" }));
        }
      }, 500);
    }
  } else {
    window.isLoaded = false;
  }

  // if (subsToggleElement) {
  //   if (window.subtitlesEnabled && subsToggleElement.getAttribute("aria-pressed") === "false") {
  //     window.subtitlesEnabled = false;
  //     // window.dispatchEvent(new CustomEvent("ejoySubtitlesChanged", { detail: "" }));
  //   }
  // }

  if (window.isLoaded) {
    if (subsToggleElement) {
      if (window.subtitlesEnabled && subsToggleElement.getAttribute(setting.subsToggleElementAttrCheck) === setting.subsToggleElementAttrCheckValueFalse) {
        window.subtitlesEnabled = false;
        window.dispatchEvent(new CustomEvent("ejoySubtitlesChanged", { detail: "" }));
      }
    }

    let movieIdInDomMatch = detectVideoIdInDom();

    if (videoId && movieIdInDomMatch && videoId !== movieIdInDomMatch) {
      if(videoId !== movieIdInDomMatch){
        if(videoId){
          window.dispatchEvent(new CustomEvent("removeSubs", { }));
        }
      }
      videoId = movieIdInDomMatch;
      setTimeout(function () {
        if (subsToggleElement && subsToggleElement.getAttribute(setting.subsToggleElementAttrCheck) === setting.subsToggleElementAttrCheckValueTrue) {
          player && player.toggleSubtitles && player.toggleSubtitles();
          player && player.toggleSubtitles && player.toggleSubtitles();
        }
      }, 500);
    }

    if (!videoId && movieIdInDomMatch) {
      if(videoId !== movieIdInDomMatch){
        if(videoId){
          if(videoId){
            window.dispatchEvent(new CustomEvent("removeSubs", { }));
          }
        }
      }
      videoId = movieIdInDomMatch;
    }

    if (!document.querySelector(isEmbed ? setting.checkShowIconEmbed : setting.checkShowIcon)) {
      window.dispatchEvent(new CustomEvent("renderIconEjoy"));
    }
    if (window.location.href.indexOf(setting.checkUrlRemovePreview) > 0 && document.querySelector(setting.checkHasPreview)) {
      document.querySelector(setting.checkHasPreview).remove();
    }
  }

}, 500);

(open => {
  XMLHttpRequest.prototype.open = function (method, url) {
    if (url.match(/^http/g) !== null) {
      const urlObject = new URL(url);
      if (urlObject.pathname === "/api/timedtext") {
        window.subtitlesEnabled = true;
        const lang = urlObject.searchParams.get("tlang") || urlObject.searchParams.get("lang")
        window.dispatchEvent(new CustomEvent("ejoy_data",  { detail: urlObject.href, lang }));
        // window.dispatchEvent(
        //   new CustomEvent("ejoySubtitlesChanged", { detail: lang })
        // );
      }
    }
    open.call(this, method, url);
  };
})(XMLHttpRequest.prototype.open);


