
window.subtitlesEnabled = false;
window.isFirstLoadSub = false;

function getSubByTrack(trackDom, srcVideoDom) {
  if (trackDom) {
    const lang = trackDom.getAttribute('srclang');
    window.isFirstLoadSub = true;
    window.currentLanguage = lang;
    const href = trackDom.getAttribute('src');
    const videoId = srcVideoDom.getAttribute('src').replace('//view.vzaar.com/', '').split('/')[0];
    window.subtitlesEnabled = true;
    const dataDetail = {
      href,
      lang,
      videoId,
    }
    window.dispatchEvent(new CustomEvent("ejoy_data", { detail: dataDetail }));
    window.dispatchEvent(
      new CustomEvent("ejoySubtitlesChanged", { detail: lang })
    );
  }
}


window.setInterval(() => {
  const player = document.querySelector(".video-js-video-player");
  const subsToggleElement = document.querySelector(".vjs-subs-caps-button .vjs-menu-content > .vjs-menu-item:first-child");

  if (player && subsToggleElement) {
    if (!window.isLoaded) {
      window.isLoaded = true;
      window.dispatchEvent(new CustomEvent("ejoyVideoReady"));
      window.dispatchEvent(
        new CustomEvent("get_all_sub_ejoy", {})
      );
      if (subsToggleElement.getAttribute("aria-checked") === "false") {
        player && player.toggleSubtitles && player.toggleSubtitles();
      } else {
        window.dispatchEvent(new CustomEvent("ejoySubtitlesChanged", { detail: '' }));
      }
    }
  } else {
    window.isFirstLoadSub = false;
    window.isLoaded = false;
  }

  if (subsToggleElement) {
    if (window.subtitlesEnabled && subsToggleElement.getAttribute("aria-checked") === "true") {
      window.subtitlesEnabled = false;
      window.dispatchEvent(new CustomEvent("ejoySubtitlesChanged", { detail: '' }));
    } else if (!window.subtitlesEnabled && subsToggleElement.getAttribute("aria-checked") === "false") {
      window.subtitlesEnabled = true;
      window.dispatchEvent(new CustomEvent("ejoySubtitlesChanged", { detail: window.currentLanguage }));
    }
  }
  const videoElm = document.querySelector(".video-js-video-player > video");
  if (videoElm && !window.isFirstLoadSub) {
    window.isFirstLoadSub = true;
    const textTracks = videoElm.textTracks;
    const srcVideoDom = document.querySelector(".video-js-video-player > video > source");
    textTracks.addEventListener("change", function (e) {
      let trackCur = null;
      for (var prop in e.currentTarget) {
        const track = e.currentTarget[prop];
        if (track && !!track.cues) {
          trackCur = track;
          break
        }
      }
      if (trackCur) {
        const lang = trackCur.language;
        const trackDom = document.querySelector(`.video-js-video-player > video > track[srclang="${lang}"]`);
        getSubByTrack(trackDom, srcVideoDom);
      }
    });
  }
}, 500);
