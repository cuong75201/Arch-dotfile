import{R as ie,v as ne,a as re,r as le}from"./react-shadow-dom-retarget-events.MJue8_K6.js";import{l as I,a as ae,j as X,r as ce}from"./index.CeCz5Hf8.js";import{r as V,s as L,q as ue,t as de,u as he,d as Z,c as $,j as pe}from"./index.VUlTxN3P.js";import{a as me,c as z,b as fe,d as ge}from"./index.KjeaRqfp.js";import{d as f,g as u,h as N,c as E,f as P,_ as j}from"./actionSettings.PRJtmZTZ.js";import{w as ye,a as Se}from"./settingOnOff.C6byTuQB.js";import{S as be}from"./sweetalert2.all.D7cvlk-E.js";import{_ as we}from"./size.BSRYtv7c.js";import{s as ve,t as xe}from"./helper.B0r6-mC-.js";import{p as Ce,a as ke,_ as Te,g as Ee,e as Pe,s as qe,c as Re}from"./popup.rk1pV4Q-.js";import{_ as Me}from"./last.DWytMiFq.js";import{s as Oe}from"./index.CnFXhFsD.js";import{g as Le,a as _e}from"./subtitleLookup.ykBFOJZR.js";import{c as Be}from"./index.BWzJst4q.js";import{f as De}from"./index.WeFngcXH.js";function Ae(l){try{const e=l.data.type,t=document.querySelector("video");if(t)switch(e){case"seek":const s=l.data.second;t.currentTime=s;break;case"play":t.play();break;case"pause":t.pause();break;case"getTime":break;default:break}}catch{}}function He(l){try{const e=l.data.type,t=document.querySelector("video");(e==="seek"||e==="play"||e==="pause")&&document.querySelector("iframe").contentWindow.postMessage(l.data,"*")}catch{}}function Ie(){window.location.pathname&&window.location.host==="www.youtube.com"&&window.location.pathname.indexOf("/embed/")>=0&&window.location.href.indexOf("autoplay=1&controls=0&v=3")>=0&&window.addEventListener("message",Ae);const l=f.get("embedYoutubeFromWebHost"),e=f.get("embedYoutubeFromWebCheck");window.location.pathname&&window.location.host===l&&window.location.pathname.indexOf(e)>=0&&window.addEventListener("message",He)}const yt=()=>{try{document.querySelector("iframe#iframePlayVideoYt").contentWindow.postMessage({type:"play",second:100},"*")}catch{}},St=()=>{try{document.querySelector("iframe#iframePlayVideoYt").contentWindow.postMessage({type:"pause",second:100},"*")}catch{}},bt=l=>{try{document.querySelector("iframe#iframePlayVideoYt").contentWindow.postMessage({type:"seek",second:l},"*")}catch{}};function W(l){let e=0,t=0,s=0,o=0;const i=`#${l.id}header`;l.querySelector(i)?l.querySelector(i).onmousedown=n:l.onmousedown=n;function n(c){c=c||window.event,c.preventDefault(),s=c.clientX,o=c.clientY,l.onmouseup=a,document.onmousemove=r}function r(c){c=c||window.event,c.preventDefault(),e=s-c.clientX,t=o-c.clientY,s=c.clientX,o=c.clientY,l.style.top=l.offsetTop-t+"px",l.style.left=l.offsetLeft-e+"px",l.style.top&&l.style.removeProperty("bottom")}function a(){l.onmouseup=null,l.onmousemove=null,document.onmousemove=null}}const F=(l,e)=>{l&&(l.onmouseup=null,l.onmousemove=null,document.onmousemove=null)},v=Z.KEY_BOARD,q=$.fontTypeSubtitle,U=$.initialStyleSubtitle,R="ejoy-sub-clzz",b="ejoy-sub-hovered",_="glot-subtitles__sub__con",B={fixedDom:"fixedDom",videoTrack:"videoTrack"},Y=Z.eJOYPopId,M={},D={};let T="",A=null;const x="ej-main-sub",O="ej-trans-sub";class je{constructor(){this.handleChangeHref=()=>{let e=document.location.href;const t=document.querySelector("body");new MutationObserver(o=>{e!==document.location.href&&(e=document.location.href,this.video=null,window.isMove=!1,window.isMainMove=!1)}).observe(t,{childList:!0,subtree:!0})},this.addCssHiddenSubWithVideoTrack=e=>{if(e)this.addCssHiddenSubWithVideoTrackShadown();else{const t=document.createElement("style");t.innerHTML="video::cue { font-size: 0px !important}",document.head.appendChild(t)}},this.addCssHiddenSubWithShawdowRoot=()=>{try{const e=this.splitByShadowRoot(this.idOrClassSub),t=e.length;if(t<=1)return null;let s=document.querySelector(e[0]).shadowRoot.querySelector(e[1]),o=document.querySelector(e[0]).shadowRoot,i=e[1];if(t>2)for(let n=2;n<t;n++)s&&(o=s.shadowRoot,s=s.shadowRoot.querySelector(e[n]),i=e[n]);if(o&&!o.querySelector("#styleHiddenSubEj")){const n=document.createElement("style");n.id="styleHiddenSubEj",n.innerHTML=`
          ${i} { transform: translateX(10000px); opacity: 0 !important; }
        `,o.appendChild(n)}}catch{}},this.parseClass=e=>{const t=e;try{const s=u((t||"").match(new RegExp("videoRootDom:(.*?[^\\\\])@","i"))||[],"[1]","").trim(),o=u((t||"").match(new RegExp("classSubDom:(.*?[^\\\\])@","i"))||[],"[1]","").trim(),i=u((t||"").match(new RegExp("parentDom:(.*?[^\\\\])@","i"))||[],"[1]","").trim(),n=u((t||"").match(new RegExp("typeVideo:(.*?[^\\\\])@","i"))||[],"[1]","").trim();let r=u((t||"").match(new RegExp("offsetY:(.*?[^\\\\])@","i"))||[],"[1]","").trim(),a=u((t||"").match(new RegExp("isBottom:(.*?[^\\\\])@","i"))||[],"[1]","").trim();return r=r?parseInt(r):0,{videoRootDom:s,isBottom:!!(a&&a==="true"),classSubDom:o,parentDom:i,typeVideo:n,offsetY:r}}catch{}return{offsetY:0}},this.handleChangeTextPriSub=(e,t,s,o="")=>{const i=this.getLangTo();let n=o;if(this.parentElementDom&&(n=this.querySelector(this.parentElementDom)),n||(this.isSubTrack?n=this.video?this.video.parentElement:t.parentElement:n=this.video?this.video.parentElement:t.parentElement),!n)return;this.renderIconFullScreen(n);const r=this.isForceBottom||this.isSubTrack||this.isShawdowRootPage;s&&this.renderShowAutoTranslate(e,i,t,n,r?180:this.offsetTransSub||30,r),(this.isReplaceSub||this.isSubTrack)&&!this.hiddenMainSub&&this.renderMainSub(e,t,n,r?100:10,r)},this.clearSub=()=>{const e=this.querySelector("."+O);e&&(e.innerText="");const t=this.querySelector("."+x);t&&(t.innerText="")},this.handleClickNewNeflix=()=>{this.querySelector("html#netflix .watch-video")&&(this.querySelector("html#netflix .watch-video").onclick=this.mouseClickHandler,this.isHandleClickNewNeflix=!0)},this.mouseClickHandler=e=>{this.querySelector(".ejoy-settings-wrapper")&&!this.querySelector(".ejoy-settings-wrapper").contains(e.target)&&window.dispatchEvent(new CustomEvent("closeSettingEjoy")),this.getElementById("ejoy")&&!this.getElementById("ejoy").contains(e.target)&&this.closePopup&&this.closePopup()},this.setLangTo=()=>{N("lang",e=>{const t=u(e,"lang",{}),s=u(t,"translateTo.code","");document.body.setAttribute("data-lang-to",s)})},this.onMousedown=e=>{this.querySelector(`#${Y}`)&&!this.querySelector(`#${Y}`).contains(e.target)&&this.querySelector("[parent-subtitle]")&&!this.querySelector("[parent-subtitle]").contains(e.target)&&this.closePopup()},this.bodyClick=e=>{e.target.classList.contains(R)?this.clickTranslate(e,e.target.getAttribute("data-text"),""):e.target.classList.contains("view-icon-edit-sub")?this.goToSettingSub():e.target.classList.contains("view-icon-copy-main-sub")?this.copySub(this.subCache,"Copied main Subtitle !!!"):e.target.classList.contains("view-icon-copy-tran-sub")?this.copySub(this.subTranCache,"Copied trans Subtitle !!!"):e.target.classList.contains("view-icon-full-sub")||e.target.classList.contains("view-icon-exit-full-sub")?this.toggleFullSub():e.target.classList.contains("viewGoPro")&&this.goPopupProBlur()},this.splitByShadowRoot=e=>e?e.split("#shadowRoot#").filter(t=>t):[],this.getVideoElement=()=>{let e=null;if(this.isTrackShadowPage)try{e=document.querySelector("mux-player").shadowRoot.querySelector("mux-video").shadowRoot.querySelector("video")}catch{return null}else{const t=f.get("idOrClassVideoSource")||this.idOrClassVideoSource;if(e=document.querySelector(this.idOrClassVideo),this.idOrClassSub.indexOf("#shadowRoot#")>=0||this.videoRootElementDom&&this.videoRootElementDom.indexOf("#shadowRoot#")>=0){const s=this.splitByShadowRoot(this.videoRootElementDom?this.videoRootElementDom:this.idOrClassSub);e=this._getClassSubShadowRootVideo(s,!!this.videoRootElementDom)}else!e&&document.querySelector(t)&&(e=document.querySelector("video"))}return e},this.getElement=(e,t)=>{if(e.indexOf("#shadowRoot#")>=0){const s=this.splitByShadowRoot(e),o=s.length;if(!o)return document.querySelector(e);const i=document.querySelector(s[0]);if(!i)return document.querySelector(e);if(o===1)return t?i.shadowRoot:i;let n=i.shadowRoot||i;for(let r=1;r<o;r++){if(!n)return null;const a=n.querySelector(s[r]);if(!a)return null;if(r===o-1)return a.shadowRoot||a;n=a.shadowRoot||a}return n}else return document.querySelector(e)},this.setVideo=()=>{try{this.video=this.getVideoElement()}catch{this.video=null}},this.pause=()=>{this.video||this.setVideo(),this.video&&Ce(this.video)},this.play=()=>{this.closePopup&&this.closePopup(),this.playOrigin()},this.playOrigin=()=>{this.video&&ke(this.video)},this.checkIsEnable=()=>this.idOrClassSub===_?document.documentElement.classList.contains("ejoy-enable"):!0,this.mouseOver=e=>{this.querySelector("[parent-subtitle]")&&this.querySelector("[parent-subtitle]").contains(e.target)?this.video&&!this.video.paused&&(this.pauseByHover=!0,this.pause()):!this.querySelector(`#${Y}`)&&this.pauseByHover&&(e.target.getAttribute("parent-subtitle")||(this.pauseByHover=!1,this.playOrigin()))},this.fullscreenchange=()=>{window.isMove=!1,window.isMainMove=!1},this.showNotify=(e="saved")=>{be.fire({position:"top-end",icon:"success",title:e,toast:!0,showConfirmButton:!1,timer:2e3})},this.copySub=(e,t)=>{e&&chrome.runtime.sendMessage(E(P.copy_text,e),s=>{s.ok&&this.showNotify(t||"Copied !!!")})},this.toggleFullSub=()=>{const e=f.get("showFullSubCustom1")||{},t=this.domain?e[V(this.domain,"\\.","_")]:"";t&&(document.fullscreenElement?document.exitFullscreen():document.querySelector(t).requestFullscreen())},this.onKeyUp=(e,t=!1)=>{if(!t&&Be(e)||!this.checkIsEnable())return;const{keyCode:s,altKey:o,shiftKey:i}=e;this.setVideo();try{switch(s){case v.KEY_C:{o&&this.copySub(this.subCache,"Copied main Subtitle !!!");break}case v.KEY_B:{o&&this.copySub(this.subTranCache,"Copied trans Subtitle !!!");break}case v.SPACE:this.closePopup&&this.closePopup();break;case v.ESCAPE:this._closePopup();break;case v.COMMA:case v.SUBTRACT:{if(i)return;this.indexHover--,this.isNext=!1,this.hoverByIndex(this.indexHover,o);break}case v.ADD:case v.PERIOD:{if(i)return;this.indexHover++,this.isNext=!0,this.hoverByIndex(this.indexHover,o);break}case v.KEY_J:o&&this.tranFullSub();break;default:break}}catch{}},this.mapStrToArr=e=>e?[...e].map(t=>({value:t,tag:!t||t===" "||t==="space"?"empty":"word"})):[],this.removeAllSelect=()=>{this.textSelected=[];let e=this.querySelectorAll(`.${b}`);e.length===0&&(e=document.querySelectorAll(`.${b}`)),e.forEach(t=>{t.classList.remove(b)})},this.clickTranslate=async(e,t,s)=>{const o=e.altKey;let i=e.target,n=t;if(this.video&&!this.video.paused&&(this.pauseByHover=!0,this.pause()),e&&o){if(!i.classList.contains(b))this.textSelected.push({text:n,target:e.target}),i.classList.add(b);else{Te(this.textSelected,c=>c.target===e.target),i.classList.remove(b);try{i=Me(this.textSelected).target}catch{}}n=this.textSelected.map(c=>c.text).join(" ")}else this.removeAllSelect(),e&&this.textSelected.push({text:n,target:e.target}),i.classList.add(b);const r=this.isNotParse&&document.querySelector(".ejoy-subtitles")?document.querySelector(".ejoy-subtitles").getAttribute("data-lang"):"",a=this.getLangTo();this.onClickShowPopup(n,s,i,r,a)},this.setClassToConPopup=()=>{const e="[class-container-popup]";return document.querySelector(e)?document.querySelector(e).getAttribute("class-container-popup"):this.isShawdowRootPage?this.videoRootElementDom:(document.querySelector(this.containerPopup||"body").setAttribute("class-container-popup",e),e)},this.getClassToConPopupFull=()=>{const e="[class-container-popup-full-screen]";return document.querySelector(e)?document.querySelector(e).getAttribute("class-container-popup-full-screen"):this.isShawdowRootPage?this.videoRootElementDom:(this.containerFullPopup?document.querySelector(this.containerFullPopup).setAttribute("class-container-popup-full-screen",e):this.video&&this.video.parentElement.setAttribute("class-container-popup-full-screen",e),e)},this.onClickShowPopup=(e,t,s,o,i)=>{const n=me(s);this.showContentByText({isVideoMux:this.isShawdowRootPage,text:e,rootClass:z()?this.getClassToConPopupFull():this.setClassToConPopup(),style:"",context:t,from:"auto",to:i,stylePopup:{position:"absolute",top:`${n.top}px`,left:`${n.left}px`,height:`${n.height}px`,maxHeight:`${n.height}px`,transform:`translateX(${n.translateX}%)`},posTriangle:""})},this.tranfull=(e,t)=>{const s=this.getLangTo();this.onClickShowPopup(e,e,t,"auto",s)},this.onMouseLeave=()=>{this.removeHoveredClass()},this.indexHover=-1,this.domData=null,this.textSelected=[],this.isPaused=!1,this.isSubTrack=!1,this.delayPlay=null,this.pauseByHover=!1,this.hiddenMainSub=!1,this.offsetTransSub=30,this.offsetY=0,this.isForceBottom=!1,this.ignorePro=!1,this.isShawdowRootPage=!1,this.isPro=!1,this.isHandleClickNewNeflix=!1,this.idOrClassSub="glot-subtitles__sub__con",this.domain="",this.containerPopup="",this.isReplaceSub=!1,this.containerFullPopup="",this.showContentByText=null,this.showIconSelect=null,this.optionsContext=null,this.options=null,this.style=null,this.video=null,this.parentElementDom=null,this.videoRootElementDom=null,this.isTrackShadowPage=!1,this.timeOutIconBlur=null,this.isNext=!0,this.enable=!1,this.isAutoTrans=!1,this.isShowCrownBlur=!1,this.closePopup=null,this.ignore=!1,this.isNextByWord=!1,this.customSearchWithRange=null,this.posEnable=!1,this.altKeyCache=!1,this.isNotParse=!1,this.isSpace=document.location.href.includes("wetv.vip")||document.location.href.includes("netflix.com"),this.subsTokenize=[],this.subCache="",this.subTranCache="",this.subHtml=[],this.subContentCache=[],this.fixedPos={left:0,top:0},this.styleLearning="",this.styleTrans="",this.colorMainSub="",this.colorTranSub="",this.idOrClassVideo='video[src]:not([src=""]):not(.tst-video-overlay-player-html5)',this.idOrClassVideoSource='video > source[src]:not([src=""]):not([src^="data:video"])'}checkChangeSub(e){A&&clearInterval(A),this.isSubTrack?A=window.setInterval(()=>{this.video||(this.setVideo(),window.isMove=!1,window.isMainMove=!1),this.getCurrentTrack(e)},500):A=window.setInterval(()=>{this.video||(this.setVideo(),window.isMove=!1,window.isMainMove=!1);const t=this.getClassSubElement();if(t){const o=t.length!==void 0&&t.length>0?this.getParentElement(t):t,i=(o.innerText||"").trim();!this.hiddenMainSub&&this.isReplaceSub&&this.hideOriginSub(o),this.isShawdowRootPage&&this.addCssHiddenSubWithShawdowRoot(),T!==i&&(T=i,i?(!this.isReplaceSub&&this.hoverByIndex(0,!1,!0),this.handleChangeTextPriSub(i,o,e)):this.clearSub())}else T&&(this.clearSub(),T="")},500)}actions(){try{const t=(f.get("actionsElement")||[]).find(s=>s.domain.indexOf(this.domain)>=0);if(t){const s=t.actions||[],o=t.delay||0;setTimeout(()=>{for(let i=0;i<s.length;i++){const n=s[i],r=document.querySelector(n.element);if(r)switch(n.type){case"remove":r.remove();break;default:break}}},o)}}catch{}}getCurrentTrack(e){if(!this.video)return;const t=f.get("kindSubTrack")||["subtitles","captions"],s=this.video.textTracks;for(const o in s){const i=s[o];if(i&&(t.includes(i.kind)||this.isTrackShadowPage)&&i.activeCues){const n=u(i,"activeCues.[0]");if(n&&T!==n.text){T=n.text;const r=this.video;let c=r.length!==void 0&&r.length>0?this.getParentElement(r):r,d=T;this.isTrackShadowPage?(d=d.startsWith("https")?"":d,c=document.querySelector("mux-player"),d&&this.handleChangeTextPriSub(d,c,e,this.isTrackShadowPage?c.parentElement:"")):this.handleChangeTextPriSub(d,c,e)}}}}async getProUser(){return new Promise(e=>{N("user",t=>{const s=u(t,"user",{});e(ve(s,xe.dualSub))})})}getVideoShadowRoot(){return document.querySelector("mux-player").shadowRoot.querySelector("mux-video")}getDocumentOrShadowRoot(e){return this.videoRootElementDom.includes("shadowRoot")?this.getElement(this.videoRootElementDom,e):document}querySelector(e){try{if(this.getDocumentOrShadowRoot().querySelector(e))return this.getDocumentOrShadowRoot().querySelector(e)}catch{}try{if(this.getDocumentOrShadowRoot(!0).querySelector(e))return this.getDocumentOrShadowRoot(!0).querySelector(e)}catch{}try{if(document.querySelector(e))return document.querySelector(e)}catch{}try{if(document.querySelector(e.substring(1)))return document.querySelector(e.substring(1))}catch{}return null}getElementById(e){try{if(this.getDocumentOrShadowRoot().getElementById(e))return this.getDocumentOrShadowRoot().getElementById(e)}catch{}try{if(this.getDocumentOrShadowRoot(!0).getElementById(e))return this.getDocumentOrShadowRoot(!0).getElementById(e)}catch{}try{if(document.getElementById(e))return document.getElementById(e)}catch{}return null}querySelectorAll(e){try{if(this.getDocumentOrShadowRoot().querySelectorAll(e).length)return this.getDocumentOrShadowRoot().querySelectorAll(e)}catch{}try{if(this.getDocumentOrShadowRoot(!0).querySelectorAll(e).length)return this.getDocumentOrShadowRoot(!0).querySelectorAll(e)}catch{}try{if(document.querySelectorAll(e).length)return document.querySelectorAll(e)}catch{}try{if(document.querySelectorAll(e.substring(1)).length)return document.querySelectorAll(e.substring(1))}catch{}return[]}addCssHiddenSubWithVideoTrackShadown(){setTimeout(()=>{try{const e=document.querySelector("mux-player").shadowRoot.querySelector("mux-video");if(e){const t=document.createElement("style");t.innerHTML="video::cue { font-size: 0px !important}"+this.createStyleSub(),e.shadowRoot.appendChild(t),e.shadowRoot.addEventListener("click",this.bodyClick),e.shadowRoot.addEventListener("mouseover",this.mouseOver),e.shadowRoot.addEventListener("fullscreenchange",this.fullscreenchange)}}catch{this.addCssHiddenSubWithVideoTrackShadown()}},1e3)}prepare(e,t,s,o,i,n){this.showContentByText=e,this.customSearchWithRange=n,this.showIconSelect=s,this.optionsContext=o,window.isMove=!1,window.isMainMove=!1,Le(window.location.href).then(async r=>{const a=u(r,"domain",""),c=f.get("checkIgnoreProCase")||{},d=a?c[V(a,"\\.","_")]:"",C=f.get("videoShadowRoot")||["totaltypescript.com","courses.jsmastery.pro"];this.isTrackShadowPage=C.includes(a),this.ignorePro=!1,d&&(window.location.href.match(new RegExp(d),"g")?(this.hiddenMainSub=!0,this.offsetTransSub=50,this.ignorePro=!0):r={}),this.idOrClassSub=u(r,"elemClass","")||this.idOrClassSub,this.isPro=u(r,"isPro",!1)||this.isPro,this.enable=u(r,"enable",this.enable);const w=this.ignorePro||await this.getProUser();if(this.isPro&&(w||(this.enable=!1)),!w){const m=f.get("ignoreDomainPartlyBlurSub")||[];!(f.get("disableDomainPartlyBlurSub")||!1)&&a&&!m.includes(a)&&(this.timeOutIconBlur&&clearTimeout(this.timeOutIconBlur),this.timeOutIconBlur=setTimeout(()=>{this.isShowCrownBlur=!0},f.get("timeDelayShowIconProInVideoPartly")||6e4))}this.posEnable=u(r,"posEnable",!1)||this.posEnable,this.fixedPos=u(r,"pos","")||this.fixedPos,this.style=u(r,"style",U)||U,a==="linkedin.com"&&this.idOrClassSub.indexOf("###")<0&&(this.idOrClassSub="vjs-custom-captions-cue###vjs-text-track-display");const h=this.parseClass(this.idOrClassSub);if(this.parentElementDom=h.parentDom,this.isForceBottom=h.isBottom,this.videoRootElementDom=h.videoRootDom,this.offsetY=h.offsetY,this.idOrClassSub=h.classSubDom||this.idOrClassSub,!this.isTrackShadowPage&&h.typeVideo&&(this.isTrackShadowPage=h.typeVideo==="mux-player"),this.isShawdowRootPage=(this.videoRootElementDom||"").indexOf("#shadowRoot#")>=0,we(this.style)>0){const m=u(this.style,"fontSizeMainSub",null),p=u(this.style,"fontTypeMainSub",null),y=u(this.style,"fontSizeAutoTransSub",null),S=u(this.style,"fontTypeAutoTransSub",null);this.colorMainSub=p?`color: ${q[p].color}`:"",this.colorTranSub=S?`color: ${q[S].color}`:"",this.styleLearning=`
        lineHeight: 1.2;
          ${m?`font-size: ${m};`:""}
          ${p?`color: ${q[p].color}; background: ${q[p].background};`:""}
        `,this.styleTrans=`
        lineHeight: 1.2;
        ${y?`font-size: ${y};`:""}
        ${S?`color: ${q[S].color}; background: ${q[S].background};`:""}
      `}try{if(a==="youtube.com"&&this.enable){const m=window.location.href.indexOf("://www.youtube.com/embed/")>=0&&window.location.href.indexOf("controls=0&start=0&origin=")>=0;this.enable=!m}}catch{}this.isNextByWord=u(r,"isNextByWord",this.isNextByWord),this.isNotParse=this.idOrClassSub===_,this.enable&&(document.body.addEventListener("mousedown",this.onMousedown),window.addEventListener("keyup",this.onKeyUp),this.setVideo(),this.isNotParse||(document.addEventListener("click",this.bodyClick),document.addEventListener("mouseover",this.mouseOver),document.addEventListener("fullscreenchange",this.fullscreenchange),this.setLangTo(),this.isAutoTrans=u(r,"isAutoTrans",!1),this.domain=a,a&&_e(a,m=>{if(m){const p=m.scriptCustom;this.containerPopup=m.containerPopup,this.containerFullPopup=m.containerFullPopup;const y=m.type||r.type;this.isReplaceSub=y&&y===B.fixedDom,this.isSubTrack=y&&y===B.videoTrack;const S=document.createElement("style");if(S.innerHTML=m.style,document.head.appendChild(S),this.actions(),this.isSubTrack&&this.addCssHiddenSubWithVideoTrack(this.isTrackShadowPage),p){const k=document.createElement("script");k.innerHTML=p,document.head.appendChild(k)}this.checkChangeSub(this.isAutoTrans)}else{const p=r.type;this.isReplaceSub=p&&p===B.fixedDom,this.isSubTrack=p&&p===B.videoTrack,this.isSubTrack&&this.addCssHiddenSubWithVideoTrack(this.isTrackShadowPage),this.checkChangeSub(this.isAutoTrans)}this.handleChangeHref()})),document.querySelector("html#netflix")&&(this.handleClickNewNeflix(),window.addEventListener("changeMovieEjoy",()=>{this.isHandleClickNewNeflix||this.handleClickNewNeflix()}))),this.closePopup=t;const g=document.createElement("style");g.innerHTML=this.createStyleSub(),document.head.appendChild(g)})}createStyleSub(){return`
      .ejoy-sub-active{
        color: #1296ba !important;
      }
      
      .ejoy-sub-hovered{
        color: #1296ba !important;
      }
      .${R}{
        cursor: pointer;
        ${this.styleLearning}
      }
      .${R}:hover{
        color: #1296ba !important;
      }
      .${O}{
        position: absolute;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999999;
        cursor: move;
      }
      .${O} > span{
        color: #3CF9ED;
        font-size: 18px;
        text-align: center;
        padding: 0 16px;
        line-height: 1.5;
        background: rgba(32, 26, 25, 0.8);
        // text-shadow: 0px 1px 4px black;
        padding: 0 8px;
        ${this.styleTrans}
      }
      .ej-full-screen-video{
        position: absolute;
        width: 30px;
        height: 30px;
        top: 30px;
        right: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 99999999;
        cursor: pointer;
      }
      .${x}{
        position: absolute;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 99999999;
        cursor: move;
        padding: 0 8px;
      }
      .${x} > span{
        color: white;
        font-size: 20px;
        line-height: 1.5;
        text-align: center;
        background: rgba(32, 26, 25, 0.8);
        padding: 2px 8px;
        ${this.styleLearning}
      }

      .${x} .${R}{
        background: transparent !important
      }

      .tran-subtitle > span{
        cursor: pointer;
        padding-left: 10px;
        top: 2px;
        position: relative;
      }

      .tran-subtitle > span > span{
        position: absolute;
        top: -170%;
        background: rgba(0,0,0,0.5);
        font-size: 13px;
        line-height: 20px;
        padding: 2px 8px;
        color: white;
        display: none;
        border-radius: 4px;
        white-space: nowrap;
        left: -50%;
        font-weight: normal;
      }

      .viewPopupPro {
        z-index: 2147483647;
        cursor: auto;
        position: absolute;
        z-index: 2147483647;
        background: #111111;
        transition: opacity 1s;
        width: 172px;
        height: 66px;
        opacity: 1;
        border-radius: 6px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .titlePopupPro {
        font-style: normal;
        font-weight: 400;
        font-size: 10px;
        line-height: 12px;
        color: #E5E5E5;
        text-shadow: 0px 3px 3px rgba(0, 0, 0, 0.25);
      }
  
      .viewGoPro {
        background: #FFCC00;
        border-radius: 72.6257px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 8px;
        padding-left: 10px;
        cursor: pointer;
  
      }

      .viewGoPro svg {
        pointer-events: none;
      }
      
      .textGoPro {
        font-style: normal;
        font-weight: 600;
        font-size: 10px;
        line-height: 12px;
        pointer-events: none;
        text-align: center;
        color: #FFFFFF;
        padding: 4px 14px 4px 4px;
      }

      .viewPopupPro{
        top: auto !important;
        bottom: 15px !important;
      }

      .view-icon-copy-main-sub:hover > span,
      .view-icon-edit-sub:hover > span,
      .view-icon-exit-full-sub:hover > span,
      .view-icon-full-sub:hover > span,
      .iconCrownGoPro:hover > span,
      .view-icon-copy-tran-sub:hover > span {
        display: block;
      }

      .iconCrownGoPro{
        padding-left: 0px !important;
        padding-right: 8px !important;
      }
      .iconCrownGoPro svg{
        width: 17px;
        height: 17px;
      }
      .view-icon-full-sub, .view-icon-exit-full-sub {
        display: flex;
      }

      .view-icon-full-sub > svg, .view-icon-exit-full-sub > svg {
        pointer-events: none;
      }

      .tran-subtitle > span > svg{
        width: 16px;
        height: 16px;
        pointer-events: none;
        display: inline-flex !important;
        vertical-align: baseline !important;
      }
      
      .view-icon-copy-main-sub > svg{
        pointer-events: none;
        ${this.colorMainSub}
      }

      .iconCrownGoPro{
        padding-left: 0 !important;
        padding-right: 8px !important;
      }
      .view-icon-copy-tran-sub > svg{
        pointer-events: none;
        ${this.colorTranSub}
      }
      `}renderShowAutoTranslate(e,t,s,o,i=30,n=!1){if(!s||!o)return;const r=s.getBoundingClientRect(),a=o.getBoundingClientRect();Ee(e,"auto",t,c=>{if(s&&o){this.subTranCache=c.text;let d=this.querySelector("."+O);if(d||(window.isMove=!1,F(d),d=document.createElement("div"),d.className=O),d.innerHTML=`<span class="tran-subtitle">
          ${this.isShowCrownBlur?`<span class="iconCrownGoPro">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M14 28C21.732 28 28 21.732 28 14C28 6.26801 21.732 0 14 0C6.26801 0 0 6.26801 0 14C0 21.732 6.26801 28 14 28Z" fill="#111111" fill-opacity="0.4"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M20.125 19.8333H8.45548L7 10.4461L9.91381 11.8762L14.2831 7.58325L18.6681 11.8762L21.5833 10.4461L20.125 19.8333Z" fill="#E5E5E5"/>
            </svg>
            <span class="viewPopupPro">
              <span class="titlePopupPro">${I("Turn_on_Dual_Subtitles")}</span>
              <div class="viewGoPro">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M8.57143 8H0.950515L0 1.86963L1.9029 2.80353L4.75631 0L7.61998 2.80353L9.52381 1.86963L8.57143 8Z" fill="white" />
                </svg>
                <span class="textGoPro">
                  ${I("Buy_Pro_AI_Dictionary")}
                </span>
              </div>
            </span>
          </span>`:""}
          <span class="view-icon-copy-tran-sub">
            <span>Copy trans subtitle (Alt + B)</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-copy"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          </span>
          <span class="text-trans-ejoy" style="${this.isShowCrownBlur?"filter: blur(0.25em)":""}" >
            ${this.isShowCrownBlur?Oe(c.text):c.text}
          </span>
          <span class="view-icon-edit-sub">
            <span>Edit subtitle</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="#E5E5E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M18.5 2.49998C18.8978 2.10216 19.4374 1.87866 20 1.87866C20.5626 1.87866 21.1022 2.10216 21.5 2.49998C21.8978 2.89781 22.1213 3.43737 22.1213 3.99998C22.1213 4.56259 21.8978 5.10216 21.5 5.49998L12 15L8 16L9 12L18.5 2.49998Z" stroke="#E5E5E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          <span class="view-icon-copy-main-sub">
            <span>Copy main subtitle (Alt + C)</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-copy"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          </span>
        </span>`,!window.isMove){if(window.isMove=!0,n)d.style.bottom=`${(this.offsetY||0)+i}px`;else{const C=(this.offsetY||0)+r.top-r.height-a.top-i;d.style.top=`${C}px`}d.style.left="0",W(d)}o.appendChild(d)}})}hideOriginSub(e){if(this.idOrClassSub&&this.idOrClassSub.startsWith("jw-"))try{const t=this.querySelector(".jw-captions");t&&t.style&&(t.style.transform="translateX(10000px)")}catch{}try{e&&e.style&&(e.style.transform="translateX(10000px)")}catch{}}renderMainSub(e,t,s,o=10,i=!1){if(t&&s){let n;try{n=this.querySelector("."+x)}catch{}if(n||(window.isMainMove=!1,F(n),n=document.createElement("div"),n.className=x),n.innerHTML=`<span>${e}</span>`,!window.isMainMove){window.isMainMove=!0;const r=t.getBoundingClientRect();i?n.style.bottom=`${(this.offsetY||0)+o}px`:n.style.top=`${(this.offsetY||0)+r.top-s.getBoundingClientRect().top-o}px`,n.style.left="0",W(n)}s.appendChild(n),this.hoverByIndex(0,!1,!0)}}renderIconFullScreen(e){const t=f.get("showFullSubCustom1")||{},s=this.domain?t[V(this.domain,"\\.","_")]:"";if(e&&s){let o=this.querySelector(".ej-full-screen-video");o||(F(o),o=document.createElement("div"),o.className="ej-full-screen-video"),o.innerHTML=document.fullscreenElement?`
          <span class="view-icon-exit-full-sub">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minimize"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/></svg>
          </span>`:`
        <span class="view-icon-full-sub">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-maximize"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
        </span>`,e.appendChild(o)}}setOptions(e){const t=u(e,"quickLookup.enable",!1);this.idOrClassSub=u(e,"quickLookup.elemClass",""),this.posEnable=u(e,"quickLookup.posEnable",!1),this.fixedPos=u(e,"quickLookup.pos",""),this.isNextByWord=u(e,"quickLookup.isNextByWord",this.isNextByWord),t?this.enable||window.addEventListener("keyup",this.onKeyUp):window.removeEventListener("keyup",this.onKeyUp),this.enable=t}goToSettingSub(){L.analytics.sendEvent(["setting_sub"]),chrome.runtime.sendMessage(E(P.openOption,{screen:`?screen=subtitleLookup&domain=${this.domain}`}))}goPopupProBlur(){L.analytics.sendEvent(["ext_pro_ai_dual",this.domain]),chrome.runtime.sendMessage(E(P.go_pro,{moment:"dict",medium:"dual"}))}_closePopup(){this.play(),this.video&&this.video.focus(),this.closePopup&&this.closePopup()}renderItemSub(e,t){return e.tag==="word"?`<span class="${R}" data-text="${e.value}" data-hover="true" data-index="${t}" >${e.value}</span>`:e.value}stripHtmlTags(e){return e?e.replace(/<[^>]*>/g,""):""}decodeHtml(e){var t=document.createElement("textarea");return t.innerHTML=e,t.value}async replaceSub(e,t,s,o){const i=s?e:[e];let n=0;for(let r=0;r<i.length;r++){const a=i[r];if(a.querySelector('[data-hover="true"]')&&!o)return;const C=a.querySelector("[style]")?a.innerText:a.innerHTML,w=ue(a.innerText);a.innerHTML=w;const h=a.innerText,g=(h||"").trim();this.subHtml[r]=this.subContentCache[r]===g?this.subHtml[r]:C;const m=this.subHtml[r];if(this.subContentCache[r]=g,t)D[h]=D[h]?D[h]:this.mapStrToArr(h),this.subsTokenize=D[h];else{try{M[h]=M[h]?M[h]:de(h,!0).subsTokenize}catch{M[h]=null}this.subsTokenize=M[h]}const p=this.subsTokenize;let y="",S=m;if(!p)return;p.forEach(k=>{const{beforeText:oe,text:tt,restText:se}=he(this.decodeHtml(S),k.value);S=se,y=`${y}${oe}${this.renderItemSub(k,n)}`,k.tag==="word"&&n++}),a.innerHTML=y}}getClassSubElement(){if(this.idOrClassSub.indexOf("#shadowRoot#")>=0){const t=this.splitByShadowRoot(this.idOrClassSub);return this._getClassSubShadowRootElement(t)}const e=this.idOrClassSub.split("###");for(let t=0;t<e.length;t++){const s=e[t],o=this._getClassSubElement(s);if(o&&(o.length===void 0||o.length!==void 0&&o.length>0))return o}return null}_getClassSubShadowRootVideo(e=[],t=!1){try{let s=t?e:e.slice(0,e.length-1);const o=s.length;if(o<1)return null;let i=document.querySelector(s[0]);if(o>1)for(let n=1;n<o;n++)i&&(i=i.shadowRoot.querySelector(s[n]));if(i){const n=i.shadowRoot.querySelector(this.idOrClassVideo),r=i.shadowRoot;if(r&&!r.querySelector("#styleHiddenSubEj")){const a=document.createElement("style");a.id="styleHiddenSubEj";const c=`video::cue { font-size: 0px !important} }
          ${this.createStyleSub()}`;a.innerHTML=`${c}`,r.appendChild(a),r.addEventListener("click",this.bodyClick),r.addEventListener("mouseover",this.mouseOver),r.addEventListener("fullscreenchange",this.fullscreenchange)}return n}}catch{}return null}_getClassSubShadowRootElement(e=[]){try{const t=e.length;if(t<=1)return null;let s=document.querySelector(e[0]).shadowRoot.querySelector(e[1]);if(t>2)for(let o=2;o<t;o++)s&&(s=s.shadowRoot.querySelector(e[o]));return s}catch{}return null}_getClassSubElement(e=""){if(this.getElementById(e))return this.getElementById(e);try{if(this.querySelector(`.${e}`))return this.querySelector(`.${e}`)}catch{}return this.querySelectorAll(e)}getClassSubWithCustomTextElement(){try{if(this.querySelector("."+x))return this.querySelector("."+x)}catch{}try{return document.querySelector("."+x)}catch{}return this.getClassSubElement()}tranFullSub(){if(!(this.idOrClassSub===_)){const t=this.getClassSubWithCustomTextElement();if(!t)return;const s=t.length!==void 0&&t.length>0,o=((s?this.getParentElement(t):t).innerText||"").trim();this.tranfull(o,s?t[0]:t),this.pause()}}getParentElement(e){return e[0].parentElement}getUtilHasDom(e,t,s,o){const i=e[t];if(!i)return null;if(i.parentElement.style.display==="none"){const n=t+(s?1:-1),r=n<0?o-1:n>=o?0:n;return this.getUtilHasDom(e,r,s,o)}return this.indexHover=t,i}async hoverByIndex(e=0,t=!1,s=!1){if(this.hiddenMainSub)return;this.onMouseLeave(),this.ignorePro&&this.pause(),this.textSelected=[];let o=this.getClassSubWithCustomTextElement();const i=o.length!==void 0&&o.length>0;if(!o||o.length!==void 0&&o.length<=0)return;const n=this.idOrClassSub===_,r=n&&this.querySelector(".ejoy-subtitles")?this.querySelector(".ejoy-subtitles").getAttribute("data-lang"):"",a=((i?this.getParentElement(o):o).innerText||"").trim(),c=t?!this.isNextByWord:this.isNextByWord;if(a){!s&&this.pause(),this.querySelector(`.${R}`)||await this.replaceSub(o,c,i,!n&&this.altKeyCache!==t,!n),o=i?this.getParentElement(o):o;try{o.setAttribute("parent-subtitle","true")}catch{}if(o&&!s){const d=o.querySelector(`.${b}`);d&&d.classList.remove(b);const C=o.querySelectorAll('[data-hover="true"]'),w=C.length;(!this.subCache||this.subCache!==a)&&(this.indexHover=this.isNext?0:w-1),e<0?this.indexHover=w-1:e>=w&&(this.indexHover=0);const h=this.indexHover%w,g=this.getUtilHasDom(C,h,this.isNext,w);if(!g)return;g.classList.add(b);const m=g.getAttribute("data-text")||g.innerText,p=this.getLangTo();this.onClickShowPopup(m,a,g,r,p)}this.subCache=a,this.altKeyCache=t}}getLangTo(){return document.querySelector("[data-lang-to]")?document.querySelector("[data-lang-to]").getAttribute("data-lang-to"):""}removeHoveredClass(){try{this.domData&&this.domData.dom.removeClass(b),this.domData=null}catch{}}}const $e=$.config.DEFAULT_TRANSLATE_FROM_ADV,Ve=$.config.eJOYPopId,Fe=22;class Ye{constructor(){this.getSelected=()=>(window.getSelection||document.getSelection)().toString(),this.checkIgnore=e=>{try{const t=e.path[0];this.isTranslate=!(t.nodeName==="INPUT"||t.nodeName==="TEXTAREA"||e.which===2||t.className==="icon")}catch{}},this.handleCaptureTextEvent=e=>{const t=document.querySelector("[class-container-popup-full-screen]");try{if(!e||!e.path)return;const s=e.path[0];if((s.nodeName==="INPUT"||s.nodeName==="TEXTAREA"||!this.isTranslate)&&!e.altKey)return;if(this.isClickInside){this.isClickInside=!1;return}this.onClose();const o=this.getSelected()||"";if(!o)return;const i=De(o.trim().replace(/\s+/g," "));if(!i.trim())return;const n=e.pageX,a={y:(t?e.clientY:e.pageY)+Fe,x:n};this.translate(i,a,t)}catch{}},this.showText=(e,t,s)=>{const o=z()&&document.querySelector("[class-container-popup-full-screen]")?document.querySelector("[class-container-popup-full-screen]").getAttribute("class-container-popup-full-screen"):"";let i=o?document.querySelector(o).querySelector(".ejoy-in-popup-full"):document.querySelector(".ejoy-in-popup");i||(i=document.createElement("div"),i.className=o?"ejoy-in-popup-full":"ejoy-in-popup",(o?document.querySelector(o):document.querySelector("body")).appendChild(i)),i.innerText=e,i.style=`background-color: #2C2C2C;
    border-radius: 4px;
    color: #B2B2B2;
    font-size: 16px;
    padding: 4px 10px;
    position: ${s?"fixed":"absolute"};
    text-align: center;
    z-index: 9999999999;`,i.style.left=`${t.x}px`,i.style.top=`${t.y}px`,i.style.display="block"},this.onClose=()=>{const e=z()&&document.querySelector("[class-container-popup-full-screen]")?document.querySelector("[class-container-popup-full-screen]").getAttribute("class-container-popup-full-screen"):"",t=document.querySelector(e?".ejoy-in-popup-full":".ejoy-in-popup");t&&(t.style.display="none")},this.isClickInside=!1,this.contextStr="",this.webUrl="",this.isVideo=!1,this.options=null,this.showContentByText=null,this.showIconSelect=null,this.isTranslate=!1}prepare(e){this.lang=e,document.addEventListener("mouseup",t=>{(t.target.id==="eJOY__extension_root"||t.target.id===Ve)&&this.handleCaptureTextEvent(t)}),document.addEventListener("mousedown",t=>{this.checkIgnore(t)}),chrome.storage.onChanged.addListener((t,s)=>{t.lang&&this.setLang(t.lang.newValue)})}setLang(e){this.lang=e}translate(e,t,s){const o=u(this.lang,"translateFrom.code",$e.code);let i=u(this.lang,"translateTo.code","vi");if(s){const n=document.querySelector(".ejoy-subtitles");n&&(i=n.getAttribute("data-lang-to"))}chrome.runtime.sendMessage(E(P.trans_simpl,{text:e,context:"",from:o,noCheckAdd:!0,to:i}),n=>{n.error||this.showText(n.text,t,s)})}}function ze(){const l=f.get("domeMailContent")||"div.adn",e=f.get("domeMailContentDetail")||[".gs > div:last-child .gt .aiL > div",".gs > div:last-child .gt .aiL"];if(document.querySelector(l)){const t=j.last(document.querySelectorAll(l));let s="";if(t)for(let o=0;o<e.length;o++){const i=e[o];if(s=t.querySelector(i)?t.querySelector(i).innerText:"",s)break}chrome.storage.local.set({sendTextToGmailForm:{}}),chrome.runtime.sendMessage(E(P.adv_rewrite,{text:s,type:"Reply",source:"gmail",originSource:encodeURIComponent(location.href)}))}}async function Ne(){const l="open-init-quick-repy-ejoy-ext";if(!document.querySelector(`.${l}`)){await ye('table[role="group"] tbody tr > td:last-child');const e=document.createElement("span");e.innerHTML=`<div><div style="
      font-style: normal;
      line-height: 16px;
      justify-content: center;
      font-family: -apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif,;
      display: inline-flex;
      flex-direction: row;
      align-items: center;
      padding: 0px 6px;
      gap: 4px;
      color: rgb(33, 43, 54);
      font-size: 13px;
      background: rgb(255, 255, 255);
      border: 1px solid #1DA1F2;
      border-radius: 6px;
      box-shadow: #1DA1F2 0px 2px 0px;
      cursor: pointer;
      height: 28px;
      font-weight: 500;
      transition: background-color 0.2s ease 0s, top 0.1s ease 0s, box-shadow 0.1s ease 0s;
      top: -1px;
      position: relative;
      user-select: none;
      white-space: nowrap;
      margin-left: 16px;
      --darkreader-inline-bgimage: initial;
      --darkreader-inline-color: #dfd7cc;
      --darkreader-inline-bgcolor: #262727;
      --darkreader-inline-border-top: #1DA1F2;
      --darkreader-inline-border-right: #1DA1F2;
      --darkreader-inline-border-bottom: #1DA1F2;
      --darkreader-inline-border-left: #1DA1F2;
      --darkreader-inline-boxshadow: #1DA1F2 0px 2px 0px;
    ">
      <svg style="padding-right: 2px" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.8336 19.1666C13.512 19.0678 15.584 16.318 15.4597 13.1578C14.9439 8.51909 9.43752 7.02587 11.6416 0.833252C7.21371 4.64929 4.03479 9.53475 4.17018 13.0107C4.2306 16.3824 6.18158 19.1666 9.8336 19.1666ZM13.1885 14.4621C13.7551 14.4621 14.1628 14.0002 14.2144 13.4363C14.3494 13.0388 14.2144 11.2173 12.8679 10.0495C13.0864 11.5663 12.0406 12.8264 12.1626 13.4363C12.1626 14.0028 12.6219 14.4621 13.1885 14.4621Z" fill="#1DA1F2"/>
      </svg>
      ${I("Quick_reply")}
    </div></div>`,e.className=l,e.style=`
      
    `,e.addEventListener("click",ze);const t=document.querySelector('table[role="group"] tbody tr > td:last-child');t&&t.parentNode.insertBefore(e,t)}}function We(l){const e=j.get(l,"originSource",""),t=j.get(l,"text","");if(e===location.href&&t){const s=document.querySelector(f.get("domInsertMail")||"div.editable");s&&(s.innerHTML=t)}}const Ue=j.throttle(We,500,{trailing:!1});function Ke(){window.location.pathname&&window.location.host==="mail.google.com"&&(chrome.storage.onChanged.addListener(e=>{e.sendTextToGmailForm&&Ue(e.sendTextToGmailForm.newValue)}),new MutationObserver(()=>{document.querySelector('table[role="group"] tbody tr > td:last-child')&&Ne()}).observe(document.body,{childList:!0,subtree:!0}))}const H={"netflix.com":{selector:"[data-videoid]",fallback:".watch-video"},"www.netflix.com":{selector:"[data-videoid]",fallback:".watch-video"},default:{selector:null,fallback:null}};function Ge(l){if(H[l])return H[l];for(const[e,t]of Object.entries(H))if(e!=="default"&&l.includes(e))return t;return H.default}function Je(l){const e=Ge(l);if(e.selector){const t=document.querySelector(e.selector);if(t)return t}return e.fallback?e.fallback==="document.documentElement"?document.documentElement:document.querySelector(e.fallback):null}const Xe=Pe;class Q extends ae.Component{render(){return X.jsx(ie,{params:this.props})}}let K=null;const ee=qe,te=Re;function G(){L.analytics.sendEvent(["ext_default_settings"]),chrome.runtime.sendMessage(E(P.windowOpen,{url:`chrome-extension://${chrome.runtime.id}/src/pages/options/index.html?screen=onboarding`}),()=>{})}function Ze(){if(window.location.pathname&&window.location.host==="ejoy-english.com"&&window.location.pathname.indexOf("extension/feature")>=0){const l=document.querySelector(".open-default");if(l)l.style.display="block",l.style.cursor="pointer",l.onclick=G;else if(!document.querySelector(".open-init-setting-ejoy-ext")){const e=document.createElement("div");e.innerText=I("Initial_settings"),e.className="open-init-setting-ejoy-ext",e.style=`
        background: #1DA1F2;
        border-radius: 40px;
        font-size: 16px;
        line-height: 24px;
        margin: 0 0 30px 0;
        color: #FFFFFF;
        white-space: nowrap;
        padding: 4px 25px;
        position: absolute;
        bottom: -30px;
        left: 50%;
        transform: translateX(-50px);
        cursor: pointer;
        `,e.addEventListener("click",G);const t=document.querySelector("section.header");t&&(t.style.paddingBottom="40px",t.appendChild(e))}}}const J=(l,e="authorize")=>()=>{l&&chrome.storage.local.set({redirectUriAfterLogin:l}),e!=="authorize"&&L.analytics.sendEvent(["ext_signup","login welcome"]),fe(e,t=>{`${t}${chrome.runtime.id}`,ge()})};function Qe(){try{if(window.location.pathname&&window.location.host==="ejoy-english.com"&&window.location.pathname.indexOf("extension/welcome")>=0){if(new URLSearchParams(window.location.search).get("fresh_install")==="true")try{["token","uSession","user","authToken","uID","secureID","ejoy_token","accessToken","isLoggedIn"].forEach(i=>localStorage.removeItem(i));const o=document.cookie.split(";");for(let i=0;i<o.length;i++){const n=o[i],r=n.indexOf("="),a=r>-1?n.substr(0,r):n;document.cookie=a+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/"}}catch{}const e=document.querySelector(".cta-btn > a"),t=document.querySelector(".cta-btn > p > a");if(e){const s=e.getAttribute("href");if(s){const i=new URL(s).searchParams.get("redirect_uri");e.setAttribute("href","#"),e.addEventListener("click",J(i,"signup"))}}if(t){const s=e.getAttribute("href");if(s){const i=new URL(s).searchParams.get("redirect_uri");t.setAttribute("href","#"),t.addEventListener("click",J(i))}}}}catch{}}function et(){try{if(window.location.pathname&&window.location.host==="ejoy-english.com"&&window.location.pathname.indexOf("/pdf")>=0)try{document.querySelector('[class^="uploadDocument_icon"]')&&(document.querySelector('[class^="uploadDocument_icon"]').style.pointerEvents="none"),document.querySelector('[class^="uploadDocument_ejoyPro"]')&&document.querySelector('[class^="uploadDocument_ejoyPro"]').addEventListener("click",()=>{L.analytics.sendEvent(["ext_pro_pdf"])})}catch{}}catch{}}pe(document).ready(()=>{Ze(),Qe(),Ke(),Ie(),et();let l=0,e=null;Se().then(t=>{t.video&&(K=new je,K.prepare(ee,te)),N("lang",o=>{const i=o.lang||{};new Ye().prepare(i)});function s(o){const i=o.attachShadow({mode:"open"});i.innerHTML=`
        <style>
          @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600');
          ${ne}
          ${re}
        </style>
        <div id='eJOY__extension_shadow' />
        `,ce.render(X.jsx(Q,{}),i.querySelector("#eJOY__extension_shadow")),le(i)}e&&clearInterval(e),e=setInterval(()=>{if(l++,l>4&&(l=0,clearInterval(e)),document.getElementById("eJOY__extension_root"))return;const o=document.createElement("div");o.id="eJOY__extension_root",o.className="eJOY__extension_root_class",o.style="all: unset;";const i=Je(window.location.hostname);i?i.appendChild(o):document.documentElement.appendChild(o),s(o)},1e3),chrome.runtime.sendMessage(E(P.browser_action,{url:window.location.href}),o=>{})})});const wt=Object.freeze(Object.defineProperty({__proto__:null,closePop:te,default:Q,eJOYPopId:Xe,showPop:ee},Symbol.toStringTag,{value:"Module"}));export{St as a,wt as i,yt as p,bt as s};
