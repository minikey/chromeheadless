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

    await page.goto('http://www.wandougongzhu.cn/index/news?id=389', {
      waitUntil: 'networkidle',
      networkIdleTimeout: 2000
    }); // 页面跳转到指定的 url

    let content = await page.evaluate(() => { // 在页面中执行操作
        let $content = $('.news-detail');
        let textContent = '';
        let tmp = null;

        $content.find('p').each(function() {
            tmp = $(this).text().trim();
            if (tmp) {
                textContent += tmp;
                textContent += '\r\n';
            }
        });

        return textContent;
    });

    console.log(content);

    browser.close();
})();