import{R as g}from"./ShoppingCart-B9K3qvnT-DRFsorl3.js";const D=(t,n)=>{const c=t.querySelectorAll(".mockup_img"),o=new Set,r=10;c.forEach((s,d)=>{let a;if(d===0){s.src=n;const i=parseInt(n.split("/").pop().split(".")[0]);o.add(i)}else{do a=S(1,r);while(o.has(a));o.add(a),s.src=`./assets/images/Recommend/${a}.jpg`}s.onclick=()=>{A(d),v(d)}}),v(0)},A=t=>{const n=document.querySelector(".mockup_img"),c=document.querySelectorAll(".td_box .mockup_img");n.src=c[t].src},v=t=>{document.querySelectorAll(".td_box .mockup_img").forEach((n,c)=>{c===t?n.classList.add("highlighted"):n.classList.remove("highlighted")})};document.addEventListener("DOMContentLoaded",function(){const t=document.querySelector(".addcart");t&&t.addEventListener("click",P);const n=document.querySelector(".collection"),c=document.getElementById("messageContainer");(t||n)&&(t.addEventListener("click",function(e){e.preventDefault(),I(c,"已添加购物车")}),n.addEventListener("click",function(e){e.preventDefault(),I(c,"已收藏")}));const o=g.getProductData();if(!o){console.error("No product data found.");return}const r=document.querySelector(".mockup_img");r&&(r.src="./"+o.image);const s=document.querySelector(".head_span");s&&(s.textContent=o.text);const d=document.querySelector(".tr_two.Price");d&&(d.textContent=o.price);const a=document.querySelector(".tr_two.fire");a&&$(a,5);const i=document.querySelector(".tr_there");if(i){const e=S(100,1e3);i.textContent=`${e} 件可售`,i.dataset.maxStock=e}const q=document.querySelector(".td_box");q&&D(q,r.src);const u=document.querySelector(".i_txt"),h=o.defaultQuantity||1;u.value=h,u&&u.addEventListener("input",function(){const e=u.value.trim(),l=parseInt(i.dataset.maxStock);isNaN(e)||e<=0||e>l?u.value=1:y(u.value)});const _=document.querySelector(".decrement"),k=document.querySelector(".increment");_&&k&&(_.addEventListener("click",function(){const e=parseInt(u.value);e>1&&(u.value=e-1,y(u.value))}),k.addEventListener("click",function(){const e=parseInt(u.value),l=parseInt(i.dataset.maxStock);e<l&&(u.value=e+1,y(u.value))}));const x=document.querySelector(".left_button"),E=document.querySelector(".right_button");let m=0;x&&E&&(x.addEventListener("click",()=>L(-1)),E.addEventListener("click",()=>L(1)));const f=document.querySelector(".there input");f&&(f.value=b(C(h,o.price)));function L(e){const l=document.querySelectorAll(".td_box .mockup_img"),p=l.length;m=(m+e+p)%p;const N=document.querySelector(".mockup_img");N.src=l[m].src,v(m)}function y(e){const l=C(e,o.price);f&&(f.value=b(l))}function C(e,l){const p=parseFloat(l.replace("¥",""));return e*p}function b(e){return`¥ ${e.toFixed(2)}`}});const $=(t,n)=>{const c="./assets/images/Detail/fire-icon.png",o=t.querySelectorAll("span");for(let r=0;r<n;r++){const s=document.createElement("img");s.src=c,s.alt="Fire Icon",t.insertBefore(s,t.firstChild),r<n-1&&t.insertBefore(document.createTextNode(" "),t.firstChild)}for(let r=0;r<o.length;r++){const s=S(100,1e3);o[r].textContent=`${s}`}},S=(t,n)=>Math.floor(Math.random()*(n-t+1))+t;function P(t){t.preventDefault();const n=g.getProductData();if(!n){console.error("No product data found.");return}const c=document.querySelector(".i_txt"),o=parseInt(c.value,10);if(isNaN(o)||o<=0){console.error("Invalid quantity.");return}const r={...n,quantity:o};g.storePromotionData(r)}function I(t,n){const c=document.createElement("div");c.className="message",c.textContent=n;const o=Array.from(t.querySelectorAll(".message"));t.appendChild(c),o.forEach((r,s)=>{setTimeout(()=>{r.style.bottom=`${90+(o.length-s)*85}px`,console.log("msg.style.bottom="+r.style.bottom)},10)}),c.style.bottom="10%",setTimeout(function(){c.style.opacity="0",setTimeout(function(){c.parentNode===t?(t.removeChild(c),console.log("消息已移除")):console.error("消息元素已经不在原来的容器中")},500)},3e3)}
//# sourceMappingURL=DetailJs-CYrpu2RQ-agxul6C5.js.map
