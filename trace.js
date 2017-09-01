'use strict';

const puppeteer = require('puppeteer');

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

    await page.tracing.start({path: 'trace.json'});
    await page.goto('https://m.wandougongzhu.cn');
    await page.tracing.stop();

    browser.close();
})();