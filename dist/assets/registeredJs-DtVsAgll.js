document.addEventListener("DOMContentLoaded",function(){const t=document.getElementById("registrationForm"),e=document.getElementById("message"),n=document.querySelector(".back"),o=document.querySelector(".account button");n&&n.addEventListener("click",function(){window.history.back()}),o&&o.addEventListener("click",function(){window.location.href="./login.html"}),t&&t.addEventListener("submit",s);function s(i){const c=document.getElementById("username").value.trim(),d=document.getElementById("password").value,a=document.getElementById("confirm_password").value;d!==a?(i.preventDefault(),e.textContent="密码和确认密码不匹配"):c===""?(i.preventDefault(),e.textContent="用户名不能为空"):(localStorage.setItem("username",c),e.textContent="",window.location.href="./index.html")}});
