/* 商品详情页js Detail.html */

import Reception from '../stores/reception.js';

// 初始化图片库
const initializeGallery = (gallery, mainImageSrc) => {
    const galleryImages = gallery.querySelectorAll('.mockup_img');
    const usedIndices = new Set(); // 记录已使用的索引
    const totalImages = 10; // 图片总数

    galleryImages.forEach((img, index) => {
        let randomIndex;
        if (index === 0) {
            img.src = mainImageSrc;
            const mainImageIndex = parseInt(mainImageSrc.split('/').pop().split('.')[0]);
            // console.log(mainImageIndex);
            usedIndices.add(mainImageIndex); // 记录第一张图片的索引
            // console.log(usedIndices);

        } else {
            do {
                randomIndex = generateRandomNumber(1, totalImages);
            } while (usedIndices.has(randomIndex));

            usedIndices.add(randomIndex);
            img.src = `./assets/images/Recommend/${randomIndex}.jpg`;
            // console.log(img.src);
        }

        img.onclick = () => {
            selectImage(index);
            highlightCurrentImage(index);
        };
    });

    // 初始高亮第一张图片
    highlightCurrentImage(0);
};

// 选择图片
const selectImage = (index) => {
    const mainImage = document.querySelector('.mockup_img');
    const galleryImages = document.querySelectorAll('.td_box .mockup_img');
    mainImage.src = galleryImages[index].src;
    // currentIndex = index;
};

// 高亮当前选中的图片
const highlightCurrentImage = (index) => {
    const galleryImages = document.querySelectorAll('.td_box .mockup_img');
    galleryImages.forEach((img, idx) => {
        if (idx === index) {
            img.classList.add('highlighted'); // 添加高亮样式
        } else {
            img.classList.remove('highlighted'); // 移除高亮样式
        }
    });
};

