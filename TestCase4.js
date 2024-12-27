const { Builder } = require('selenium-webdriver');
const LoginPage = require('./WebComponent/LoginPage');
const DashboardPage = require('./WebComponent/DashboardPage');
const CartPage = require('./WebComponent/CartPage');
const CheckoutPage = require('./WebComponent/CheckoutPage');
const assert = require('assert');
const fs = require('fs');

const screenshotDir = './screenshots/';
if(!fs.existsSync(screenshotDir)){
    fs.mkdirSync(screenshotDir, {recursive: true});
}

describe('TestPageObject', function(){
    this.timeout(40000);
    let driver;

    //Run setiap mulai test, satu kali saja paling awal
    before(async function (){
        driver = await new Builder().forBrowser('chrome').build();
    });

    //Test Suite dimulai dengan apa, setiap melakukan tes
    beforeEach(async function (){
        const loginPage = new LoginPage(driver);
        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');
    });

    //Assertion atau validasi setelah login
    it('Login successfully and verify dashboard', async function (){
        const dashboardPage = new DashboardPage(driver);
        const title = await dashboardPage.isOnDashboard();
        assert.strictEqual(title, 'Products', 'Expected dashboard title to be Products');
    });

    //Add item to the cart
    it('Add item to the cart', async function () {
        const addtocartpage = new CartPage(driver);
        await addtocartpage.addItemToCart();
    });

    //Item added to the cart
    it("Item has been added to the cart", async function (){
        const iteminCart = new CartPage(driver);
        await iteminCart.goToCart();
    });

    //Checkout item
    it('successfully go to checkout', async function (){
        const iteminCart = new CartPage(driver);
        await iteminCart.goToCart();
        await iteminCart.clickCheckoutButton();
    });

    //Fill Checkout Page
    it('successfully filled the checkout form', async function(){
        const checkoutForm = new CheckoutPage(driver);
        await checkoutForm.goToCart();
        await checkoutForm.clickCheckoutButton();
        await checkoutForm.fillCheckoutForm('Jake', 'Drake', '10290');
        await checkoutForm.submitCheckout();
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