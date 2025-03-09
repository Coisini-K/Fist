import  '@/style/login.css';

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');
    const backButton = document.querySelector('.back');
    const registerButton = document.querySelector('.account button');

    // 登录表单提交事件监听器
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // 获取输入值
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        // 基本的表单验证
        if (username === '' || password === '') {
            errorMessage.textContent = '用户名和密码不能为空';
            return;
        } else {
            // 存储用户名到 localStorage 或 sessionStorage
            localStorage.setItem('username', username); // 使用 localStorage 以保持数据持久化
            alert('登录成功！');
            // 清除错误消息
            errorMessage.textContent = '';
            // 重定向到主页或其他页面
            window.location.href = './index.html'; // 主页是 index.html
        }
    });

    // 返回按钮点击事件监听器
    if (backButton) {
        backButton.addEventListener('click', function () {
            window.history.back(); // 返回上一页
        });
    }

    // 注册按钮点击事件监听器
    if (registerButton) {
        registerButton.addEventListener('click', function () {
            window.location.href = './registered.html'; // 跳转到注册页面
        });
    }
});