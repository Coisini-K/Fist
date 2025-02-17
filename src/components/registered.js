document.addEventListener('DOMContentLoaded', function () {
    const registrationForm = document.getElementById('registrationForm');
    const messageDiv = document.getElementById('message');
    const backButton = document.querySelector('.back');
    const loginButton = document.querySelector('.account button');

    // 绑定返回按钮点击事件
    if (backButton) {
        backButton.addEventListener('click', function () {
            window.history.back(); // 返回上一页
        });
    }

    // 绑定登录按钮点击事件
    if (loginButton) {
        loginButton.addEventListener('click', function () {
            window.location.href = './login.html'; // 跳转到登录页面
        });
    }

    // 绑定表单提交事件
    if (registrationForm) {
        registrationForm.addEventListener('submit', handleRegistrationSubmit);
    }

    function handleRegistrationSubmit(event) {
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm_password').value;

        if (password !== confirmPassword) {
            event.preventDefault(); // 阻止表单提交
            messageDiv.textContent = '密码和确认密码不匹配';
        } else if (username === '') {
            event.preventDefault(); // 阻止表单提交
            messageDiv.textContent = '用户名不能为空';
        } else {
            // 存储用户名到 localStorage
            localStorage.setItem('username', username);

            // 清除错误信息
            messageDiv.textContent = '';

            // 注册成功后跳转到主页
            window.location.href = 'index.html';
        }
    }
});