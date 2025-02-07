import Reception from '../../stores/reception.js';

const Addition = {
    initialized: false,
    cartContainer: null, // 保存购物车容器的引用
    init() {
        if (this.initialized) return;
        this.initialized = true;

        // 绑定方法以确保当它们被调用时 'this' 上下文是正确的
        this.updateDynamic = this.updateDynamic.bind(this);

        this.cartContainer = document.querySelector('.cart'); // 获取购物车容器
        this.loadPromotions();
    },

    destroy() {
        // 清空加载的 HTML
        if (this.cartContainer) {
            this.cartContainer.innerHTML = ''; // 移除所有子元素
            delete this.cartContainer.hasEventListener; // 移除标记
            this.cartContainer.removeEventListener('click', this.handleClickEvent.bind(this)); // 移除事件监听器
        }

        // 将变量恢复默认值
        this.initialized = false;
        this.cartContainer = null;

        // 如果有其他需要清理的状态或资源，也可以在这里处理
    },
    handleClickEvent(event) {
        if (event.target.closest('.decrement') || event.target.closest('.increment')) {
            const delta = event.target.closest('.increment') ? 1 : -1;
            const cartItemDiv = event.target.closest('.cart_item');
            this.updateDynamic(cartItemDiv, delta); // 使用正确绑定的方法
        }
    },
    loadPromotions() {
        const aggregatedPromotions = Reception.aggregate();

        if (!aggregatedPromotions || !aggregatedPromotions.length) {
            console.warn('未找到促销信息或促销列表为空。');
            return;
        }

        // 清空当前购物车DOM内容
        if (this.cartContainer) {
            this.cartContainer.innerHTML = '';
        }

        // 根据归类后的数据生成DOM元素
        aggregatedPromotions.forEach(promotion => {
            const cartItemDiv = this.createCartItem(promotion);
            if (this.cartContainer) {
                this.cartContainer.appendChild(cartItemDiv);
            }
        });

        // 设置事件委托以处理所有增量/减量按钮的点击事件
        if (this.cartContainer && !this.cartContainer.hasEventListener) {
            this.cartContainer.addEventListener('click', this.handleClickEvent.bind(this));
            this.cartContainer.hasEventListener = true; // 标记已绑定事件监听器
        }
    },


    createCartItem(promotion) {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart_item');
        cartItemDiv.dataset.image = promotion.image; // 确保 data-image 属性存在

        // 创建并填充 item_checkbox
        const checkboxDiv = document.createElement('div');
        checkboxDiv.classList.add('item_checkbox');
        const checkboxInput = document.createElement('input');
        checkboxInput.type = 'checkbox';
        checkboxInput.classList.add('checkbox_input');
        checkboxDiv.appendChild(checkboxInput);
        cartItemDiv.appendChild(checkboxDiv);

        // 创建并填充 item_image
        const imageDiv = document.createElement('div');
        imageDiv.classList.add('item_image');
        const imgElement = document.createElement('img');
        imgElement.src = promotion.image;
        imgElement.alt = "商品图片";
        imgElement.setAttribute('data-image', promotion.image); // 确保 data-image 属性存在
        imageDiv.appendChild(imgElement);
        cartItemDiv.appendChild(imageDiv);

        // 创建并填充 item_message
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('item_message');
        messageDiv.textContent = promotion.text || '无描述可用'; // 防止 undefined
        cartItemDiv.appendChild(messageDiv);

        // 创建并填充 item_price
        const priceDiv = document.createElement('div');
        priceDiv.classList.add('item_price');
        priceDiv.textContent = `${promotion.price}`;
        cartItemDiv.appendChild(priceDiv);

        // 创建并填充 quantity_form
        const quantityFormDiv = this.QuantityForm(promotion.quantity);
        cartItemDiv.appendChild(quantityFormDiv);

        return cartItemDiv;
    },

    QuantityForm(quantity) {
        const quantityFormDiv = document.createElement('div');
        quantityFormDiv.classList.add('quantity_form');

        // 创建并填充 decrement link
        const decrementLink = document.createElement('a');
        decrementLink.href = 'javascript:';
        decrementLink.classList.add('decrement');
        decrementLink.textContent = '-';

        // 创建并填充 quantity input
        const quantityInput = document.createElement('input');
        quantityInput.type = 'text';
        quantityInput.classList.add('quantity_input');
        // console.log(quantity);
        // console.log(quantityInput.value)
        quantityInput.value = quantity; // 设置商品数量

        // 创建并填充 increment link
        const incrementLink = document.createElement('a');
        incrementLink.href = 'javascript:';
        incrementLink.classList.add('increment');
        incrementLink.textContent = '+';

        quantityFormDiv.appendChild(decrementLink);
        quantityFormDiv.appendChild(quantityInput);
        quantityFormDiv.appendChild(incrementLink);

        return quantityFormDiv;
    },

    updateDynamic(cartItemDiv, delta) {
        // console.group('updateDynamic');
        // console.log('cartItemDiv=', cartItemDiv);
        // console.log('delta=', delta);

        const quantityInput = cartItemDiv.querySelector('.quantity_input');
        if (!quantityInput) {
            console.error("Quantity input not found in cart item.");
            console.groupEnd();
            return;
        }

        // 获取原始值前先禁用输入框以防止用户干扰
        quantityInput.disabled = true;

        let currentQuantity = parseInt(quantityInput.value, 10) || 0; // 确保解析失败时默认为0
        // console.log('currentQuantity before update=', currentQuantity);

        // currentQuantity += delta;
        // console.log('currentQuantity after update=', currentQuantity);

        if (currentQuantity >= 0) { // 确保数量不小于0
            quantityInput.value = currentQuantity;
            const productImage = cartItemDiv.dataset.image;

            try {
                Reception.updateQuantity(productImage, currentQuantity); // 更新商品数量到存储
                // console.log('Successfully updated promotion quantity for image:', productImage);
            } catch (error) {
                console.error('更新商品数量失败:', error);
            }
        } else {
            console.warn('数量不能低于零。');
        }
    },
};
// Addition.init();
export default Addition;
