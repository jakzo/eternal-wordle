function V(){}function Q(t){return t()}function K(){return Object.create(null)}function B(t){t.forEach(Q)}function fn(t){return typeof t=="function"}function An(t,o){return t!=t?o==o:t!==o||t&&typeof t=="object"||typeof t=="function"}function an(t){return Object.keys(t).length===0}function Cn(t){return t==null?"":t}function kn(t,o){t.appendChild(o)}function Sn(t,o,c){t.insertBefore(o,c||null)}function sn(t){t.parentNode.removeChild(t)}function Xn(t,o){for(let c=0;c<t.length;c+=1)t[c]&&t[c].d(o)}function zn(t){return document.createElement(t)}function W(t){return document.createTextNode(t)}function En(){return W(" ")}function qn(){return W("")}function Mn(t,o,c,s){return t.addEventListener(o,c,s),()=>t.removeEventListener(o,c,s)}function Gn(t){return function(o){return o.preventDefault(),t.call(this,o)}}function Dn(t){return function(o){return o.stopPropagation(),t.call(this,o)}}function Pn(t,o,c){c==null?t.removeAttribute(o):t.getAttribute(o)!==c&&t.setAttribute(o,c)}function Tn(t){return t===""?null:+t}function ln(t){return Array.from(t.childNodes)}function Bn(t,o){o=""+o,t.wholeText!==o&&(t.data=o)}function Ln(t,o){t.value=o==null?"":o}function Nn(t,o,c,s){c===null?t.style.removeProperty(o):t.style.setProperty(o,c,s?"important":"")}function On(t,o,c){t.classList[c?"add":"remove"](o)}let T;function P(t){T=t}function xn(){if(!T)throw new Error("Function called outside component initialization");return T}function Fn(t){xn().$$.on_mount.push(t)}function Rn(t,o){const c=t.$$.callbacks[o.type];c&&c.slice().forEach(s=>s.call(this,o))}const D=[],U=[],O=[],H=[],hn=Promise.resolve();let I=!1;function dn(){I||(I=!0,hn.then(Y))}function J(t){O.push(t)}function Hn(t){H.push(t)}const R=new Set;let N=0;function Y(){const t=T;do{for(;N<D.length;){const o=D[N];N++,P(o),pn(o.$$)}for(P(null),D.length=0,N=0;U.length;)U.pop()();for(let o=0;o<O.length;o+=1){const c=O[o];R.has(c)||(R.add(c),c())}O.length=0}while(D.length);for(;H.length;)H.pop()();I=!1,R.clear(),P(t)}function pn(t){if(t.fragment!==null){t.update(),B(t.before_update);const o=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,o),t.after_update.forEach(J)}}const F=new Set;let E;function In(){E={r:0,c:[],p:E}}function Jn(){E.r||B(E.c),E=E.p}function Z(t,o){t&&t.i&&(F.delete(t),t.i(o))}function Kn(t,o,c,s){if(t&&t.o){if(F.has(t))return;F.add(t),E.c.push(()=>{F.delete(t),s&&(c&&t.d(1),s())}),t.o(o)}}function Un(t,o){t.d(1),o.delete(t.key)}function Vn(t,o,c,s,h,w,x,a,n,r,u,e){let i=t.length,f=w.length,l=i;const _={};for(;l--;)_[t[l].key]=l;const $=[],b=new Map,k=new Map;for(l=f;l--;){const d=e(h,w,l),v=c(d);let y=x.get(v);y?s&&y.p(d,o):(y=r(v,d),y.c()),b.set(v,$[l]=y),v in _&&k.set(v,Math.abs(l-_[v]))}const X=new Set,p=new Set;function g(d){Z(d,1),d.m(a,u),x.set(d.key,d),u=d.first,f--}for(;i&&f;){const d=$[f-1],v=t[i-1],y=d.key,m=v.key;d===v?(u=d.first,i--,f--):b.has(m)?!x.has(y)||X.has(y)?g(d):p.has(m)?i--:k.get(y)>k.get(m)?(p.add(y),g(d)):(X.add(m),i--):(n(v,x),i--)}for(;i--;){const d=t[i];b.has(d.key)||n(d,x)}for(;f;)g($[f-1]);return $}function Qn(t,o,c){const s=t.$$.props[o];s!==void 0&&(t.$$.bound[s]=c,c(t.$$.ctx[s]))}function Wn(t){t&&t.c()}function gn(t,o,c,s){const{fragment:h,on_mount:w,on_destroy:x,after_update:a}=t.$$;h&&h.m(o,c),s||J(()=>{const n=w.map(Q).filter(fn);x?x.push(...n):B(n),t.$$.on_mount=[]}),a.forEach(J)}function yn(t,o){const c=t.$$;c.fragment!==null&&(B(c.on_destroy),c.fragment&&c.fragment.d(o),c.on_destroy=c.fragment=null,c.ctx=[])}function vn(t,o){t.$$.dirty[0]===-1&&(D.push(t),dn(),t.$$.dirty.fill(0)),t.$$.dirty[o/31|0]|=1<<o%31}function Yn(t,o,c,s,h,w,x,a=[-1]){const n=T;P(t);const r=t.$$={fragment:null,ctx:null,props:w,update:V,not_equal:h,bound:K(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(o.context||(n?n.$$.context:[])),callbacks:K(),dirty:a,skip_bound:!1,root:o.target||n.$$.root};x&&x(r.root);let u=!1;if(r.ctx=c?c(t,o.props||{},(e,i,...f)=>{const l=f.length?f[0]:i;return r.ctx&&h(r.ctx[e],r.ctx[e]=l)&&(!r.skip_bound&&r.bound[e]&&r.bound[e](l),u&&vn(t,e)),i}):[],r.update(),u=!0,B(r.before_update),r.fragment=s?s(r.ctx):!1,o.target){if(o.hydrate){const e=ln(o.target);r.fragment&&r.fragment.l(e),e.forEach(sn)}else r.fragment&&r.fragment.c();o.intro&&Z(t.$$.fragment),gn(t,o.target,o.anchor,o.customElement),Y()}P(n)}class Zn{$destroy(){yn(this,1),this.$destroy=V}$on(o,c){const s=this.$$.callbacks[o]||(this.$$.callbacks[o]=[]);return s.push(c),()=>{const h=s.indexOf(c);h!==-1&&s.splice(h,1)}}$set(o){this.$$set&&!an(o)&&(this.$$.skip_bound=!0,this.$$set(o),this.$$.skip_bound=!1)}}var q=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{},nn={exports:{}};(function(t){(function(o,c,s){function h(n){var r=this,u=a();r.next=function(){var e=2091639*r.s0+r.c*23283064365386963e-26;return r.s0=r.s1,r.s1=r.s2,r.s2=e-(r.c=e|0)},r.c=1,r.s0=u(" "),r.s1=u(" "),r.s2=u(" "),r.s0-=u(n),r.s0<0&&(r.s0+=1),r.s1-=u(n),r.s1<0&&(r.s1+=1),r.s2-=u(n),r.s2<0&&(r.s2+=1),u=null}function w(n,r){return r.c=n.c,r.s0=n.s0,r.s1=n.s1,r.s2=n.s2,r}function x(n,r){var u=new h(n),e=r&&r.state,i=u.next;return i.int32=function(){return u.next()*4294967296|0},i.double=function(){return i()+(i()*2097152|0)*11102230246251565e-32},i.quick=i,e&&(typeof e=="object"&&w(e,u),i.state=function(){return w(u,{})}),i}function a(){var n=4022871197,r=function(u){u=String(u);for(var e=0;e<u.length;e++){n+=u.charCodeAt(e);var i=.02519603282416938*n;n=i>>>0,i-=n,i*=n,n=i>>>0,i-=n,n+=i*4294967296}return(n>>>0)*23283064365386963e-26};return r}c&&c.exports?c.exports=x:s&&s.amd?s(function(){return x}):this.alea=x})(q,t,!1)})(nn);var tn={exports:{}};(function(t){(function(o,c,s){function h(a){var n=this,r="";n.x=0,n.y=0,n.z=0,n.w=0,n.next=function(){var e=n.x^n.x<<11;return n.x=n.y,n.y=n.z,n.z=n.w,n.w^=n.w>>>19^e^e>>>8},a===(a|0)?n.x=a:r+=a;for(var u=0;u<r.length+64;u++)n.x^=r.charCodeAt(u)|0,n.next()}function w(a,n){return n.x=a.x,n.y=a.y,n.z=a.z,n.w=a.w,n}function x(a,n){var r=new h(a),u=n&&n.state,e=function(){return(r.next()>>>0)/4294967296};return e.double=function(){do var i=r.next()>>>11,f=(r.next()>>>0)/4294967296,l=(i+f)/(1<<21);while(l===0);return l},e.int32=r.next,e.quick=e,u&&(typeof u=="object"&&w(u,r),e.state=function(){return w(r,{})}),e}c&&c.exports?c.exports=x:s&&s.amd?s(function(){return x}):this.xor128=x})(q,t,!1)})(tn);var en={exports:{}};(function(t){(function(o,c,s){function h(a){var n=this,r="";n.next=function(){var e=n.x^n.x>>>2;return n.x=n.y,n.y=n.z,n.z=n.w,n.w=n.v,(n.d=n.d+362437|0)+(n.v=n.v^n.v<<4^(e^e<<1))|0},n.x=0,n.y=0,n.z=0,n.w=0,n.v=0,a===(a|0)?n.x=a:r+=a;for(var u=0;u<r.length+64;u++)n.x^=r.charCodeAt(u)|0,u==r.length&&(n.d=n.x<<10^n.x>>>4),n.next()}function w(a,n){return n.x=a.x,n.y=a.y,n.z=a.z,n.w=a.w,n.v=a.v,n.d=a.d,n}function x(a,n){var r=new h(a),u=n&&n.state,e=function(){return(r.next()>>>0)/4294967296};return e.double=function(){do var i=r.next()>>>11,f=(r.next()>>>0)/4294967296,l=(i+f)/(1<<21);while(l===0);return l},e.int32=r.next,e.quick=e,u&&(typeof u=="object"&&w(u,r),e.state=function(){return w(r,{})}),e}c&&c.exports?c.exports=x:s&&s.amd?s(function(){return x}):this.xorwow=x})(q,t,!1)})(en);var rn={exports:{}};(function(t){(function(o,c,s){function h(a){var n=this;n.next=function(){var u=n.x,e=n.i,i,f;return i=u[e],i^=i>>>7,f=i^i<<24,i=u[e+1&7],f^=i^i>>>10,i=u[e+3&7],f^=i^i>>>3,i=u[e+4&7],f^=i^i<<7,i=u[e+7&7],i=i^i<<13,f^=i^i<<9,u[e]=f,n.i=e+1&7,f};function r(u,e){var i,f=[];if(e===(e|0))f[0]=e;else for(e=""+e,i=0;i<e.length;++i)f[i&7]=f[i&7]<<15^e.charCodeAt(i)+f[i+1&7]<<13;for(;f.length<8;)f.push(0);for(i=0;i<8&&f[i]===0;++i);for(i==8&&(f[7]=-1),u.x=f,u.i=0,i=256;i>0;--i)u.next()}r(n,a)}function w(a,n){return n.x=a.x.slice(),n.i=a.i,n}function x(a,n){a==null&&(a=+new Date);var r=new h(a),u=n&&n.state,e=function(){return(r.next()>>>0)/4294967296};return e.double=function(){do var i=r.next()>>>11,f=(r.next()>>>0)/4294967296,l=(i+f)/(1<<21);while(l===0);return l},e.int32=r.next,e.quick=e,u&&(u.x&&w(u,r),e.state=function(){return w(r,{})}),e}c&&c.exports?c.exports=x:s&&s.amd?s(function(){return x}):this.xorshift7=x})(q,t,!1)})(rn);var on={exports:{}};(function(t){(function(o,c,s){function h(a){var n=this;n.next=function(){var u=n.w,e=n.X,i=n.i,f,l;return n.w=u=u+1640531527|0,l=e[i+34&127],f=e[i=i+1&127],l^=l<<13,f^=f<<17,l^=l>>>15,f^=f>>>12,l=e[i]=l^f,n.i=i,l+(u^u>>>16)|0};function r(u,e){var i,f,l,_,$,b=[],k=128;for(e===(e|0)?(f=e,e=null):(e=e+"\0",f=0,k=Math.max(k,e.length)),l=0,_=-32;_<k;++_)e&&(f^=e.charCodeAt((_+32)%e.length)),_===0&&($=f),f^=f<<10,f^=f>>>15,f^=f<<4,f^=f>>>13,_>=0&&($=$+1640531527|0,i=b[_&127]^=f+$,l=i==0?l+1:0);for(l>=128&&(b[(e&&e.length||0)&127]=-1),l=127,_=4*128;_>0;--_)f=b[l+34&127],i=b[l=l+1&127],f^=f<<13,i^=i<<17,f^=f>>>15,i^=i>>>12,b[l]=f^i;u.w=$,u.X=b,u.i=l}r(n,a)}function w(a,n){return n.i=a.i,n.w=a.w,n.X=a.X.slice(),n}function x(a,n){a==null&&(a=+new Date);var r=new h(a),u=n&&n.state,e=function(){return(r.next()>>>0)/4294967296};return e.double=function(){do var i=r.next()>>>11,f=(r.next()>>>0)/4294967296,l=(i+f)/(1<<21);while(l===0);return l},e.int32=r.next,e.quick=e,u&&(u.X&&w(u,r),e.state=function(){return w(r,{})}),e}c&&c.exports?c.exports=x:s&&s.amd?s(function(){return x}):this.xor4096=x})(q,t,!1)})(on);var un={exports:{}};(function(t){(function(o,c,s){function h(a){var n=this,r="";n.next=function(){var e=n.b,i=n.c,f=n.d,l=n.a;return e=e<<25^e>>>7^i,i=i-f|0,f=f<<24^f>>>8^l,l=l-e|0,n.b=e=e<<20^e>>>12^i,n.c=i=i-f|0,n.d=f<<16^i>>>16^l,n.a=l-e|0},n.a=0,n.b=0,n.c=-1640531527,n.d=1367130551,a===Math.floor(a)?(n.a=a/4294967296|0,n.b=a|0):r+=a;for(var u=0;u<r.length+20;u++)n.b^=r.charCodeAt(u)|0,n.next()}function w(a,n){return n.a=a.a,n.b=a.b,n.c=a.c,n.d=a.d,n}function x(a,n){var r=new h(a),u=n&&n.state,e=function(){return(r.next()>>>0)/4294967296};return e.double=function(){do var i=r.next()>>>11,f=(r.next()>>>0)/4294967296,l=(i+f)/(1<<21);while(l===0);return l},e.int32=r.next,e.quick=e,u&&(typeof u=="object"&&w(u,r),e.state=function(){return w(r,{})}),e}c&&c.exports?c.exports=x:s&&s.amd?s(function(){return x}):this.tychei=x})(q,t,!1)})(un);var cn={exports:{}};(function(t){(function(o,c,s){var h=256,w=6,x=52,a="random",n=s.pow(h,w),r=s.pow(2,x),u=r*2,e=h-1,i;function f(p,g,d){var v=[];g=g==!0?{entropy:!0}:g||{};var y=b($(g.entropy?[p,X(c)]:p==null?k():p,3),v),m=new l(v),A=function(){for(var j=m.g(w),S=n,C=0;j<r;)j=(j+C)*h,S*=h,C=m.g(1);for(;j>=u;)j/=2,S/=2,C>>>=1;return(j+C)/S};return A.int32=function(){return m.g(4)|0},A.quick=function(){return m.g(4)/4294967296},A.double=A,b(X(m.S),c),(g.pass||d||function(j,S,C,z){return z&&(z.S&&_(z,m),j.state=function(){return _(m,{})}),C?(s[a]=j,S):j})(A,y,"global"in g?g.global:this==s,g.state)}function l(p){var g,d=p.length,v=this,y=0,m=v.i=v.j=0,A=v.S=[];for(d||(p=[d++]);y<h;)A[y]=y++;for(y=0;y<h;y++)A[y]=A[m=e&m+p[y%d]+(g=A[y])],A[m]=g;(v.g=function(j){for(var S,C=0,z=v.i,L=v.j,G=v.S;j--;)S=G[z=e&z+1],C=C*h+G[e&(G[z]=G[L=e&L+S])+(G[L]=S)];return v.i=z,v.j=L,C})(h)}function _(p,g){return g.i=p.i,g.j=p.j,g.S=p.S.slice(),g}function $(p,g){var d=[],v=typeof p,y;if(g&&v=="object")for(y in p)try{d.push($(p[y],g-1))}catch{}return d.length?d:v=="string"?p:p+"\0"}function b(p,g){for(var d=p+"",v,y=0;y<d.length;)g[e&y]=e&(v^=g[e&y]*19)+d.charCodeAt(y++);return X(g)}function k(){try{var p;return i&&(p=i.randomBytes)?p=p(h):(p=new Uint8Array(h),(o.crypto||o.msCrypto).getRandomValues(p)),X(p)}catch{var g=o.navigator,d=g&&g.plugins;return[+new Date,o,d,o.screen,X(c)]}}function X(p){return String.fromCharCode.apply(0,p)}if(b(s.random(),c),t.exports){t.exports=f;try{i=require("crypto")}catch{}}else s["seed"+a]=f})(typeof self!="undefined"?self:q,[],Math)})(cn);var wn=nn.exports,_n=tn.exports,mn=en.exports,bn=rn.exports,$n=on.exports,jn=un.exports,M=cn.exports;M.alea=wn;M.xor128=_n;M.xorwow=mn;M.xorshift7=bn;M.xor4096=$n;M.tychei=jn;var nt=M;export{gn as A,Hn as B,Z as C,Kn as D,yn as E,nt as F,Fn as G,Jn as H,In as I,Tn as J,Ln as K,Zn as S,En as a,Pn as b,Sn as c,kn as d,zn as e,Bn as f,sn as g,Un as h,Yn as i,qn as j,On as k,Mn as l,Xn as m,V as n,Nn as o,Dn as p,Cn as q,B as r,An as s,W as t,Vn as u,Gn as v,Rn as w,U as x,Qn as y,Wn as z};
