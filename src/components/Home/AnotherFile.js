// utils/AnotherFile.js
// 轮播图左边文字


import sum from '../../constant/Categories.js';

const AnotherFile = {
    detailDivs: [],  // 将 detailDivs 提升到对象属性
    timer: [],      // 将 timer 提升到对象属性
    isHover: false, // 将 isHover 提升到对象属性
    isHovering: false, // 将 isHovering 提升到对象属性
    item: null,     // 将 item 提升到对象属性

    init: function () {
        const container = document.querySelector('.commodity');
        this.item = document.querySelector('.commodity_item'); // 初始化 item 属性

        if (!container || !this.item) {
            console.error('Element with class "commodity" or "commodity_item" not found.');
        } else {
            // 清空之前的 detailDivs 和 timer
            this.detailDivs = [];
            this.timer = [];

            // 遍历 categories 数组并创建DOM元素
            for (let i = 0; i < sum.categories.length; i++) {
                const category = sum.categories[i];

                // 创建一个新的div元素
                const categoryDiv = document.createElement('div');

                // 设置新div的类名
                categoryDiv.className = 'category';
                categoryDiv.dataset.index = i; // 添加 data-index 属性

                // 遍历类别名称数组并创建span元素
                const categoryNameArray = category.name;
                for (let j = 0; j < categoryNameArray.length; j++) {
                    const span = document.createElement('span');
                    span.textContent = categoryNameArray[j].trim(); // 去除首尾空格
                    categoryDiv.appendChild(span);

                    // 在每个span之间添加一个空格
                    if (j < categoryNameArray.length - 1) {
                        categoryDiv.appendChild(document.createTextNode(' / '));
                    }
                }
                container.appendChild(categoryDiv);

                // 创建一个大的div来包含类别名称和项目列表
                const detailDiv = document.createElement('div');
                detailDiv.className = 'detail';
                detailDiv.style.display = 'none'; // 默认隐藏
                this.detailDivs.push(detailDiv); // 存储详细信息div

                // 获取对应类别的数据
                const categoryData = this.CategoryData(categoryNameArray[0]);
                // 遍历类别名称数组，为每个类别名称创建对应的详细信息
                if (categoryData && categoryData.length > 0) {
                    for (let j = 0; j < categoryData.length; j++) {
                        const subCategory = categoryData[j];

                        // 创建一个p元素来显示子类别名称
                        const nameP = document.createElement('p');
                        nameP.textContent = subCategory.name;
                        detailDiv.appendChild(nameP);

                        // 创建一个div元素来显示子类别项目
                        const itemsDiv = document.createElement('div');
                        itemsDiv.className = 'items';

                        // 遍历子类别项目并创建span元素
                        for (let k = 0; k < subCategory.items.length; k++) {
                            const itemSpan = document.createElement('span');
                            itemSpan.textContent = subCategory.items[k];
                            itemsDiv.appendChild(itemSpan);

                            // 在每个span之间添加一个空格
                            if (k < subCategory.items.length - 1) {
                                itemsDiv.appendChild(document.createTextNode(' / '));
                            }
                        }

                        // 将子类别项目div添加到大的div中
                        detailDiv.appendChild(itemsDiv);
                    }
                }

                // 将大的div添加到页面上的容器中
                this.item.appendChild(detailDiv);
            }

            // 添加鼠标悬停事件处理程序
            container.addEventListener('mouseover', this.MouseOver.bind(this), true);
            container.addEventListener('mouseout', this.MouseOut.bind(this), true);
            this.item.addEventListener('mouseover', this.ItemMouseOver.bind(this), true);
            this.item.addEventListener('mouseout', this.ItemMouseOut.bind(this), true);
        }
    },

    MouseOver(event) {
        if (event.target.classList.contains('category') || event.target.closest('.category')) {
            const categoryDiv = event.target.closest('.category');
            const index = categoryDiv.dataset.index;
            if (index !== undefined) {
                this.isHover = true;
                this.detailDivs[index].style.display = 'block';
                if (this.timer.length > 0) {
                    for (let i = 0; i < this.timer.length; i++) {
                        if (i != index && this.timer[i]) {
                            this.hoverState(i);
                        }
                    }
                }
                this.item.style.display = 'block';
            }
        }
    },

    MouseOut(event) {
        if (event.target.classList.contains('category') || event.target.closest('.category')) {
            const categoryDiv = event.target.closest('.category');
            const index = categoryDiv.dataset.index;
            if (index !== undefined) {
                this.isHover = false;

                this.timer[index] = setInterval(() => {
                    if (!this.isHover && !this.isHovering) {
                        this.hoverState(index);
                    }
                }, 500);
            }
        }
    },

    ItemMouseOver() {
        this.isHovering = true;
    },

    ItemMouseOut() {
        this.isHovering = false;
    },

    destroy: function () {
        const container = document.querySelector('.commodity');
        if (container && this.item) {
            // 移除事件监听器
            container.removeEventListener('mouseover', this.MouseOver, true);
            container.removeEventListener('mouseout', this.MouseOut, true);
            this.item.removeEventListener('mouseover', this.ItemMouseOver, true);
            this.item.removeEventListener('mouseout', this.ItemMouseOut, true);

            // 清除所有定时器
            this.timer.forEach((timer, index) => {
                if (timer) {
                    clearInterval(timer);
                    this.timer[index] = null;
                }
            });

            // 隐藏所有的 detailDiv 并从 DOM 中移除
            this.detailDivs.forEach((detailDiv, index) => {
                detailDiv.style.display = 'none';
                this.item.removeChild(detailDiv);
                this.detailDivs[index] = null;
            });

            // 重置对象属性
            this.detailDivs = [];
            this.timer = [];
            this.isHover = false;
            this.isHovering = false;
            this.item = null;
        }
    },

    hoverState: function (index) {
        this.detailDivs[index].style.display = 'none';
        clearInterval(this.timer[index]);
        this.timer[index] = null;

        if (this.item) {
            this.item.style.display = 'none';
        }
    },

    CategoryData: function (categoryName) {
        switch (categoryName) {
            case '家用电器':
                return sum.Electrical;
            case '手机':
                return sum.Digital;
            case '电脑':
                return sum.Electron;
            case '家居':
                return sum.Furniture;
            case '男装':
                return sum.Cloth;
            case '美妆':
                return sum.Make;
            case '女鞋':
                return sum.Ladies;
            case '男鞋':
                return sum.Men;
            case '房产':
                return sum.Property;
            case '母婴':
                return sum.Moth;
            case '食品':
                return sum.Foods;
            default:
                return [];
        }
    }
};

export default AnotherFile;
