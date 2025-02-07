//轮播图右下角文字滚动
import Recommends from '../../constant/Recommends.js';

const Scroll = {
    init: function () {
        this.loginTextDiv = document.querySelector('.login_text');
        this.loopCount = 10;
        this.scrollInterval = null;
        this.scrollPosition = 0;

        // 初始填充
        this.lateTexts();
        // 开始滚动
        this.startScrolling();

        // 添加事件监听器
        this.bindEventListeners();
    },

    bindEventListeners: function () {
        this.loginTextDiv.addEventListener('mouseover', this.stopScrolling.bind(this));
        this.loginTextDiv.addEventListener('mouseout', this.startScrolling.bind(this));

        // 动态绑定到文本项上的事件
        this.textItems = this.loginTextDiv.querySelectorAll('.text-item');
        this.textItems.forEach(item => {
            item.addEventListener('mouseover', this.MouseOver.bind(this, item));
            item.addEventListener('mouseout', this.MouseOut.bind(this, item));
        });

        this.loginTextDiv.addEventListener('wheel', this.MouseWheel.bind(this));
    },

     unbindEvent: function () {
        this.loginTextDiv.removeEventListener('mouseover', this.stopScrolling);
        this.loginTextDiv.removeEventListener('mouseout', this.startScrolling);

        if (this.textItems) {
            this.textItems.forEach(item => {
                item.removeEventListener('mouseover', this.MouseOver);
                item.removeEventListener('mouseout', this.MouseOut);
            });
        }

        this.loginTextDiv.removeEventListener('wheel', this.MouseWheel);
    },

    lateTexts: function () {
        this.loginTextDiv.innerHTML = ''; // 清空现有内容
        for (let i = 0; i < this.loopCount; i++) {
            Recommends.texts.forEach(text => {
                const div = document.createElement('div');
                div.textContent = text;
                div.className = 'text-item'; // 给每个文本项添加类名
                this.loginTextDiv.appendChild(div);
            });
        }
    },

    startScrolling: function () {
        if (!this.scrollInterval) {
            this.scrollInterval = setInterval(() => {
                this.scrollPosition += 1; // 每次滚动1像素
                this.loginTextDiv.scrollTop = this.scrollPosition;

                // 如果滚动到底部，则重置滚动位置
                if (this.scrollPosition >= this.loginTextDiv.scrollHeight - this.loginTextDiv.clientHeight) {
                    this.scrollPosition = 0;
                    this.lateTexts(); // 可选：重新填充内容以保持无限滚动
                }
            }, 40); // 每50毫秒滚动一次，可以根据需要调整时间
        }
    },

    stopScrolling: function () {
        if (this.scrollInterval) {
            clearInterval(this.scrollInterval);
            this.scrollInterval = null;
        }
    },

    MouseOver: function (target) {
        target.style.cursor = 'pointer'; // 变换鼠标形状为手指指针
        target.style.color = 'red'; // 字体颜色变为红色
    },

    MouseOut: function (target) {
        target.style.cursor = ''; // 恢复默认鼠标形状
        target.style.color = ''; // 恢复默认字体颜色
    },

    MouseWheel: function (event) {
        event.preventDefault();
        if (event.deltaY > 0) {
            // 向下滚动
            this.loginTextDiv.scrollTop += 20; // 每次滚动20像素
        } else {
            // 向上滚动
            this.loginTextDiv.scrollTop -= 20; // 每次滚动20像素
        }
        this.scrollPosition = this.loginTextDiv.scrollTop; // 更新当前滚动位置
    },

    destroy: function () {
        this. unbindEvent();
        this.stopScrolling();

        // 清除登录文本框中的所有内容
        this.loginTextDiv.innerHTML = '';

        // 清理对象属性
        this.loginTextDiv = null;
        this.textItems = null;
    }
};

export default Scroll;
