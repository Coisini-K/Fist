async function loadResource(srcPath) {
  console.log('Loading resource:', srcPath);

  try {
    // 确保 manifest.json 的路径正确
    const manifestResponse = await fetch('/dist/.vite/manifest.json'); // 使用绝对路径

    if (!manifestResponse.ok) {
      throw new Error(`Failed to fetch manifest.json: ${manifestResponse.statusText}`);
    }

    const manifest = await manifestResponse.json();
    console.log('Manifest content:', manifest); // 打印 manifest 内容

    // 查找对应哈希值的路径
    const distPath = manifest[srcPath]?.file || srcPath;
    console.log('Mapped path for', srcPath, 'is', distPath); // 打印映射后的路径

    if (!distPath) {
      throw new Error(`Resource not found in manifest: ${srcPath}`);
    }

    if (srcPath.endsWith('.css')) {
      const linkElement = document.createElement('link');
      linkElement.rel = 'stylesheet';
      linkElement.href = `/dist/assets/${distPath}`; // 注意这里加上 '/'

      console.log('Appending stylesheet:', linkElement.href); // 打印插入的样式表链接

      document.head.appendChild(linkElement);
    } else if (srcPath.endsWith('.js')) {
      const scriptElement = document.createElement('script');
      scriptElement.type = 'module';
      scriptElement.src = `/dist/assets/${distPath}`; // 注意这里加上 '/'
      console.log('Appending script:', scriptElement.src); // 打印插入的脚本链接

      document.body.appendChild(scriptElement);
    } else {
      console.warn(`Unsupported resource type: ${srcPath}`);
    }
  } catch (error) {
    console.error(`Error loading resource ${srcPath}:`, error);
  }
}

export default loadResource;