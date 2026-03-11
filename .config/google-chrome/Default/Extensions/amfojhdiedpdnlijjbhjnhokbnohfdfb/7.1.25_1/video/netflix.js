var parseMock = JSON.parse;
var stringifyMock = JSON.stringify;

JSON.parse = function () {
  var data = parseMock.apply(this, arguments);

  if (data && data.result && data.result.timedtexttracks) {
    window.dispatchEvent(new CustomEvent("ejoy_data", {
      detail: data.result
    }));
  }

  return data;
};

JSON.stringify = function (response) {
  if (!response) return stringifyMock.apply(this, arguments);
  var data = parseMock(stringifyMock.apply(this, arguments));
  var modified = false;

  if (data && data.params && data.params.showAllSubDubTracks != null) {
    data.params.showAllSubDubTracks = true;
    modified = true;
  }

  if (data && data.params && data.params.profiles) {
    data.params.profiles.push("webvtt-lssdh-ios8");
    modified = true;
  }

  return modified ? stringifyMock(data) : stringifyMock.apply(this, arguments);
};

function detectNetflixVideoIdInDom() {
  var videoContainer = document.querySelector('[data-videoid]');

  if (videoContainer) {
    var id = videoContainer.getAttribute('data-videoid');
    if (id) return id;
  }

  return null;
}

function getPlayer() {
  try {
    var videoPlayer = netflix.appContext.state.playerApp.getAPI().videoPlayer;
    var sessionId = videoPlayer.getAllPlayerSessionIds()[0];
    return videoPlayer.getVideoPlayerBySessionId(sessionId);
  } catch (error) {
    return null;    
  }
}

function handleSeek(event) {
  try {
    const player = getPlayer()
    player && player.seek(event.detail);
  } catch (error) {

  }
}

var videoId = null;
var hideCoreUI = false;
var firstEventEjoyEye = true;
var firstEventEjoyPopup = true;
window.addEventListener("glotSeekEjoy", handleSeek);

document.addEventListener('click', (event) => {
  var isNewLayout = document.querySelector(".watch-video--player-view");

  if (isNewLayout && document.querySelector("#eJOY-pop-container-video")) {

    document.querySelector("#eJOY-pop-container-video").onclick = function (e) {
      e.preventDefault();
      e.stopPropagation();
    }
  }
  if (event.target.classList.contains('ejoy-eye')) {
    if (!isNewLayout) {
      try {
        event.stopPropagation();
        event.preventDefault();
        const playerControls = document.querySelector('.PlayerControlsNeo__core-controls');
        const ejoyEyeClose = document.querySelector('.ejoy-eye-close');
        const ejoyEyeOpen = document.querySelector('.ejoy-eye-open');
        hideCoreUI = !hideCoreUI;
        if (hideCoreUI) {
          playerControls.style.cssText = 'display: none;';
          ejoyEyeOpen.style.display = 'none'
          ejoyEyeClose.style.display = 'flex'
        } else {
          playerControls.style.cssText = '';
          ejoyEyeOpen.style.display = 'flex'
          ejoyEyeClose.style.display = 'none'
        }
      } catch (error) {

      }
    }
  }
})

window.setInterval(function () {
  var player = getPlayer();
  var isNewLayout = document.querySelector(".watch-video--player-view");

  if (isNewLayout) {
    if (document.querySelector("#eJOY-pop-container-video")) {
      document.querySelector("#eJOY-pop-container-video").onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();
      }
    }
  }

  if (player && "getLoaded" in player && player.getLoaded() || isNewLayout && player && "getReady" in player && player.getReady()) {
    if (!window.isLoaded) {
      window.isLoaded = true;
      window.dispatchEvent(new CustomEvent("ejoyVideoReady"));
    }
    if (window.currentLanguage !== player.getTimedTextTrack().bcp47) {
      window.currentLanguage = player.getTimedTextTrack().bcp47;
      window.dispatchEvent(new CustomEvent("ejoySubtitlesChanged", {
        detail: window.currentLanguage
      }));
    }
  } else {
    window.isLoaded = false;
    window.currentLanguage = null;
  }

  var movieIdInDomMatch = detectNetflixVideoIdInDom();

  if (videoId && movieIdInDomMatch && videoId !== movieIdInDomMatch) {
    videoId = movieIdInDomMatch;
    setTimeout(function () {
      window.dispatchEvent(new CustomEvent("changeMovieEjoy"));
      window.dispatchEvent(new CustomEvent("ejoySubtitlesChanged", {
        detail: window.currentLanguage
      }));
    }, 500);
  }

  if (!videoId && movieIdInDomMatch) videoId = movieIdInDomMatch;

  if (isNewLayout) {
    if (!window.isFirstLoadSub && isNewLayout) {
      window.isFirstLoadSub = true;
      window.dispatchEvent(new CustomEvent("renderCoreLayoutEjoy"));
    }

    if (!document.querySelector(".ejoy-settings") && document.querySelector(".watch-video--bottom-controls-container")) {
      window.isFirstLoadIcon = true;
      window.dispatchEvent(new CustomEvent("renderIconEjoy"));
    }
  }
}, 500);