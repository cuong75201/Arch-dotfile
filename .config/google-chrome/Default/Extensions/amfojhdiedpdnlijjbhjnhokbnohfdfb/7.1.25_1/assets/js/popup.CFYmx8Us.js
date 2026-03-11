import{v as P,a as R,r as J,R as Y}from"./react-shadow-dom-retarget-events.MJue8_K6.js";import{r as D,j as d,a as I}from"./index.CeCz5Hf8.js";import{j as i}from"./index.VUlTxN3P.js";const o="eJOY-pop-container-popup";class T extends I.Component{render(){return d.jsx(Y,{params:this.props})}}const b=({text:s,rootClass:l,cbResponse:p,styleContainer:m,style:c,posTriangle:r,context:u,styleMainContent:x,styleHeaderContainer:f,styleHeaderBar:h,from:_,to:v,hiddenAdv:j,hiddenClose:y,showFullTextTab:g,isIdiom:w,fullWidth:E,hiddenReader:O})=>{const a=s.trim(),n=i(`.${l}`)[0];if(i("body").find(`#${o}`).remove(),n){let e=document.getElementById(o);e=document.createElement("div"),e.id=o,e.style=c,n.appendChild(e);const t=e.attachShadow({mode:"open"});if(t.innerHTML=`
    <style>
      ${P}
      ${R}
     </style>
     <div id='eJOY__extension_shadow' />
     `,!a)return;D.render(d.jsx(T,{text:a,isTriangle:!!r,posTriangle:r,isHasDetect:!1,isNotTrigger:!0,styleMainContent:x,style:m,cbResponse:p,styleHeaderContainer:f,styleHeaderBar:h,hiddenClose:y,fullWidth:E||!1,isIdiom:w||!1,showFullTextTab:g||!1,hiddenReader:O,hiddenAdv:j,from:_||"Auto Detect",medium:"netflix",to:v||"vi",context:u.replace(/\s+/g," "),translatePlace:"nexflix improve"}),t.querySelector("#eJOY__extension_shadow")),J(t)}};export{b as s};
