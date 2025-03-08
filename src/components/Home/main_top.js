//头部
const main_top = {
    init: function () {
        this.searchBarClickEnabled = false; // 控制 .search_bar 点击事件的标志变量
        this.expandedBoxVisible = false; // 控制下拉框是否可见的标志变量

        const header = document.getElementById('header');
        const logo = document.querySelector('.logo');
        const search_bar = document.querySelector('.search_bar');
        const search_button = search_bar ? search_bar.querySelector('.search_button') : null;
        const triggerDistance = 200; // 当用户向下滚动超过200px时触发固定效果

        if (!header || !logo || !search_bar) {
            console.error('Required elements not found in the DOM.');
            return;
        }

        if (!this.searchBarClickEnabled) {
            search_bar.addEventListener('click', this.BarClick.bind(this));
            this.searchBarClickEnabled = true;
        }

        window.addEventListener('scroll', this.handleScroll.bind(this));

        this.header = header;
        this.logo = logo;
        this.search_bar = search_bar;
        this.search_button = search_button;
        this.triggerDistance = triggerDistance;
    },

    handleScroll: function () {
        const isScrolled = window.scrollY >= this.triggerDistance;

        if (isScrolled) {
            if (this.header) {
                this.header.classList.add('fixed-header');
                this.header.style.height = '100px';
                this.header.style.width = '100vw';
                this.header.style.display = 'flex';
            }

            if (this.logo) {
                this.logo.style.height = '100px';
                this.logo.style.width = '150px';
            }

            if (this.search_bar) {
                this.search_bar.style.height = '40px';
                this.search_bar.style.width = '800px';

                if (this.searchBarClickEnabled) {
                    this.search_bar.removeEventListener('click', this.BarClick);
                    this.searchBarClickEnabled = false;
                }
            }

            this.ExpandedBox();
        } else {
            if (this.header) {
                this.header.classList.remove('fixed-header');
                this.header.style.height = '150px';
                this.header.style.width = '1600px';
            }

            if (this.logo) {
                this.logo.style.height = '100%';
                this.logo.style.width = '200px';
            }

            if (this.search_bar) {
                this.search_bar.style.height = '50px';
                this.search_bar.style.width = '900px';

                if (!this.searchBarClickEnabled) {
                    this.search_bar.addEventListener('click', this.BarClick.bind(this));
                    this.searchBarClickEnabled = true;
                }
            }
        }
    },

    BarClick: function (event) {
        console.log('BarClick triggered'); // 调试输出
        event.stopPropagation(); // 阻止事件冒泡

        const expandedBox = this.search_bar.querySelector('.expanded_box');
        const search_bars = this.search_bar.querySelector('.search_bars');

        if (expandedBox.innerHTML === '') {
            expandedBox.innerHTML = `
                <div>订单管理</div>
                <div>商品管理</div>
                <div>营销管理</div>
                <div>店铺管理</div>
                <div>营销管理</div>
                <div>店铺管理</div>
            `;
        }

        if (event.target.closest('.search_button')) {
            return;
        }

        if (search_bars) {
            search_bars.style.height = "50px";
        }

        if (expandedBox) {
            expandedBox.style.display = 'flex';
        }

        this.search_bar.style.border = '2px solid #50f286';
        this.search_bar.style.height = 'auto';
        this.search_bar.style.top = '50px';

        document.addEventListener('click', this.ClickOutside.bind(this));
        this.search_bar.addEventListener('mouseleave', this.MouseLeave.bind(this));
        if (expandedBox) {
            expandedBox.addEventListener('mouseleave', this.MouseLeave.bind(this));
        }

        this.expandedBoxVisible = true;
    },

    ClickOutside: function (event) {
        console.log('ClickOutside triggered'); // 调试输出
        if (this.expandedBoxVisible && !this.search_bar.contains(event.target) && !this.search_bar.querySelector('.expanded_box').contains(event.target)) {
            this.ExpandedBox();
        }
    },

    MouseLeave: function (event) {
        if (this.expandedBoxVisible && !this.search_bar.contains(event.relatedTarget) && !this.search_bar.querySelector('.expanded_box').contains(event.relatedTarget)) {
            this.ExpandedBox();
        }
    },

    ExpandedBox: function () {
        const expandedBox = this.search_bar ? this.search_bar.querySelector('.expanded_box') : null;
        if (expandedBox) {
            expandedBox.style.display = 'none';
            this.search_bar.style.height = '50px';
            this.search_bar.style.top = '0px';
            document.removeEventListener('click', this.ClickOutside);
            this.search_bar.removeEventListener('mouseleave', this.MouseLeave);
            expandedBox.removeEventListener('mouseleave', this.MouseLeave);
            this.expandedBoxVisible = false;
        }
    },

   
    destroy: function () {
        // 移除所有事件监听器
        if (this.searchBarClickEnabled) {
            this.search_bar.removeEventListener('click', this.BarClick);
        }
        window.removeEventListener('scroll', this.handleScroll);

        // 移除搜索按钮的点击和悬停事件监听器
        if (this.search_button) {
            this.search_button.removeEventListener('click', this.ExpandedBox);
            this.search_button.removeEventListener('mouseenter', this.ExpandedBox);
        }

        // 移除登录和注册按钮的点击事件监听器
        const loginButton = document.querySelector('.login');
        const registerButton = document.querySelector('.registered');

        if (loginButton) {
            loginButton.removeEventListener('click', this.navigateToLogin);
        }

        if (registerButton) {
            registerButton.removeEventListener('click', this.navigateToRegister);
        }

        // 清理对象属性
        this.header = null;
        this.logo = null;
        this.search_bar = null;
        this.search_button = null;
        this.triggerDistance = null;

        // 重置标志变量
        this.searchBarClickEnabled = false;
        this.expandedBoxVisible = false;
    }
};

export default main_top;