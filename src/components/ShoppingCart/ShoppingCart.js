import registry from '../registry.js';
import Addition from './Addition.js';
import Cart from './Cart.js';

import  '@/style/ShoppingCart/ShoppingCart.css';

// import Reception from '../../stores/reception.js';


async function initHome() {
    // console.log('yes');
    Addition.init();
    Cart.init();
    // Reception.init();
    // 立即调用初始化购物车方法

}

async function destroyHome() {
    Addition.destroy && Addition.destroy();
    Cart.destroy && Cart.destroy();
}

// 注册初始化和销毁函数
registry.InitFunction('ShoppingCart', initHome);
registry.DestroyFunction('ShoppingCart', destroyHome);



