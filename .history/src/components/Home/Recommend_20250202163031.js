//猜你喜欢

import Recommends from '../../constant/Recommends.js';
import Reception from '../../stores/reception.js';

const Recommend = {
    init: function () {
        const tabsList = document.querySelectorAll('.tab');
        const contentItems = document.querySelectorAll('.content-item');
        const images = Recommends.images;
        const texts = Recommends.texts;
        const tabsContent = document.querySelector('.tabs-list');
        const triggerDistance = 495; // 当用户向下滚动超过200px时触发固定效果
        let loadCount = 0; // 加载次数计数器
        const maxLoadCount = 5; // 最大加载次数限制
        let isLoading = false; // 加载状态标志

        // 获取原始宽度和高度
        const originalWidth = tabsContent.offsetWidth;
        const originalHeight = tabsContent.offsetHeight;

        // 创建初始的20条数据数组
        const initialData = [];
        for (let i = 0; i < 20; i++) {
            initialData.push({
                image: images[i % images.length],
                text: texts[i % texts.length],
                price: `¥${(Math.random() * 10000).toFixed(2)}`
            });
        }

        // 滚动事件处理函数
        const scrollHandler = function () {
            const isScrolled = window.scrollY >= triggerDistance;
            if (isScrolled) {
                tabsContent.classList.add('fixed_tabs');
                tabsContent.style.width = `${originalWidth}px`;
                tabsContent.style.height = `${originalHeight}px`;
            } else {
                tabsContent.classList.remove('fixed_tabs');
                tabsContent.style.width = '';
                tabsContent.style.height = '';
            }

            // 判断是否滚动到底部
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 220) {
                const currentContent = Array.from(contentItems).find(item => window.getComputedStyle(item).display !== 'none');
                if (!isLoading && loadCount < maxLoadCount && currentContent) {
                    isLoading = true; // 设置加载状态为真
                    loadCount++;

                    showLoading(currentContent, maxLoadCount); // 显示正在加载
                    setTimeout(() => { // 模拟异步加载数据
                        MorePhotos(currentContent, loadCount * 10 - 10); // 加载更多内容
                        hideLoading(currentContent); // 隐藏正在加载
                        isLoading = false; // 设置加载状态为假
                    }, 2000); // 假设加载需要3秒
                }
            }
        };

        // 绑定滚动事件监听器
        window.addEventListener('scroll', scrollHandler);

        // 显示正在加载
        function showLoading(contentItem, maxLoadCount) {
            const loadingMessage = document.createElement('div');
            loadingMessage.innerText = '正在加载';
            loadingMessage.classList.add('loading-message');
            contentItem.appendChild(loadingMessage);
            let dots = 0;
            const intervalId = setInterval(() => {
                if (dots < 3) {
                    loadingMessage.innerText += '.';
                    dots++;
                } else if (dots <= 4 || dots == 0) {
                    loadingMessage.innerText = '正在加载';
                    dots = 0;
                } else {
                    clearInterval(intervalId);
                }
            }, 300); // 每300毫秒添加一个点
        }

        // 隐藏正在加载
        function hideLoading(contentItem) {
            const loadingMessage = contentItem.querySelector('.loading-message');
            if (loadingMessage) {
                contentItem.removeChild(loadingMessage);
            }
            //添加到底提示
            if (loadCount == 5) {
                setTimeout(() => {
                    let photosContainer = contentItem.querySelector('.photos');
                    // let dibu = document.querySelector('.dibu');
                    const dibu = document.createElement('div');
                    dibu.classList.add('dibu');
                    // contentItems.appendChild(dibu);
                    dibu.innerText = '已经到底啦(❁´◡`❁)'; // 添加文本信息
                    dibu.style.display = 'block';

                    // 确保 currentContent 是正确的 DOM 元素

                    photosContainer.appendChild(dibu);

                }, 0); // 每300毫秒添加一个点
            }
        }

        // 生成一个div和img，把它们添加到最外层div里面
        function showPhoto(data, photosContainer) {
            const photoDiv = createPhotoDiv(data.image, data.text, data.price);
            photosContainer.appendChild(photoDiv);

            // 添加点击事件
            photoDiv.addEventListener('click', () => {
                Reception.storeProductData(data);
                window.location.href = '/view/Detail.html';
            });
        }

        // 创建包含照片和文本的div
        function createPhotoDiv(image, text, price) {
            const photoDiv = document.createElement('div');
            photoDiv.classList.add('photos-container', 'fade-in-slide');
            const img = document.createElement('img');
            img.src = image;
            const textDiv = TextDiv(text);
            const span = document.createElement('span');
            span.textContent = price;
            photoDiv.appendChild(img);
            photoDiv.appendChild(textDiv);
            photoDiv.appendChild(span);
            return photoDiv;
        }

        // 创建包含文本的div
        function TextDiv(text) {
            const textDiv = document.createElement('div');
            textDiv.classList.add('container_box');
            const bool = Math.random();
            if (bool > 0.4) {
                const containerOne = TextElement('container_one', '自营');
                textDiv.appendChild(containerOne);
                const containerTwo = TextElement('container_two', `&nbsp;&nbsp;&nbsp;${text}`);
                textDiv.appendChild(containerTwo);
            } else {
                const containerTwo = TextElement('container_two', `${text}`);
                textDiv.appendChild(containerTwo);
            }
            return textDiv;
        }

        // 创建包含文本的元素
        function TextElement(className, text) {
            const element = document.createElement('div');
            element.classList.add(className);
            element.innerHTML = text;
            return element;
        }

        // 显示初始的20条数据
        function InitialPhotos(contentItem) {
            const photosContainer = PhotosContainer(contentItem);
            initialData.forEach(data => {
                showPhoto(data, photosContainer);
            });
        }

        // 显示更多照片
        function MorePhotos(contentItem, startIndex = 0) {
            const photosContainer = PhotosContainer(contentItem);
            for (let l = startIndex; l < Math.min(startIndex + 10, texts.length * 100); l++) {
                const data = {
                    image: images[l % images.length],
                    text: texts[l % texts.length],
                    price: `¥${(Math.random() * 10000).toFixed(2)}`
                };
                showPhoto(data, photosContainer);
            }

        }

        // 获取或创建照片容器
        function PhotosContainer(contentItem) {
            let photosContainer = contentItem.querySelector('.photos');
            if (!photosContainer) {
                photosContainer = document.createElement('div');
                photosContainer.classList.add('photos');
                contentItem.appendChild(photosContainer);
            }
            return photosContainer;
        }

        // 清除内容项中的照片
        function ContentItems(index) {
            contentItems.forEach((item, n) => {
                if (n !== index) {
                    const photosContainer = item.querySelector('.photos');
                    if (photosContainer && photosContainer.parentNode === item) {
                        item.removeChild(photosContainer);
                    }
                }
            });
            InitialPhotos(contentItems[index]);
        }

        // 初始化第一个页面
        contentItems[0].style.display = 'block';
        tabsList[0].style.color = 'red';
        InitialPhotos(contentItems[0]);

        // 绑定点击事件
        tabsList.forEach((tab, index) => {
            tab.onclick = () => {
                tabsList.forEach((t, n) => {
                    t.style.color = '';
                    contentItems[n].style.display = 'none';
                });

                ContentItems(index);
                contentItems[index].style.display = 'block';
                tab.style.color = 'red';
                loadCount = 0; // 切换选项卡时重置加载次数
                isLoading = false; // 切换选项卡时重置加载状态

                // 滚动到顶部
                window.scrollTo({ top: 495, behavior: 'smooth' });
            };
        });

        // 卸载函数
        this.unmount = function () {
            window.removeEventListener('scroll', scrollHandler);
            contentItems.forEach(item => {
                const photosContainer = item.querySelector('.photos');
                if (photosContainer) {
                    item.removeChild(photosContainer);
                }
            });
            tabsList.forEach(tab => {
                tab.onclick = null;
            });
        };
    }
};

export default Recommend;
