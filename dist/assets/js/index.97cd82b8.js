(function(e){function t(t){for(var r,o,c=t[0],i=t[1],s=t[2],d=0,l=[];d<c.length;d++)o=c[d],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&l.push(a[o][0]),a[o]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);f&&f(t);while(l.length)l.shift()();return u.push.apply(u,s||[]),n()}function n(){for(var e,t=0;t<u.length;t++){for(var n=u[t],r=!0,o=1;o<n.length;o++){var c=n[o];0!==a[c]&&(r=!1)}r&&(u.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},o={index:0},a={index:0},u=[];function c(e){return i.p+"assets/js/"+({}[e]||e)+"."+{"chunk-2a95ebd8":"1f5b3fb9","chunk-2d0b91da":"80bbe319","chunk-2d0e4a43":"62fd91e0","chunk-2d215fc3":"b7e7cb88","chunk-ebb5df84":"bb601c2a"}[e]+".js"}function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(e){var t=[],n={"chunk-2a95ebd8":1,"chunk-ebb5df84":1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=new Promise((function(t,n){for(var r="assets/css/"+({}[e]||e)+"."+{"chunk-2a95ebd8":"02209eb2","chunk-2d0b91da":"31d6cfe0","chunk-2d0e4a43":"31d6cfe0","chunk-2d215fc3":"31d6cfe0","chunk-ebb5df84":"cdc51068"}[e]+".css",a=i.p+r,u=document.getElementsByTagName("link"),c=0;c<u.length;c++){var s=u[c],d=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(d===r||d===a))return t()}var l=document.getElementsByTagName("style");for(c=0;c<l.length;c++){s=l[c],d=s.getAttribute("data-href");if(d===r||d===a)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var r=t&&t.target&&t.target.src||a,u=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");u.code="CSS_CHUNK_LOAD_FAILED",u.request=r,delete o[e],f.parentNode.removeChild(f),n(u)},f.href=a;var p=document.getElementsByTagName("head")[0];p.appendChild(f)})).then((function(){o[e]=0})));var r=a[e];if(0!==r)if(r)t.push(r[2]);else{var u=new Promise((function(t,n){r=a[e]=[t,n]}));t.push(r[2]=u);var s,d=document.createElement("script");d.charset="utf-8",d.timeout=120,i.nc&&d.setAttribute("nonce",i.nc),d.src=c(e);var l=new Error;s=function(t){d.onerror=d.onload=null,clearTimeout(f);var n=a[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;l.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",l.name="ChunkLoadError",l.type=r,l.request=o,n[1](l)}a[e]=void 0}};var f=setTimeout((function(){s({type:"timeout",target:d})}),12e4);d.onerror=d.onload=s,document.head.appendChild(d)}return Promise.all(t)},i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/vue-spa-koshelek/",i.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],d=s.push.bind(s);s.push=t,s=s.slice();for(var l=0;l<s.length;l++)t(s[l]);var f=d;u.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d"),n("def6");var r=n("2b0e"),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},a=[],u={name:"App"},c=u,i=n("2877"),s=Object(i["a"])(c,o,a,!1,null,null,null),d=s.exports,l=n("8c4f"),f=function(e,t,n){n()},p=function(e,t){r["a"].nextTick((function(){document.title=e.meta.title||""}))},h=(n("d3b7"),n("3ca3"),n("ddb0"),function(){return n.e("chunk-2a95ebd8").then(n.bind(null,"9be7"))}),b=function(){return n.e("chunk-2d0b91da").then(n.bind(null,"3227"))},m={path:"/",component:h,redirect:{name:"Main"},children:[{path:"",name:"Main",component:function(){return n.e("chunk-ebb5df84").then(n.bind(null,"dd81"))},meta:{title:"Биржа"}},{path:"settings",name:"Settings",component:function(){return n.e("chunk-2d215fc3").then(n.bind(null,"c110"))},meta:{title:"Настройки"}}]},v={path:"*",component:b,redirect:{name:"Error-Not-Found"},children:[{path:"page-not-found",name:"Error-Not-Found",component:function(){return n.e("chunk-2d0e4a43").then(n.bind(null,"90a7"))}}]},g=[m,v];r["a"].use(l["a"]);var y={mode:"history",base:"/vue-spa-koshelek/",routes:g},k=new l["a"](y);k.beforeEach(f),k.afterEach(p);var w=k,O=n("8468"),S=(n("d81d"),n("b64b"),n("2f62"));r["a"].use(S["a"]);var E="crypto-list",T=JSON.parse(localStorage.getItem(E))||[],j=new S["a"].Store({state:{symbols:T,availableSymbolsName:["BTCUSDT","BNBBTC","ETHBTC"]},mutations:{},actions:{saveListTikers:function(e,t){Object(O["a"])(e),localStorage.setItem(E,JSON.stringify(t))}},getters:{symbolNames:function(e){return e.symbols.map((function(e){return Object.keys(e)[0]}))||[]}}});r["a"].config.productionTip=!1,new r["a"]({router:w,store:j,render:function(e){return e(d)}}).$mount("#app")},def6:function(e,t,n){}});