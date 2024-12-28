const { Builder } = require('selenium-webdriver');
const LoginPage = require('../WebComponent/LoginPage');
const CartPage = require('../WebComponent/CartPage');
const CheckoutPage = require('../WebComponent/CheckoutPage');
const assert = require('assert');
const fs = require('fs');
require('dotenv').config();

const browser = process.env.BROWSER;
const baseUrl = process.env.BASE_URL;
const username = process.env.USER_NAME;
const password = process.env.PASSWORD;
const firstname = process.env.FIRST_NAME;
const lastname = process.env.LAST_NAME;
const zipcode = process.env.ZIPCODE;

const screenshotDir = './screenshots/';
if(!fs.existsSync(screenshotDir)){
    fs.mkdirSync(screenshotDir, {recursive: true});
}

describe('TestCase 4 [checkout complete page] #Regression #Smoke', function(){
    this.timeout(40000);
    let driver;

    switch(browser.toLowerCase()){
        case 'firefox':
            const firefox = require('selenium-webdriver/edge');
            options = new firefox.Options();
            options.addArguments('--headless');
        case 'edge':
            const edge = require('selenium-webdriver/edge');
            options = new edge.Options();
        case 'chrome':
        default:
            const chrome = require('selenium-webdriver/chrome');
            options = new chrome.Options();
            options.addArguments('--headless');
            break;
    }

    //Run setiap mulai test, satu kali saja paling awal
    before(async function (){
        driver = await new Builder().forBrowser(browser).setFirefoxOptions(options).build();
    });

    //Test Suite dimulai dengan apa, setiap melakukan tes
    beforeEach(async function (){
        const loginPage = new LoginPage(driver);
        await loginPage.navigate(baseUrl);
        await loginPage.login(username, password);

        const cartPage = new CartPage(driver);
        await cartPage.addItemToCart();

        const checkoutPage = new CheckoutPage(driver);
        await checkoutPage.finishCheckoutForm(firstname, lastname, zipcode);

    });

    //Assertion atau validasi setelah login
    it('Successfully Order and Checkout Complete', async function(){
        const checkoutPage = new CheckoutPage(driver);
        const checkoutComplete = await checkoutPage.isOnCheckoutCompletePage();
        assert.strictEqual(checkoutComplete, 'Checkout: Complete!', 'Expected checkout complete page title name to be Checkout: Complete!');
    });

    afterEach(async function () {
        const screenshot = await driver.takeScreenshot();
        const filepath = `${screenshotDir}${this.currentTest.title.replace(/\s+/g, '_')}_${Date.now()}.png`
        fs.writeFileSync(filepath, screenshot, 'base64');
    });

    after(async function (){
        await driver.quit();
    })
})