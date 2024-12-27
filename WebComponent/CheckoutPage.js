const { By } = require('selenium-webdriver');

class CheckoutPage{
    constructor(driver){
        this.driver = driver;
        this.firstNameField = By.id('first-name');
        this.lastNameField = By.id('last-name');
        this.zipCodeField = By.id('postal-code');
        this.continueButton = By.id('continue');
        this.cartButton = ".shopping_cart_badge";
        this.checkoutButton = "btn btn_action btn_medium checkout_button";
        this.finishButton = By.id('finish');
    }

    async goToCart(){
        await this.driver.findElement(By.css(this.cartButton)).click();
    }

    async clickCheckoutButton(){
         await this.driver.findElement(By.className(this.checkoutButton)).click();
    }

    async fillCheckoutForm(firstname, lastname, zipcode){
        await this.driver.findElement(this.firstNameField).sendKeys(firstname);
        await this.driver.findElement(this.lastNameField).sendKeys(lastname);
        await this.driver.findElement(this.zipCodeField).sendKeys(zipcode);
    }

    async submitCheckout(){
        await this.driver.findElement(this.continueButton).click();
    }

    async clickFinish(){
        await this.driver.findElement(this.finishButton).click();
    }

}

module.exports = CheckoutPage;