// src/components/index.js
import routes from "../router/router.js";
import registry from "./registry.js";

//打包的时候导入下面的组件
import loadResource from '@/utils/loadResource';


import "@/stores/reception.js";
import "@/components/Home/Home.js";
import "@/components/Mine/Mine.js";
import "@/components/Serve/Serve.js";
import "@/components/ShoppingCart/ShoppingCart.js";

const contentContainer = document.getElementById("content");
const bottomNavbar = document.getElementById("bottom-navbar");

// 存储当前加载的 CSS 和 JS 文件
let currentStylesheets = [];
let currentScripts = [];
let currentRoute = null; // 记录当前页面的路由

// 获取所有可能的 CSS 文件路径
const cssGlob = import.meta.glob("/dist/assets/*.css");
// 获取所有可能的 JS 文件路径

const jsGlob = import.meta.glob("/dist/assets/*.js");

// 加载 CSS 文件
async function loadCSS(href) {
  return new Promise((resolve, reject) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.onload = resolve;
    link.onerror = reject;
    document.head.appendChild(link);
    currentStylesheets.push(link);
  });
}

// 卸载 CSS 文件
function unloadCSS(href) {
  currentStylesheets = currentStylesheets.filter((sheet) => {
    if (sheet.href === href) {
      sheet.remove();
      return false;
    }
    return true;
  });
}

// 动态加载 JS 文件
async function loadJS(src) {
  try {
    const module = await jsGlob[src]();
    console.log(`Loaded JS file: ${src}`, module);
  } catch (error) {
    console.error(`Failed to load JS file "${src}":`, error);
  }
}

// 卸载 JS 文件
function unloadJS(src) {
  currentScripts = currentScripts.filter((script) => {
    if (script.src === src) {
      script.remove();
      return false;
    }
    return true;
  });
}

// 加载页面内容
async function loadPage(route) {
  const url = routes[route];
  if (!url) {
    console.error(`Route "${route}" not found.`);
    return;
  }

  // 清除当前内容
  contentContainer.innerHTML = "";

  // 发送 AJAX 请求获取页面内容
  const response = await fetch(url);
  if (!response.ok) {
    console.error(`Failed to load page "${route}": ${response.statusText}`);
    return;
  }

  const html = await response.text();
  contentContainer.innerHTML = html;

  // 获取页面对应的 CSS 和 JS 文件路径
  const cssFiles = getCSSFilesForRoute(route);
  const jsFiles = getJSFilesForRoute(route);

  // 如果有当前页面的路由，卸载旧的 CSS 和 JS 文件并销毁当前页面
  if (currentRoute) {
    const oldCssFiles = getCSSFilesForRoute(currentRoute);
    const oldJsFiles = getJSFilesForRoute(currentRoute);

    oldCssFiles.forEach((cssFile) => unloadCSS(cssFile));
    oldJsFiles.forEach((jsFile) => unloadJS(jsFile));

    await registry.destroyPage(currentRoute);
  }

  // 加载新的 CSS 和 JS 文件
  await Promise.all(cssFiles.map(loadCSS));
  await Promise.all(jsFiles.map(loadJS));

  // 初始化新页面
  await registry.initPage(route);

  // 更新当前页面的路由
  currentRoute = route;
}

//打包前请解开下面的css和js注释（打包请用下面的加载css和js代码）
/**
 * 获取页面对应的 CSS 文件路径并加载
 */
function getCSSFilesForRoute(route) {
  const cssFiles = [];
  for (const path in cssGlob) {
    if (path.includes(`/src/style/${route}/${route}.css`)) {
      cssFiles.push(path);
    }
  }
console.log(cssFiles)
  // 加载所有找到的 CSS 文件
  cssFiles.forEach(loadResource);

  return cssFiles;
}

/**
 * 获取页面对应的 JS 文件路径并加载
 */
function getJSFilesForRoute(route) {
  const jsFiles = [];
  for (const path in jsGlob) {
    if (path.includes(`/src/components/${route}/${route}.js`)) {
      jsFiles.push(path);
    }
  }
  // console.log(jsFiles)

  // 加载所有找到的 JS 文件
  jsFiles.forEach(loadResource);

  return jsFiles;
}

//未打包前运行项目请解开下面的css和js注释（不打包运行项目请用下面的加载css和js代码）
// 获取页面对应的 CSS 文件路径
// function getCSSFilesForRoute(route) {
//   const cssFiles = [];
//   for (const path in cssGlob) {
//     if (path.includes(`/src/style/${route}/${route}.css`)) {
//       cssFiles.push(path);
//     }
//   }
//   return cssFiles;
// }

