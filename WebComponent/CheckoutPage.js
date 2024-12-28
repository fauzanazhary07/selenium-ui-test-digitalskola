const { By } = require('selenium-webdriver');

class CheckoutPage{
    constructor(driver){
        this.driver = driver;
        this.btnCartIcon = By.className('shopping_cart_link');
        this.btnCheckout = By.xpath('//button[@id="checkout"]');
        this.firstNameField = By.xpath("//input[@id='first-name']");
        this.lastNameField = By.xpath("//input[@id='last-name']");
        this.zipCodeField = By.xpath('//input[@id="postal-code"]');
        this.continueBtn = By.id('continue');
        this.finishBtn = By.id('finish');
    }

    async finishCheckoutForm(firstname, lastname, zipcode){
        await this.driver.findElement(this.btnCartIcon).click();
        await this.driver.findElement(this.btnCheckout).click();
        await this.driver.findElement(this.firstNameField).sendKeys(firstname);
        await this.driver.findElement(this.lastNameField).sendKeys(lastname);
        await this.driver.findElement(this.zipCodeField).sendKeys(zipcode);
        await this.driver.findElement(this.continueBtn).click();
        await this.driver.findElement(this.finishBtn).click();
    }

    async isOnCheckoutCompletePage(){
        const title = await this.driver.findElement(By.className('title'));
        return title.getText();
    }
}

module.exports = CheckoutPage;