document.addEventListener("DOMContentLoaded",function(){const d=document.getElementById("loginForm"),e=document.getElementById("errorMessage"),t=document.querySelector(".back"),n=document.querySelector(".account button");d.addEventListener("submit",function(c){c.preventDefault();const o=document.getElementById("username").value.trim(),r=document.getElementById("password").value.trim();if(o===""||r===""){e.textContent="用户名和密码不能为空";return}else localStorage.setItem("username",o),alert("登录成功！"),e.textContent="",window.location.href="./index.html"}),t&&t.addEventListener("click",function(){window.history.back()}),n&&n.addEventListener("click",function(){window.location.href="./registered.html"})});
//# sourceMappingURL=loginJs-B66JNrjQ-BP0dcAWF-BLffJ1Y5.js.map