// // 获取页面对应的 JS 文件路径
// function getJSFilesForRoute(route) {
//   const jsFiles = [];
//   for (const path in jsGlob) {
//     if (path.includes(`/src/components/${route}/${route}.js`)) {
//       jsFiles.push(path);
//     }
//   }
//   return jsFiles;
// }

// 初始化路由
function initRouter() {
  // 默认加载首页
  loadPage("Home");

  // 添加底部导航栏点击事件
  bottomNavbar.addEventListener("click", (event) => {
    const target = event.target.closest(".nav-item");
    if (target && target.dataset.route) {
      const route = target.dataset.route;
      loadPage(route);
    }
  });
}

// 启动路由
initRouter();

document.addEventListener("DOMContentLoaded", function () {
  
  const footContainer = document.getElementById("foot_container");
  const sections = [
    {
      title: "新手指南",
      links: [
        { text: "注册账户", to: "/" },
        { text: "平台功能", to: "/" },
        { text: "在线交易", to: "/" },
        { text: "买家保障", to: "/" },
      ],
    },
    {
      title: "产品服务",
      links: [
        { text: "找供应", to: "/" },
        { text: "找采购", to: "/" },
        { text: "看行情", to: "/" },
        { text: "发布供应", to: "/" },
        { text: "一件代发", to: "/" },
      ],
    },
    {
      title: "合作联系",
      links: [
        { text: "客户服务 800-888-8888", to: "/" },
        { text: "商务洽谈 0123-88888888", to: "/" },
        { text: "媒体合作 0123-88888888", to: "/" },
        { text: "Fist Mall 知识产权综合服务平台", to: "/" },
        { text: "Fist Mall 乡村振兴合作专区", to: "/" },
      ],
    },
    {
      title: "关于我们",
      links: [
        { text: "关于我们", to: "/" },
        { text: "Fist 大事件", to: "/" },
        { text: "服务协议", to: "/" },
        { text: "隐私政策", to: "/" },
        { text: "规则说明", to: "/" },
      ],
    },
  ];

  // 创建并插入每个 section
  sections.forEach((section) => {
    const sectionDiv = document.createElement("div");
    sectionDiv.className = "section";

    const title = document.createElement("h2");
    title.textContent = section.title;
    sectionDiv.appendChild(title);

    const ul = document.createElement("ul"); // 修改为 'ul' 而不是 'navbar_ul'
    section.links.forEach((link) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = link.to;
      a.textContent = link.text;
      li.appendChild(a);
      ul.appendChild(li);
    });

    sectionDiv.appendChild(ul);
    footContainer.appendChild(sectionDiv);
  });

  const backToTopBtn = document.getElementById("top_btn");

  // 创建 return_top 图像元素
  const returnTopImg = document.createElement("img");
  returnTopImg.src = "./assets/return_top.png";
  returnTopImg.className = "return_top";

  // 创建水平线元素
  const hrElement = document.createElement("hr");

  // 创建 return_bottom 图像元素
  const returnBottomImg = document.createElement("img");
  returnBottomImg.src = "./assets/return_bottom.png";
  returnBottomImg.className = "return_bottom";

  // 将创建的元素添加到按钮中
  backToTopBtn.appendChild(returnTopImg);
  backToTopBtn.appendChild(hrElement);
  backToTopBtn.appendChild(returnBottomImg);

  window.addEventListener("scroll", function () {
    if (window.scrollY > 450) {
      // 设置触发显示按钮的滚动距离
      backToTopBtn.classList.remove("hidden");
    } else {
      backToTopBtn.classList.add("hidden");
    }
  });

  // 添加点击事件监听器，点击后平滑滚动到顶部
  returnTopImg.addEventListener("click", function (event) {
    event.stopPropagation(); // 阻止事件冒泡，避免触发父元素的点击事件
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 平滑滚动
    });
  });

  // 添加点击事件监听器，点击后平滑滚动到底部
  returnBottomImg.addEventListener("click", function (event) {
    event.stopPropagation(); // 阻止事件冒泡，避免触发父元素的点击事件
    window.scrollTo({
      top: document.documentElement.scrollHeight, // 获取整个文档的高度
      behavior: "smooth", // 平滑滚动
    });
  });

  // 如果你希望点击整个按钮默认行为是回到顶部，可以保留这个监听器
  backToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 平滑滚动
    });
  });
});
