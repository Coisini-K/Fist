/* 头部文字滑动导航栏 */

const Navbar = {
    init: function () {
        this.headerNavbar = document.querySelector('.scroll_container');
        this.firstBox = this.headerNavbar.querySelector('.box.box_one'); // 特别指定 .box_one
        this.multiFunctionButton = document.querySelector('.end-marker');
        this.dropdownContent = document.createElement('div');
        this.dropdownContent.className = 'dropdown-content';
        this.isDown = false;
        this.startX;
        this.scrollLeft;

        this.Exploitation = document.querySelector('.Exploitation');
        this.app = document.querySelector('.app');
        this.tabs = document.querySelector('.tabs');
        this.content = document.querySelector('.content-area');

        this.Listeners();
        this.DropdownContent();
        this.States();
    },

    Listeners: function () {
        this.headerNavbar.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.headerNavbar.addEventListener('mouseleave', this.onMouseLeave.bind(this));
        this.headerNavbar.addEventListener('mouseup', this.onMouseUp.bind(this));
        this.headerNavbar.addEventListener('mousemove', this.onMouseMove.bind(this));

        this.headerNavbar.addEventListener('touchstart', this.onTouchStart.bind(this));
        this.headerNavbar.addEventListener('touchmove', this.onTouchMove.bind(this));

        this.headerNavbar.addEventListener('scroll', this.onScroll.bind(this));

        this.headerNavbar.addEventListener('click', this.onClick.bind(this));

        this.multiFunctionButton.addEventListener('click', this.FunctionButton.bind(this));

        this.multiFunctionButton.addEventListener('mouseleave', this.ButtonMouse.bind(this));

        this.dropdownContent.addEventListener('mouseleave', this.ContentMouse.bind(this));
    },

    unListeners: function () {
        this.headerNavbar.removeEventListener('mousedown', this.onMouseDown);
        this.headerNavbar.removeEventListener('mouseleave', this.onMouseLeave);
        this.headerNavbar.removeEventListener('mouseup', this.onMouseUp);
        this.headerNavbar.removeEventListener('mousemove', this.onMouseMove);

        this.headerNavbar.removeEventListener('touchstart', this.onTouchStart);
        this.headerNavbar.removeEventListener('touchmove', this.onTouchMove);

        this.headerNavbar.removeEventListener('scroll', this.onScroll);

        this.headerNavbar.removeEventListener('click', this.onClick);

        this.multiFunctionButton.removeEventListener('click', this.FunctionButton);

        this.multiFunctionButton.removeEventListener('mouseleave', this.ButtonMouse);


        this.dropdownContent.removeEventListener('mouseleave', this.ContentMouse);
    },

    onMouseDown: function (e) {
        this.isDown = true;
        this.startX = e.pageX - this.headerNavbar.offsetLeft;
        this.scrollLeft = this.headerNavbar.scrollLeft;
    },

    onMouseLeave: function () {
        this.isDown = false;
    },

    onMouseUp: function () {
        this.isDown = false;
    },

    onMouseMove: function (e) {
        if (!this.isDown) return;
        e.preventDefault();
        const x = e.pageX - this.headerNavbar.offsetLeft;
        const walk = (x - this.startX); // 滑动速度
        this.headerNavbar.scrollLeft = this.scrollLeft - walk;
    },

    onTouchStart: function (e) {
        this.touchStartX = e.touches[0].clientX;
        this.touchStartY = e.touches[0].clientY;
    },

    onTouchMove: function (e) {
        if (Math.abs(e.touches[0].clientY - this.touchStartY) < 50) { // 防止垂直滑动干扰
            const x = e.touches[0].clientX;
            const walk = (x - this.touchStartX); // 滑动速度
            this.headerNavbar.scrollLeft += walk;
        }
    },

    onScroll: function () {
        if (this.headerNavbar.scrollLeft > 70 && this.firstBox === this.headerNavbar.firstElementChild) {
            this.headerNavbar.insertBefore(this.firstBox, this.headerNavbar.firstChild);
            this.firstBox.style.position = 'absolute';
            this.firstBox.style.left = `${this.headerNavbar.scrollLeft}px`;
            this.firstBox.style.background = '#fff';
        } else {
            this.firstBox.style.position = 'relative';
            this.firstBox.style.left = 0;
            this.firstBox.style.background = '';
        }
    },

    onClick: function (e) {
        const target = e.target.closest('.box'); // 使用 closest 方法找到最近的 .box 元素
        if (target) {
            document.querySelectorAll('.box').forEach(box => {
                box.style.color = '';
                box.style.height = '32px';
                box.style.borderBottom = '';
            });

            if (target === this.firstBox) {
                target.style.color = 'red';
                target.style.height = '30px';
                target.style.borderBottom = '2px solid red';
                this.Exploitation.style.display = 'none';
                this.app.style.display = 'flex';
                this.tabs.style.display = 'block';
                this.content.style.display = 'block';
            } else {
                target.style.color = 'red';
                target.style.height = '30px';
                target.style.borderBottom = '2px solid red';
                this.Exploitation.style.display = 'block';
                this.app.style.display = 'none';
                this.tabs.style.display = 'none';
                this.content.style.display = 'none';
            }
        }
    },

    FunctionButton: function () {
        if (this.dropdownContent.style.display === 'flex') {
            this.dropdownContent.style.display = 'none';
        } else {
            this.dropdownContent.style.display = 'flex';
        }
    },

    ButtonMouse: function () {
        if (!this.dropdownContent.matches(':hover')) {
            setTimeout(() => {
                if (!this.dropdownContent.matches(':hover')) {
                    this.dropdownContent.style.display = 'none';
                }
            }, 100); // 延迟一段时间以防止快速移动鼠标导致误操作
        }
    },

    ContentMouse: function () {
        if (!this.multiFunctionButton.matches(':hover')) {
            this.dropdownContent.style.display = 'none';
        }
    },

    DropdownContent: function () {
        const boxes = document.querySelectorAll('.box');
        boxes.forEach(box => {
            const dropdownItem = document.createElement('div');
            dropdownItem.textContent = box.textContent;
            this.dropdownContent.appendChild(dropdownItem);
        });
        document.body.appendChild(this.dropdownContent);
    },

    States: function () {
        if (this.firstBox) {
            this.firstBox.style.color = 'red';
            this.firstBox.style.borderBottom = '2px solid red';
            this.Exploitation.style.display = 'none';
            this.app.style.display = 'flex';
            this.tabs.style.display = 'block';
            this.content.style.display = 'block';
        }
    },

    destroy: function () {
        this.unListeners();

        // 移除下拉框内容
        if (this.dropdownContent && this.dropdownContent.parentNode) {
            this.dropdownContent.parentNode.removeChild(this.dropdownContent);
        }

        // 清理对象属性
        this.headerNavbar = null;
        this.firstBox = null;
        this.multiFunctionButton = null;
        this.dropdownContent = null;
        this.Exploitation = null;
        this.app = null;
        this.tabs = null;
        this.content = null;
    }
};

export default Navbar;
