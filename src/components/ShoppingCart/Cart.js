import Reception from '../../stores/reception.js';

const Cart = {
    init() {
        // 初始化DOM元素引用
        this.headerCheckbox = document.querySelector('.header_checkbox');
        this.cartItems = document.querySelectorAll('.cart_item');
        this.checkAll = document.querySelector('.checkall');
        this.selectedCount = document.querySelector('.selected_count');
        this.totalPrice = document.querySelector('.total_price');
        this.cartContainer = document.querySelector('.cart'); // 添加对购物车容器的引用

        this.inManagementMode = false; // 管理模式状态

        this.bindEvents(); // 绑定事件监听器
        this.updatePrice(); // 初始化选择的商品总数和总价
    },

    bindEvents() {
        // 存储绑定的事件监听器，以便稍后移除
        this.eventListeners = [];

        const bindListener = (element, event, handler) => {
            element.addEventListener(event, handler);
            this.eventListeners.push({ element, event, handler });
        };

        // 切换管理/退出管理模式
        bindListener(this.headerCheckbox, 'click', () => this.toggleMode());
        // 全选/取消全选复选框
        bindListener(this.checkAll, 'change', () => this.toggleCheckAll());

        // 监听单个商品的复选框变化
        document.querySelectorAll('.checkbox_input').forEach(input => {
            bindListener(input, 'change', () => this.updatePrice());
        });

        // 监听数量输入框的变化
        document.querySelectorAll('.quantity_input').forEach(input => {
            bindListener(input, 'input', (event) => this.QuantityInput(event, input.closest('.cart_item')));
        });

        // 监听增减链接的点击
        // document.querySelectorAll('.increment, .decrement').forEach(link => {
        //     bindListener(link, 'click', (event) => {
        //         const item = event.target.closest('.cart_item');
        //         const delta = event.target.classList.contains('increment') ? 1 : -1;
        //         this.changeQuantity(item, delta);
        //     });
        // });

        // 绑定删除按钮点击事件
        document.querySelectorAll('.delete_button').forEach(button => {
            bindListener(button, 'click', (event) => {
                const item = event.target.closest('.cart_item');
                this.removeCartItem(item);
            });
        });
    },

    destroy() {
        // 移除所有事件监听器
        this.eventListeners.forEach(({ element, event, handler }) => {
            element.removeEventListener(event, handler);
        });
        this.eventListeners = [];

        // 清空或重置 DOM 元素
        if (this.headerCheckbox) this.headerCheckbox.textContent = ''; // 恢复文本内容
        if (this.checkAll) this.checkAll.checked = false; // 取消全选

        // 重置内部状态变量
        this.inManagementMode = false;
        this.headerCheckbox = null;
        this.cartItems = null;
        this.checkAll = null;
        this.selectedCount = null;
        this.totalPrice = null;
        this.cartContainer = null; // 重置购物车容器引用

        // 还原购物车项到初始状态（如果有需要）
        document.querySelectorAll('.cart_item').forEach(item => {
            this.restoreQuantityForm(item); // 恢复数量表单
        });
    },

    toggleMode() {
        // 切换管理模式
        this.inManagementMode = !this.inManagementMode;
        this.headerCheckbox.textContent = this.inManagementMode ? '退出管理' : '管理';

        this.cartItems.forEach(item => {
            if (this.inManagementMode) {
                this.showButton(item);
            } else {
                this.hideButton(item);
            }
        });
        this.updatePrice();
    },

    showButton(item) {
        // 显示删除按钮并隐藏数量控件
        // const quantityForm = item.querySelector('.quantity_form');
        const elementsToHide = [item.querySelector('.decrement'), item.querySelector('.increment'), item.querySelector('.quantity_input')];
        elementsToHide.forEach(el => el && (el.style.display = 'none'));

        const deleteButton = item.querySelector('.delete_button') || this.DeleteButton(item);
        deleteButton.style.display = 'block';
    },

    hideButton(item) {
        // 隐藏删除按钮并显示数量控件
        // const quantityForm = item.querySelector('.quantity_form');
        const deleteButton = item.querySelector('.delete_button');
        if (deleteButton) {
            deleteButton.style.display = 'none';
        }

        const elementsToShow = [item.querySelector('.decrement'), item.querySelector('.increment'), item.querySelector('.quantity_input')];
        elementsToShow.forEach(el => el && (el.style.display = 'flex'));
    },

    DeleteButton(item) {
        // 创建删除按钮
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete_button');
        deleteButton.textContent = '删除';
        deleteButton.onclick = () => this.removeCartItem(item);

        const quantityForm = item.querySelector('.quantity_form');
        quantityForm.appendChild(deleteButton);

        return deleteButton;
    },

    removeCartItem(item) {
        // 根据商品图片的 data-image 属性移除商品
        const image = item.querySelector('.item_image img');
        const imageSrc = image ? image.getAttribute('data-image') : null;

        if (!imageSrc) {
            console.error("Image source not found or data-image attribute is missing.");
            return;
        }

        console.log("Removing item with image:", imageSrc);

        // 使用 Reception 模块移除对应的商品数据
        Reception.removePromotion(imageSrc);

        // 从DOM中移除项目
        item.remove();

        // 更新选择数量和总价格
        this.updatePrice();

        // 检查购物车是否为空，并在为空时插入默认图片和提示信息
        this.checkCartEmpty();
    },

    checkCartEmpty() {
        // 获取购物车中的所有商品项
        this.cartItems = document.querySelectorAll('.cart_item');

        // 如果购物车为空，则插入默认图片和提示信息
        if (this.cartItems.length === 0) {
            const defaultImageDiv = document.createElement('div');
            defaultImageDiv.classList.add('default_image_container');

            const imgElement = document.createElement('img');
            imgElement.src = './assets/cart.png'; // 替换为实际的默认图片路径
            imgElement.alt = "无促销信息";
            imgElement.style.width = '100%';
            imgElement.style.maxWidth = '40%'; // 可根据需要调整宽度
            imgElement.style.margin = 'auto';
            imgElement.style.display = 'block';

            const nullDiv = document.createElement('div');
            nullDiv.classList.add('nulldiv');
            nullDiv.textContent = "购物车为空";

            defaultImageDiv.appendChild(imgElement);
            defaultImageDiv.appendChild(nullDiv);

            if (this.cartContainer) {
                this.cartContainer.appendChild(defaultImageDiv);
            }
        }
    },

    QuantityInput(event, item) {
        const inputElement = event.target;
        const value = parseInt(inputElement.value);

        // 实时更新总价
        if (!isNaN(value) && value > 0) {
            this.updatePrice();
        }

        // 在失去焦点时进行最终验证
        inputElement.addEventListener('blur', () => {
            const finalValue = parseInt(inputElement.value);
            if (isNaN(finalValue) || finalValue <= 0) {
                const confirmDelete = confirm("您输入的数量为0或无效，是否删除该商品？");
                if (confirmDelete) {
                    this.removeCartItem(item);
                } else {
                    inputElement.value = 1; // 默认值设为1
                    this.updatePrice(); // 更新价格
                }
            } else if (finalValue === 1) {
                // 如果输入的是1，则直接更新价格
                this.updatePrice();
            } else {
                // 其他有效值，更新价格
                this.updatePrice();
            }
        });
    },

    changeQuantity(item, delta) {
        // 改变商品数量
        const quantityInput = item.querySelector('.quantity_input');
        let newValue = parseInt(quantityInput.value) + delta;
        if (newValue <= 0) newValue = 1;
        quantityInput.value = newValue;
        this.updatePrice();
    },

    updatePrice() {
        // 更新已选择的商品总数和总价
        let count = 0;
        let priceSum = 0;

        this.cartItems = document.querySelectorAll('.cart_item'); // 更新 cartItems 集合
        this.cartItems.forEach(item => {
            const checkboxInput = item.querySelector('.checkbox_input');
            if (checkboxInput.checked) {
                count++;
                const itemPrice = parseFloat(item.querySelector('.item_price').textContent.replace('¥', '').trim());
                const quantity = parseInt(item.querySelector('.quantity_input')?.value ?? 1);
                priceSum += itemPrice * quantity;
            }
        });

        this.selectedCount.textContent = `已选 ${count} 件商品`;
        this.totalPrice.textContent = `总价格: ${priceSum.toFixed(2)} 元`;
    },

    toggleCheckAll() {
        // 全选或取消全选所有商品
        const checked = this.checkAll.checked;
        this.cartItems.forEach(item => {
            const checkboxInput = item.querySelector('.checkbox_input');
            checkboxInput.checked = checked;
        });
        this.updatePrice();
    },
};

// Cart.init();
export default Cart;