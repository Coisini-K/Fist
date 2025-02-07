//倒计时
import DateUtils from '../../utils/date.js'; // 调用时间函数

const Countdown = {
    timerId: null, // 用于存储 setTimeout 的返回值

    init: function () {
        this.day = document.querySelector('.day');
        this.first = document.querySelector('.first');
        this.second = document.querySelector('.second');
        this.end = document.querySelector('.end');
        this.container = document.querySelector('.container h2'); // 获取轮播右侧登录的问候

        if (!this.day || !this.first || !this.second || !this.end || !this.container) {
            console.error('One or more elements not found.');
            return;
        }

        this.CountDown();
    },

    CountDown: function () {
        const countDown = () => {
            const nowTime = DateUtils.getCurrentTime(); // 使用从 date.js 导入的 getCurrentTime 方法
            const overTime = new Date(this.tim()); // 获取输入时间
            let times = (overTime - nowTime) / 1000; // 除1000是因为要去除获取的毫秒数部分

            if (times <= 0) {
                this.day.innerText = '00天';
                this.first.innerText = '00时';
                this.second.innerText = '00分';
                this.end.innerText = '00秒';
                this.destroy(); // 当倒计时结束时调用销毁方法
                return;
            }

            this.day.innerText = this.add(parseInt(times / 60 / 60 / 24)) + '天';
            this.first.innerText = this.add(parseInt(times / 60 / 60 % 24)) + '时';
            this.second.innerText = this.add(parseInt(times / 60 % 60)) + '分';
            this.end.innerText = this.add(parseInt(times % 60)) + '秒';

            const hours = nowTime.getHours(); // 获取当前时间的小时数

            if (hours >= 0 && hours <= 6) {
                this.container.innerText = 'Hi! 凌晨好';
            } else if (hours > 6 && hours <= 12) {
                this.container.innerText = 'Hi! 上午好';
            } else if (hours > 12 && hours <= 18) {
                this.container.innerText = 'Hi! 下午好';
            } else if (hours > 18 && hours < 24) {
                this.container.innerText = 'Hi! 晚上好';
            }
        };

        countDown();
        this.timerId = setTimeout(() => {
            this.CountDown();
        }, 1000);
    },

    tim: function () {
        return '2025-5-8 15:00:00'; // 输入结束时间
    },

    add: function (num) {
        if (num < 10) {
            num = '0' + num;
        }
        return num;
    },

    destroy: function () {
        // 清除定时器
        if (this.timerId) {
            clearTimeout(this.timerId);
            this.timerId = null;
        }

        // 重置对象属性
        this.day = null;
        this.first = null;
        this.second = null;
        this.end = null;
        this.container = null;

        // 可以选择在这里执行更多清理操作，例如移除事件监听器等（如果有）
    }
};

export default Countdown;
