// src/components/CarouselModule.js
//轮播图
const CarouselModule = {
    init: function () {
        this.img = document.querySelector('.slide_box img');
        this.next = document.querySelector('.next');
        this.prev = document.querySelector('.prev');
        this.slide = document.querySelector('.slide');
        this.lis = document.querySelectorAll('.banner li');
        this.imgArr = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg'];
        this.count = 0;

        // 定义函数，用来切换图片的路径
        this.cutImg = () => {
            if (this.img) {
                this.img.src = './assets/images/Carousel/' + this.imgArr[this.count];
            }
            for (let i = 0; i < this.lis.length; i++) {
                this.lis[i].className = '';
            }
            if (this.lis[this.count]) {
                this.lis[this.count].className = 'active';
            }
        };

        // 设置定时器，每隔3秒切换图片
        this.timer = setInterval(() => {
            this.count++;
            if (this.count > this.imgArr.length - 1) {
                this.count = 0;
            }
            this.cutImg();
        }, 3000);

        // 点击下一张
        if (this.next) {
            this.next.onclick = () => {
                this.count++;
                if (this.count > this.imgArr.length - 1) {
                    this.count = 0;
                }
                this.cutImg();
            };
        }

        // 点击上一张
        if (this.prev) {
            this.prev.onclick = () => {
                this.count--;
                if (this.count < 0) {
                    this.count = this.imgArr.length - 1;
                }
                this.cutImg();
            };
        }

        // 鼠标滑入div，将定时切换图片给干掉
        if (this.slide) {
            this.slide.onmouseover = () => {
                clearInterval(this.timer);
            };
        }

        // 鼠标滑出div，定时器跑起来
        if (this.slide) {
            this.slide.onmouseout = () => {
                this.timer = setInterval(() => {
                    this.count++;
                    if (this.count > this.imgArr.length - 1) {
                        this.count = 0;
                    }
                    this.cutImg();
                }, 3000);
            };
        }

        // 给li绑定点击事件
        if (this.lis) {
            this.lis.forEach((li, index) => {
                li.onclick = () => {
                    this.count = index;
                    this.cutImg();
                };
            });
        }
    },

    destroy: function () {
        // 清除定时器
        if (this.timer) {
            clearInterval(this.timer);
        }

        // 移除事件监听器
        if (this.next) {
            this.next.onclick = null;
        }
        if (this.prev) {
            this.prev.onclick = null;
        }
        if (this.slide) {
            this.slide.onmouseover = null;
            this.slide.onmouseout = null;
        }
        if (this.lis) {
            this.lis.forEach(li => li.onclick = null);
        }
    }
};

export default CarouselModule;
