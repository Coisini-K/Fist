class m{constructor(){this.initFunctions={},this.destroyFunctions={}}InitFunction(e,n){this.initFunctions[e]=n}DestroyFunction(e,n){this.destroyFunctions[e]=n}async initPage(e){const n=this.initFunctions[e];n&&await n()}async destroyPage(e){const n=this.destroyFunctions[e];n&&await n()}}const d=new m,c={productData:null,promotionData:[],init:function(){const t=localStorage.getItem("promotionData");if(t)try{this.promotionData=JSON.parse(t)}catch(e){console.error("Error parsing promotion data from localStorage:",e),this.promotionData=[]}},storeProductData:function(t){this.productData=t,localStorage.setItem("productData",JSON.stringify(t))},getProductData:function(){if(this.productData)return this.productData;{const t=localStorage.getItem("productData");return t?(this.productData=JSON.parse(t),this.productData):null}},storePromotionData:function(t){const e=this.promotionData.findIndex(n=>n.image===t.image);e!==-1?this.promotionData[e].quantity+=parseInt(t.quantity)||1:(t.quantity=parseInt(t.quantity)||1,this.promotionData.push(t)),localStorage.setItem("promotionData",JSON.stringify(this.promotionData))},getPromotionData:function(){return this.promotionData},removePromotion:function(t){return this.promotionData=this.promotionData.filter(e=>e.image!==t),localStorage.setItem("promotionData",JSON.stringify(this.promotionData)),this.promotionData},updateQuantity:function(t,e){console.log(`Updating promotion quantity for image ${t} to ${e}`);try{const n=this.promotionData.findIndex(i=>i.image===t);if(n!==-1){console.log("Found existing item, updating quantity."),this.promotionData[n].quantity=Math.max(e,1);try{localStorage.setItem("promotionData",JSON.stringify(this.promotionData)),console.log("Successfully updated localStorage.")}catch(i){console.error("Error updating promotion data in localStorage:",i)}}else console.warn("No matching item found for image",t)}catch(n){console.error("An error occurred while updating promotion quantity:",n)}},aggregate:function(){const t=new Map;return this.promotionData.forEach(e=>{const n=e.image;if(t.has(n)){const i=t.get(n);i.quantity+=parseInt(e.quantity)||1}else e.quantity=parseInt(e.quantity)||1,t.set(n,{...e})}),Array.from(t.values())}};c.init();const l={initialized:!1,cartContainer:null,init(){this.initialized||(this.initialized=!0,this.updateDynamic=this.updateDynamic.bind(this),this.handleQuantityChange=this.handleQuantityChange.bind(this),this.cartContainer=document.querySelector(".cart"),this.loadPromotions())},destroy(){this.cartContainer&&(this.cartContainer.innerHTML="",delete this.cartContainer.hasEventListener,this.cartContainer.removeEventListener("click",this.handleClickEvent.bind(this))),this.initialized=!1,this.cartContainer=null},handleClickEvent(t){if(console.log(),t.target.closest(".decrement")||t.target.closest(".increment")){const e=t.target.closest(".increment")?1:-1,n=t.target.closest(".cart_item");this.updateDynamic(n,e)}},loadPromotions(){const t=c.aggregate();if((!t||!t.length)&&console.warn("未找到促销信息或促销列表为空。"),this.cartContainer&&(this.cartContainer.innerHTML=""),t&&t.length)t.forEach(e=>{const n=this.createCartItem(e);this.cartContainer&&this.cartContainer.appendChild(n)}),this.cartContainer&&!this.cartContainer.hasEventListener&&(this.cartContainer.addEventListener("click",this.handleClickEvent.bind(this)),this.cartContainer.hasEventListener=!0);else{const e=document.createElement("div");e.classList.add("default_image_container");const n=document.createElement("img");n.src="./assets/cart.png",n.alt="无促销信息",n.style.width="100%",n.style.maxWidth="40%",n.style.margin="auto",n.style.display="block";const i=document.createElement("div");i.classList.add("nulldiv"),i.textContent="购物车为空",e.appendChild(n),e.appendChild(i),this.cartContainer&&this.cartContainer.appendChild(e)}},createCartItem(t){const e=document.createElement("div");e.classList.add("cart_item"),e.dataset.image=t.image;const n=document.createElement("div");n.classList.add("item_checkbox");const i=document.createElement("input");i.type="checkbox",i.classList.add("checkbox_input"),n.appendChild(i),e.appendChild(n);const a=document.createElement("div");a.classList.add("item_image");const o=document.createElement("img");o.src=t.image,o.alt="商品图片",o.setAttribute("data-image",t.image),a.appendChild(o),e.appendChild(a);const r=document.createElement("div");r.classList.add("item_message"),r.textContent=t.text||"无描述可用",e.appendChild(r);const s=document.createElement("div");s.classList.add("item_price"),s.textContent=`${t.price}`,e.appendChild(s);const h=this.QuantityForm(t.quantity);return e.appendChild(h),e},QuantityForm(t){const e=document.createElement("div");e.classList.add("quantity_form");const n=document.createElement("a");n.href="javascript:",n.classList.add("decrement"),n.textContent="-";const i=document.createElement("input");i.type="text",i.classList.add("quantity_input"),i.value=t;const a=document.createElement("a");return a.href="javascript:",a.classList.add("increment"),a.textContent="+",i.addEventListener("blur",o=>{this.handleQuantityChange(o.target)}),e.appendChild(n),e.appendChild(i),e.appendChild(a),e},handleQuantityChange(t){const e=t.closest(".cart_item");if(!e){console.error("Cart item div not found.");return}const n=parseInt(t.value,10)||0;if(n>=0){const i=e.dataset.image;try{c.updateQuantity(i,n)}catch(a){console.error("更新商品数量失败:",a)}}else console.warn("数量不能低于零。"),t.value=0},updateDynamic(t,e){const n=t.querySelector(".quantity_input");if(!n){console.error("Quantity input not found in cart item.");return}n.disabled=!0;let i=parseInt(n.value,10)||0;if(console.log(e),console.log(i),i+=e,console.log(e),console.log(i),i>=0){n.value=i;const a=t.dataset.image;try{c.updateQuantity(a,i)}catch(o){console.error("更新商品数量失败:",o)}}else console.warn("数量不能低于零。");n.disabled=!1}},u={init(){this.headerCheckbox=document.querySelector(".header_checkbox"),this.cartItems=document.querySelectorAll(".cart_item"),this.checkAll=document.querySelector(".checkall"),this.selectedCount=document.querySelector(".selected_count"),this.totalPrice=document.querySelector(".total_price"),this.cartContainer=document.querySelector(".cart"),this.inManagementMode=!1,this.bindEvents(),this.updatePrice()},bindEvents(){this.eventListeners=[];const t=(e,n,i)=>{e.addEventListener(n,i),this.eventListeners.push({element:e,event:n,handler:i})};t(this.headerCheckbox,"click",()=>this.toggleMode()),t(this.checkAll,"change",()=>this.toggleCheckAll()),document.querySelectorAll(".checkbox_input").forEach(e=>{t(e,"change",()=>this.updatePrice())}),document.querySelectorAll(".quantity_input").forEach(e=>{t(e,"input",n=>this.QuantityInput(n,e.closest(".cart_item")))}),document.querySelectorAll(".delete_button").forEach(e=>{t(e,"click",n=>{const i=n.target.closest(".cart_item");this.removeCartItem(i)})})},destroy(){this.eventListeners.forEach(({element:t,event:e,handler:n})=>{t.removeEventListener(e,n)}),this.eventListeners=[],this.headerCheckbox&&(this.headerCheckbox.textContent=""),this.checkAll&&(this.checkAll.checked=!1),this.inManagementMode=!1,this.headerCheckbox=null,this.cartItems=null,this.checkAll=null,this.selectedCount=null,this.totalPrice=null,this.cartContainer=null,document.querySelectorAll(".cart_item").forEach(t=>{this.restoreQuantityForm(t)})},toggleMode(){this.inManagementMode=!this.inManagementMode,this.headerCheckbox.textContent=this.inManagementMode?"退出管理":"管理",this.cartItems.forEach(t=>{this.inManagementMode?this.showButton(t):this.hideButton(t)}),this.updatePrice()},showButton(t){[t.querySelector(".decrement"),t.querySelector(".increment"),t.querySelector(".quantity_input")].forEach(i=>i&&(i.style.display="none"));const n=t.querySelector(".delete_button")||this.DeleteButton(t);n.style.display="block"},hideButton(t){const e=t.querySelector(".delete_button");e&&(e.style.display="none"),[t.querySelector(".decrement"),t.querySelector(".increment"),t.querySelector(".quantity_input")].forEach(i=>i&&(i.style.display="flex"))},DeleteButton(t){const e=document.createElement("button");return e.classList.add("delete_button"),e.textContent="删除",e.onclick=()=>this.removeCartItem(t),t.querySelector(".quantity_form").appendChild(e),e},removeCartItem(t){const e=t.querySelector(".item_image img"),n=e?e.getAttribute("data-image"):null;if(!n){console.error("Image source not found or data-image attribute is missing.");return}console.log("Removing item with image:",n),c.removePromotion(n),t.remove(),this.updatePrice(),this.checkCartEmpty()},checkCartEmpty(){if(this.cartItems=document.querySelectorAll(".cart_item"),this.cartItems.length===0){const t=document.createElement("div");t.classList.add("default_image_container");const e=document.createElement("img");e.src="./assets/cart.png",e.alt="无促销信息",e.style.width="100%",e.style.maxWidth="40%",e.style.margin="auto",e.style.display="block";const n=document.createElement("div");n.classList.add("nulldiv"),n.textContent="购物车为空",t.appendChild(e),t.appendChild(n),this.cartContainer&&this.cartContainer.appendChild(t)}},QuantityInput(t,e){const n=t.target,i=parseInt(n.value);!isNaN(i)&&i>0&&this.updatePrice(),n.addEventListener("blur",()=>{const a=parseInt(n.value);isNaN(a)||a<=0?confirm("您输入的数量为0或无效，是否删除该商品？")?this.removeCartItem(e):(n.value=1,this.updatePrice()):a===1?this.updatePrice():this.updatePrice()})},changeQuantity(t,e){const n=t.querySelector(".quantity_input");let i=parseInt(n.value)+e;i<=0&&(i=1),n.value=i,this.updatePrice()},updatePrice(){let t=0,e=0;this.cartItems=document.querySelectorAll(".cart_item"),this.cartItems.forEach(n=>{var a;if(n.querySelector(".checkbox_input").checked){t++;const o=parseFloat(n.querySelector(".item_price").textContent.replace("¥","").trim()),r=parseInt(((a=n.querySelector(".quantity_input"))==null?void 0:a.value)??1);e+=o*r}}),this.selectedCount.textContent=`已选 ${t} 件商品`,this.totalPrice.textContent=`总价格: ${e.toFixed(2)} 元`},toggleCheckAll(){const t=this.checkAll.checked;this.cartItems.forEach(e=>{const n=e.querySelector(".checkbox_input");n.checked=t}),this.updatePrice()}};async function p(){l.init(),u.init()}async function y(){l.destroy&&l.destroy(),u.destroy&&u.destroy()}d.InitFunction("ShoppingCart",p);d.DestroyFunction("ShoppingCart",y);export{c as R,d as r};
//# sourceMappingURL=ShoppingCart-B9K3qvnT.js.map
