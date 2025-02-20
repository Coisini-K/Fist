const Reception = {
    productData: null, // 商品详情页
    promotionData: [], // 购物车

    // 初始化购物车
    init: function () {
        console.log("Initializing cart...");
        const storedPromotion = localStorage.getItem('promotionData');
        if (storedPromotion) {
            try {
                this.promotionData = JSON.parse(storedPromotion);
                console.log("Loaded promotion data from localStorage:", this.promotionData);
            } catch (e) {
                console.error("Error parsing promotion data from localStorage:", e);
                this.promotionData = [];
            }
        } else {
            console.log("No promotion data found in localStorage.");
        }
    },

    // 接收存储商品详情页数据
    storeProductData: function (data) {
        this.productData = data;
        localStorage.setItem('productData', JSON.stringify(data));
        console.log("Stored product data to localStorage:", data);
    },

    // 提取商品详情页数据
    getProductData: function () {
        if (this.productData) {
            return this.productData;
        } else {
            const storedData = localStorage.getItem('productData');
            if (storedData) {
                this.productData = JSON.parse(storedData);
                console.log("Retrieved product data from localStorage:", this.productData);
                return this.productData;
            }
            console.log("No product data available.");
            return null;
        }
    },

    // 添加或更新购物车中的商品信息
    storePromotionData: function (product) {
        console.log("Storing promotion data for product:", product);
        const existingIndex = this.promotionData.findIndex(item => item.image === product.image);

        if (existingIndex !== -1) {
            console.log(`Updating quantity for existing product with image ${product.image}`);
            this.promotionData[existingIndex].quantity += parseInt(product.quantity) || 1;
        } else {
            console.log(`Adding new product with image ${product.image} to cart`);
            product.quantity = parseInt(product.quantity) || 1;
            this.promotionData.push(product);
        }

        localStorage.setItem('promotionData', JSON.stringify(this.promotionData));
        console.log("Updated promotion data in localStorage:", this.promotionData);
    },

    // 提取购物车的商品信息
    getPromotionData: function () {
        return this.promotionData;
    },

    // 删除购物车商品(使用image定位去找image相同的商品并且删除)
    removePromotion: function (image) {
        console.log(`Removing promotion with image ${image}`);
        this.promotionData = this.promotionData.filter(item => item.image !== image);
        localStorage.setItem('promotionData', JSON.stringify(this.promotionData));
        console.log("Updated promotion data after removal:", this.promotionData);
        return this.promotionData; // 返回更新后的促销数据，方便链式调用或其他操作
    },

    // 更新购物车中指定商品的数量
    updateQuantity: function (image, quantity) {
        console.log(`Updating promotion quantity for image ${image} to ${quantity}`);
        try {
            const existingIndex = this.promotionData.findIndex(item => item.image === image);

            if (existingIndex !== -1) {
                console.log("Found existing item, updating quantity.");
                this.promotionData[existingIndex].quantity = Math.max(quantity, 1); // 确保数量至少为1

                localStorage.setItem('promotionData', JSON.stringify(this.promotionData));
                console.log("Successfully updated localStorage.");
            } else {
                console.warn("No matching item found for image", image);
            }
        } catch (error) {
            console.error("An error occurred while updating promotion quantity:", error);
        }
    },

    // 把添加购物车数据进行统一分类(把image相同的归为一个商品，并且修改quantity值)
    aggregate: function () {
        console.log("Aggregating promotion data...");
        const promotionMap = new Map();

        this.promotionData.forEach(promotion => {
            const key = promotion.image; // 使用商品的图片URL作为键值
            if (promotionMap.has(key)) {
                const existingPromotion = promotionMap.get(key);
                existingPromotion.quantity += parseInt(promotion.quantity) || 1; // 确保有默认值
            } else {
                promotion.quantity = parseInt(promotion.quantity) || 1; // 初始化数量，默认为1
                promotionMap.set(key, { ...promotion }); // 使用对象拷贝避免引用问题
            }
        });

        // 将映射转换回数组并返回，不直接修改 promotionData 或 localStorage
        const aggregatedData = Array.from(promotionMap.values());
        console.log("Aggregated promotion data:", aggregatedData);
        return aggregatedData;
    },
};

// 立即调用初始化购物车方法
Reception.init();

export default Reception;