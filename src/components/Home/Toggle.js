import DateUtils from '../../utils/date.js'; // 调用时间函数

const Toggle = {
    init: function () {
        // 初始化时添加事件监听器
        const loginButton = document.querySelector('.login');
        const logButton = document.querySelector('.login_button button');
        const registerButton = document.querySelector('.container_box_one');
        const registered = document.querySelector('.registered');

        if (loginButton || logButton) {
            loginButton.addEventListener('click', this.navigateToLogin.bind(this));
            logButton.addEventListener('click', this.navigateToLogin.bind(this));
        }

        if (registerButton || registered) {
            registerButton.addEventListener('click', this.navigateToRegister.bind(this));
            registered.addEventListener('click', this.navigateToRegister.bind(this));
        }

        // 立即调用 updateWelcomeMessage 更新欢迎信息
        this.updateWelcomeMessage();
    },

    destroy: function () {
        // 移除所有事件监听器
        const loginButton = document.querySelector('.login');
        const logButton = document.querySelector('.login_button button');
        const registerButton = document.querySelector('.container_box_one');
        const registered = document.querySelector('.registered');

        if (loginButton) {
            loginButton.removeEventListener('click', this.navigateToLogin);
            logButton.removeEventListener('click', this.navigateToLogin);
        }

        if (registerButton) {
            registerButton.removeEventListener('click', this.navigateToRegister);
            registered.removeEventListener('click', this.navigateToRegister);
        }

        // 清理动态生成的按钮事件监听器
        const containerBoxTwo = document.querySelector('.container_box_two');
        if (containerBoxTwo) {
            containerBoxTwo.removeEventListener('click', this.handleLogout.bind(this));
        }
    },

    navigateToLogin: function () {
        window.location.href = './login.html';
    },

    navigateToRegister: function () {
        window.location.href = './registered.html';
    },

    handleLogout: function () {
        localStorage.removeItem('username');
        this.updateWelcomeMessage();
    },

    updateWelcomeMessage: function () {
        const username = localStorage.getItem('username');
        const containerH2 = document.querySelector('.container h2');
        const containerBoxOne = document.querySelector('.container_box_one');

        if (username) {
            this.setGreetingText(containerH2, username);
            this.setupLogoutButton(containerBoxOne);
        } else {
            this.setGreetingText(containerH2);
            this.setupRegisterButton(containerBoxOne);
        }
    },

    setGreetingText: function (element, username) {
        if (!element) return;

        if (username) {
            element.textContent = `用户${username}`;
        } else {
            const nowTime = DateUtils.getCurrentTime();
            const hours = nowTime.getHours();
            let greeting = '';

            if (hours >= 0 && hours < 6) greeting = 'Hi! 凌晨好';
            else if (hours < 12) greeting = 'Hi! 上午好';
            else if (hours < 18) greeting = 'Hi! 下午好';
            else greeting = 'Hi! 晚上好';

            element.textContent = greeting;
        }
    },

    setupLogoutButton: function (containerBoxOne) {
        if (containerBoxOne) {
            containerBoxOne.textContent = '切换账号';

            const containerBox = document.querySelector('.container_box');
            if (containerBox) {
                const containerSpan = document.createElement('span');
                containerSpan.textContent = '/';

                const containerBoxTwo = document.createElement('button');
                containerBoxTwo.className = 'container_box_two';
                containerBoxTwo.textContent = '退出';
                containerBoxTwo.addEventListener('click', this.handleLogout.bind(this));

                containerBox.appendChild(containerSpan);
                containerBox.appendChild(containerBoxTwo);
            }
        }
    },

    setupRegisterButton: function (containerBoxOne) {
        if (containerBoxOne) {
            containerBoxOne.textContent = '注册';

            const containerBox = document.querySelector('.container_box');
            if (containerBox) {
                const containerBoxTwo = document.querySelector('.container_box_two');
                const containerSpan = document.querySelector('.container_box span');
                if (containerBoxTwo && containerSpan) {
                    containerBoxTwo.remove();
                    containerSpan.remove();
                }
            }
        }
    }
};

export default Toggle;