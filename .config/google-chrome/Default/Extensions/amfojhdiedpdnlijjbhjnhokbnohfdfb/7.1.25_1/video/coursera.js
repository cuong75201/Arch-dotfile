
window.isLoaded = false;
let videoId = null;
let isLoad = false;
window.setInterval(() => {
  const hrefCurrent = window.location.href
  const player = document.getElementsByClassName(`vjs-tech`);
  if (player.length && window.hrefCurrent === hrefCurrent) {
    if (!window.isLoaded) {
      window.hrefCurrent = window.location.href
      window.isLoaded = true;
      window.dispatchEvent(new CustomEvent("ejoyVideoReady"));
    }
  } else {
    window.hrefCurrent = hrefCurrent
    window.isFirstLoadSub = false;
    window.isLoaded = false;
  }

  function detectVideoIdInHref() {
    const hrefParse = window.location.href.split('lecture/');
    if (hrefParse.length > 1) return hrefParse[1].split('/')[0];
    return null;
  }
  const movieIdInDomMatch = detectVideoIdInHref();
  if (videoId !== movieIdInDomMatch) {
    window.dispatchEvent(new CustomEvent("removeSubs"));
  }
  const videoSelector = document.querySelector("video[class='vjs-tech']")
  if ((!window.isFirstLoadSub &&
    videoSelector &&
    videoSelector.textTracks &&
    videoSelector.textTracks.length) ||
    (videoSelector &&
      videoSelector.textTracks &&
      videoSelector.textTracks.length && videoId && movieIdInDomMatch && videoId !== movieIdInDomMatch)
  ) {
    videoId = movieIdInDomMatch;
    window.isFirstLoadSub = true;
    const textTracks = videoSelector.textTracks;
    if (textTracks) {
      textTracks.addEventListener("change", function (e) {
        for (let i = 0; i < textTracks.length; i++) {
          const track = textTracks[i];
          if (track && track.mode === 'showing') {
            window.dispatchEvent(new CustomEvent("ejoySubtitlesChanged", { detail: track.language }));
            isLoad = true;
            break
          }
        }
      });

      for (let i = 0; i < textTracks.length; i++) {
        const track = textTracks[i];
        if (track && track.mode === 'showing') {
          window.dispatchEvent(new CustomEvent("ejoySubtitlesChanged", { detail: track.language }));
          isLoad = true;
          break
        }
      }

      const tracks = document.querySelectorAll("video[class='vjs-tech'] track");
      const subArr = [];

      tracks.forEach(track => {
        const lang = track.getAttribute('srclang')
        const name = track.getAttribute('label')
        const href = `https://www.coursera.org${track.getAttribute('src')}`
        subArr.push({ lang, name, href });
        // if (!isLoad) {
        //   console.log('lksdfjklsdfjklsdjklfjksdlfjklsdklfsdfsdfsdfsdfsdfsdfsd test track.language 2')
        //   window.dispatchEvent(new CustomEvent("ejoySubtitlesChanged", { detail: '' }));
        // }
      });

      // let videoId: string = '';
      // try {
      //   videoId = window.location.href.split('lecture/')[1].split('/')[0];
      // } catch (error) {
      //   videoId = '';
      // }
      window.dispatchEvent(new CustomEvent("ejoy_data", { detail: { subtitleArr: subArr, videoId } }));
    }
  }
  if (!document.querySelector(".ejoy-settings")) {
    window.isFirstLoadIcon = true;
    window.dispatchEvent(new CustomEvent("renderIconEjoy"));
  }
}, 500);
