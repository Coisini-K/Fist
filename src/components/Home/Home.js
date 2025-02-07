// src/components/Home.js
import registry from '../registry.js';
import AnotherFile from './AnotherFile.js';
import CarouselModule from './CarouselModule.js';
import Countdown from './Countdown.js';
import Navbar from './Navbar.js';
import Recommend from './Recommend.js';
import Scroll from './Scroll.js';
import main_top from './main_top.js';

async function initHome() {
    // console.log('home init start');
    AnotherFile.init();
    CarouselModule.init();
    Countdown.init();
    Recommend.init();
    Scroll.init();
    Navbar.init();
    main_top.init();
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
    // console.log('home destroy end');
    // console.log('');
}

// 注册初始化和销毁函数
registry.InitFunction('Home', initHome);
registry.DestroyFunction('Home', destroyHome);
