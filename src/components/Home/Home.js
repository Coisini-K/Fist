// src/components/Home.js
import registry from '../registry.js';
import AnotherFile from './AnotherFile.js';
import CarouselModule from './CarouselModule.js';
import Countdown from './Countdown.js';
import Navbar from './Navbar.js';
import Recommend from './Recommend.js';
import Scroll from './Scroll.js';
import main_top from './main_top.js';
import Toggle from './Toggle.js';

// import  '@/components/login.js';
// import  '@/style/login.css';
import  '@/style/Home/Home.css';

async function initHome() {
    // console.log('home init start');
    AnotherFile.init();
    CarouselModule.init();
    Countdown.init();
    Recommend.init();
    Scroll.init();
    Navbar.init();
    main_top.init();
    Toggle.init();
    // console.log('home init end');
    // console.log('');
}

async function destroyHome() {
    // console.log('home destroy start');
    AnotherFile.destroy && AnotherFile.destroy();
    CarouselModule.destroy && CarouselModule.destroy();
    Countdown.destroy && Countdown.destroy();
    Recommend.destroy && Recommend.destroy();
    Scroll.destroy && Scroll.destroy();
    Navbar.destroy && Navbar.destroy();
    main_top.destroy && main_top.destroy();
    Toggle.destroy && Toggle.destroy();
    // console.log('home destroy end');
    // console.log('');
}

// 注册初始化和销毁函数
registry.InitFunction('Home', initHome);
registry.DestroyFunction('Home', destroyHome);

//导出js模板
// const Countdown = {

//     init: function () {
//     },

//     destroy: function () {
//     }
// };

// export default Countdown;