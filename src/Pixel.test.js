// const pixelTest = require('pixelmatch');
const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 6'];
const pixelTest = require('./diffImages.js')

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false
  });
  page = await browser.newPage();
  await page.goto('http://localhost:3001/');
  await page.emulate(iPhone)
});

describe('screenshots are the same', () => {
  it('/index', async () => {
    const file = 'screenshot.png'
    await page.screenshot({path: file})
    return pixelTest.compareScreenshots(file)
  })
})

afterAll( () => {
  browser.close()
})