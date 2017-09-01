const puppeteer = require('puppeteer');

'use strict';

// 文档地址 https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md
(async() => {
    const browser = await puppeteer.launch({
      // headless: false
    }); // 打开浏览器
    const page = await browser.newPage(); // 打开一个新页面
    const screen = { // 页面可视区尺寸
        width: 750,
        height: 600
    };

    page.on('console', (...args) => { // 将页面的 console 输出到node里面
      args.every((arg) => {
        console.log(arg);
        return true;
      });
    });

    await page.setViewport(Object.assign({
        isMobile: true, // 是否为手机模式
        hasTouch: true
    }, screen));

    // await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1');

    await page.goto('https://m.wandougongzhu.cn', {
      waitUntil: 'networkidle',
      networkIdleTimeout: 2000
    }); // 页面跳转到指定的 url

    let clip = await page.evaluate((cid) => { // 在页面中执行操作
        let $item = $('.page-view:visible').find(`.c-item[data-cid="${cid}"]`);
        let rect = $item[0].getBoundingClientRect();

        return {
          x: rect.left,
          y: rect.top,
          width: rect.width,
          height: rect.height
        };
    }, 253750 /*传入指定下标去做截图*/);

    console.log('裁剪区域为', clip);

    await page.screenshot({
        path: 'wdgz.png', // 截图生成的文件，可以指定路径
        clip: clip // 裁剪区域
    });

    browser.close();
})();