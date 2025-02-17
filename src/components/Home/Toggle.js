import DateUtils from '../../utils/date.js'; // 调用时间函数

const Toggle = {
    init: function () {
        // 初始化时添加事件监听器
        const loginButton = document.querySelector('.login');
        const logButton = document.querySelector('.login_button button');
        const registerButton = document.querySelector('.container_box_one');
        const registered = document.querySelector('.registered');


        if (loginButton||logButton) {
            loginButton.addEventListener('click', this.navigateToLogin.bind(this));
            logButton.addEventListener('click', this.navigateToLogin.bind(this));
        }

        if (registerButton||registered) {
            registerButton.addEventListener('click', this.navigateToRegister.bind(this));
            registered.addEventListener('click', this.navigateToRegister.bind(this));
        }

        // 检查是否在目标页面（例如 index.html）
        if (window.location.pathname === '/index.html' || window.location.pathname === '/index') {
            this.updateWelcomeMessage();
        }
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
        const containerBox = document.querySelector('.container_box');
        const containerBoxOne = document.querySelector('.container_box_one');

        if (username) {
            // 设置 .container h2 的文本内容为欢迎信息
            if (containerH2) {
                containerH2.textContent = `用户${username}`;
            }

            // 动态生成退出按钮并插入到 container_box 中
            if (containerBox && containerBoxOne) {
                containerBoxOne.textContent = '切换账号';

                // 创建退出按钮
                const containerSpan = document.createElement('span');
                containerSpan.textContent = '/';

                // 创建退出按钮
                const containerBoxTwo = document.createElement('button');
                containerBoxTwo.className = 'container_box_two';
                containerBoxTwo.textContent = '退出';

                // 添加点击事件监听器
                containerBoxTwo.addEventListener('click', this.handleLogout.bind(this));

                // 插入到 container_box 中
                containerBox.appendChild(containerSpan);
                containerBox.appendChild(containerBoxTwo);
            }
        } else {
            // console.error('用户名未找到，请重新登录');
            const nowTime = DateUtils.getCurrentTime();
            const hours = nowTime.getHours(); // 获取当前时间的小时数

            // 设置 .container h2 的文本内容为问候语
            if (containerH2) {
                if (hours >= 0 && hours <= 6) {
                    containerH2.textContent = 'Hi! 凌晨好';
                } else if (hours > 6 && hours <= 12) {
                    containerH2.textContent = 'Hi! 上午好';
                } else if (hours > 12 && hours <= 18) {
                    containerH2.textContent = 'Hi! 下午好';
                } else if (hours > 18 && hours < 24) {
                    containerH2.textContent = 'Hi! 晚上好';
                }
            }

            // 确保 container_box_one 存在并设置其文本内容为注册
            if (containerBoxOne) {
                containerBoxOne.textContent = '注册';

                // 如果已经存在退出按钮，则移除它
                const containerBoxTwo = document.querySelector('.container_box_two');
                const containerSpan = document.querySelector('.container_box span');
                if (containerBoxTwo&&containerSpan) {
                    containerBoxTwo.remove();
                    containerSpan.remove();
                }
            }
        }
    }
};

export default Toggle;