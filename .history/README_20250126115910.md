# 问题及解决方法

## 导出模块的方法

### 使用 export default 关键字

    导入时不使用花括号 {}，并且可以使用任意名称

示例：

1.

    导入：// Recommends.js
    const images = [];
    const texts = [];
    export default { images, texts };

    导出：// Recommend.js
    import use from '../constant/Recommends.js';
    console.log(use.images); // 访问 images
    console.log(use.texts); // 访问 texts
2.

    const count={
        const images = [];
        const texts = [];
        }
    export default count ;
    import use from '../constant/Recommends.js';//导出名字可以不一样

### 使用 export 关键字

  导入时需要使用花括号 {}，并且必须使用导出时的名称

示例：

    导入：// Recommends.js
    const images = [];
    const texts = [];
    export { images, texts };

    导出：// Recommend.js
    // Recommend.js
    import { images, texts } from '../constant/Recommends.js';
    console.log(images); // 访问 images
    console.log(texts); // 访问 texts

## 引入和使用本地字体

导入字体：

    @font-face {
        font-family: 'MyCustomFont';
        src: url('../Fonts/STLITI.TTF') format   ('truetype');
    }

使用字体：

    font-family: 'MyCustomFont',sans-serif;
