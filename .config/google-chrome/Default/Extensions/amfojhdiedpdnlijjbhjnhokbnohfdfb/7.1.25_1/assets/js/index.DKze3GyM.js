function r(){return new Promise((e,t)=>{requestAnimationFrame(()=>{e()})})}const i=(e=0,...t)=>new Promise((n,o)=>setTimeout(()=>{r().then(()=>n(...t))},e));export{i as d};
