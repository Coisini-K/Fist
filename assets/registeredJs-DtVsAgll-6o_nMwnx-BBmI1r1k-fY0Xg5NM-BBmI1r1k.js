document.addEventListener("DOMContentLoaded",function(){const t=document.getElementById("registrationForm"),e=document.getElementById("message"),n=document.querySelector(".back"),o=document.querySelector(".account button");n&&n.addEventListener("click",function(){window.history.back()}),o&&o.addEventListener("click",function(){window.location.href="./login.html"}),t&&t.addEventListener("submit",u);function u(c){const d=document.getElementById("username").value.trim(),a=document.getElementById("password").value,m=document.getElementById("confirm_password").value;a!==m?(c.preventDefault(),e.textContent="密码和确认密码不匹配"):d===""?(c.preventDefault(),e.textContent="用户名不能为空"):(localStorage.setItem("username",d),e.textContent="",window.location.href="./index.html")}});
//# sourceMappingURL=registeredJs-DtVsAgll-6o_nMwnx-BBmI1r1k-fY0Xg5NM-BBmI1r1k.js.map
