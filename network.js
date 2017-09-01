'use strict';

const puppeteer = require('puppeteer');

(async() => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setRequestInterceptionEnabled(true);
    page.on('request', request => {
        if (request.resourceType === 'Image')
            request.abort();
        else
            request.continue();
    });
    await page.goto('https://bbc.com');
    await page.screenshot({ path: 'news.png', fullPage: true });

    browser.close();

})();