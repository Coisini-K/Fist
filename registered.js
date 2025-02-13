document.getElementById('registrationForm').addEventListener('submit', function(event) {
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirm_password').value;
    var messageDiv = document.getElementById('message');
    
    if (password !== confirmPassword) {
        event.preventDefault(); // 阻止表单提交
        messageDiv.textContent = '密码和确认密码不匹配';
        return false;
    } else {
        messageDiv.textContent = ''; // 清除错误信息
    }
});