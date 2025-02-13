document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // 获取输入值
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        // 基本的表单验证
        if (username == '' || password == '') {
            errorMessage.textContent = '用户名和密码不能为空';
            return;
        }

        // 模拟登录逻辑（这里可以用实际的后端API）
        else  {
            alert('登录成功！');
            // 清除错误消息
            errorMessage.textContent = '';
            // 重定向到主页或其他页面
            window.location.href = 'index.html'; // 主页是 index.html
        } 
    });
});