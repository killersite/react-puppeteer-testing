const puppeteer = require('puppeteer');
const faker = require('faker');
const devices = require('puppeteer/DeviceDescriptors')
const iPhone = devices['iPhone 6']

const user = {
  email: faker.internet.email(),
  password: 'test',
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName()
};

const isDebugging = () => {
  const debugging_mode = {
    headless: false,
    sloMo: 250,
    devtools: true
  };
  return process.env.NODE_ENV == 'debug' ? debugging_mode : {};
};

let browser, page;

beforeAll(async () => {
  browser = await puppeteer.launch(isDebugging());
  page = await browser.newPage();
  await page.goto('http://localhost:3000/');
  page.setViewport({ width: 500, height: 2400 });
});

afterAll(() => {
  if (isDebugging()) {
    browser.close();
  }
});

describe('on page load', () => {

  test('h1 loads correctly',
    async () => {
      const html = await page.$eval('.App-title', e => e.innerHTML);
      expect(html).toBe('Welcome to React');
    },
    16000
  );

  test('h1 loads correctly on iPhone',
    async () => {
      const page2 = await browser.newPage();
      await page2.emulate(iPhone);
      await page2.goto('http://localhost:3000/')

      const html = await page2.$eval('.App-title', e => e.innerHTML);
      expect(html).toBe('Welcome to React');
    },
    16000
  );
  
});