document.addEventListener('DOMContentLoaded', function () {


    // 添加监听器以处理“加入购物车”按钮点击
    const addToCartButton = document.querySelector('.addcart');
    if (addToCartButton) {
        addToCartButton.addEventListener('click', addToCart);
    }


    const productData = Reception.getProductData();
    if (!productData) {
        console.error('No product data found.');
        return;
    }

    // 填充产品图片
    const productImage = document.querySelector('.mockup_img');
    if (productImage) {
        productImage.src = '../' + productData.image;
    }

    // 填充产品标题
    const productTitle = document.querySelector('.head_span');
    if (productTitle) {
        productTitle.textContent = productData.text;
    }

    // 填充产品价格
    const productPrice = document.querySelector('.tr_two.Price');
    if (productPrice) {
        productPrice.textContent = productData.price;
    }

    // 填充火图标和随机数
    const fireElement = document.querySelector('.tr_two.fire');
    if (fireElement) {
        const fireCount = 5; // 可以根据需要调整这个值
        populateFireIconsAndRandomNumbers(fireElement, fireCount);
    }

    // 设置 tr_there 的随机数
    const trThere = document.querySelector('.tr_there');
    if (trThere) {
        const maxStock = generateRandomNumber(100, 1000); // 调整范围以适应需求
        trThere.textContent = `${maxStock} 件可售`;
        trThere.dataset.maxStock = maxStock; // 存储最大库存数
    }

    // 初始化图片库
    const gallery = document.querySelector('.td_box');
    if (gallery) {
        initializeGallery(gallery, productImage.src);
    }

    // 初始化数量输入框
    const inputNumber = document.querySelector('.i_txt');
    const defaultQuantity = productData.defaultQuantity || 1; // 获取默认数量，如果没有则默认为1
    inputNumber.value = defaultQuantity;

    if (inputNumber) {
        inputNumber.addEventListener('input', function () {
            const value = inputNumber.value.trim();
            const maxStock = parseInt(trThere.dataset.maxStock);

            if (isNaN(value) || value <= 0 || value > maxStock) {
                inputNumber.value = 1;
            } else {
                updateTotalPrice(inputNumber.value);
            }
        });
    }

    // 初始化加减按钮
    const decrementButton = document.querySelector('.decrement');
    const incrementButton = document.querySelector('.increment');
    if (decrementButton && incrementButton) {
        decrementButton.addEventListener('click', function () {
            const value = parseInt(inputNumber.value);
            if (value > 1) {
                inputNumber.value = value - 1;
                updateTotalPrice(inputNumber.value);
            }
        });

        incrementButton.addEventListener('click', function () {
            const value = parseInt(inputNumber.value);
            const maxStock = parseInt(trThere.dataset.maxStock);
            if (value < maxStock) {
                inputNumber.value = value + 1;
                updateTotalPrice(inputNumber.value);
            }
        });
    }

    // 初始化图片切换按钮
    const leftButton = document.querySelector('.left_button');
    const rightButton = document.querySelector('.right_button');
    let currentIndex = 0;

    if (leftButton && rightButton) {
        leftButton.addEventListener('click', () => switchImage(-1));
        rightButton.addEventListener('click', () => switchImage(1));
    }

    // 初始化总价显示
    const totalPriceElement = document.querySelector('.there input');
    if (totalPriceElement) {
        totalPriceElement.value = formatPrice(calculateTotalPrice(defaultQuantity, productData.price));
    }

    function switchImage(direction) {
        const galleryImages = document.querySelectorAll('.td_box .mockup_img');
        const totalImages = galleryImages.length;
        currentIndex = (currentIndex + direction + totalImages) % totalImages;
        const mainImage = document.querySelector('.mockup_img');
        mainImage.src = galleryImages[currentIndex].src;
        highlightCurrentImage(currentIndex);
    }

    function updateTotalPrice(quantity) {
        const totalPrice = calculateTotalPrice(quantity, productData.price);
        if (totalPriceElement) {
            totalPriceElement.value = formatPrice(totalPrice);
        }
    }

    function calculateTotalPrice(quantity, price) {
        const numericPrice = parseFloat(price.replace('¥', '')); // 去掉价格符号
        return quantity * numericPrice;
    }

    function formatPrice(price) {
        return `¥ ${price.toFixed(2)}`; // 保留两位小数并添加价格符号
    }
});

// 填充火图标和随机数到现有的 span 元素中
const populateFireIconsAndRandomNumbers = (element, count) => {
    const fireIconSrc = './assets/images/Detail/fire-icon.png';
    const spans = element.querySelectorAll('span');

    // 生成火图标并插入到最前面
    for (let i = 0; i < count; i++) {
        const imgElement = document.createElement('img');
        imgElement.src = fireIconSrc;
        imgElement.alt = 'Fire Icon';
        element.insertBefore(imgElement, element.firstChild);
        if (i < count - 1) {
            element.insertBefore(document.createTextNode(' '), element.firstChild); // 添加空格分隔
        }
    }

    // 生成随机数并插入到 span 元素中
    for (let j = 0;  j < spans.length; j++) {
        const randomNumber = generateRandomNumber(100, 1000); // 调整范围以适应不同 span
        spans[j].textContent = `${ randomNumber}`;
    }
};

// 生成指定范围内的随机数
const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};



function addToCart(event) {
    event.preventDefault();

    // 获取产品详情数据
    const productData = Reception.getProductData();
    if (!productData) {
        console.error('No product data found.');
        return;
    }

    // 获取用户输入的数量
    const inputNumber = document.querySelector('.i_txt');
    const quantity = parseInt(inputNumber.value, 10);

    if (isNaN(quantity) || quantity <= 0) {
        console.error('Invalid quantity.');
        return;
    }

    // 将数量添加到 productData 对象中
    const updatedProductData = {
        ...productData,
        quantity: quantity
    };

    // 存储更新后的产品数据
    Reception.storePromotionData(updatedProductData);

    // console.log('商品已成功添加到购物车！', updatedProductData);
}
