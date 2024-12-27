const { By } = require('selenium-webdriver');

class CartPage {
    constructor(driver){
        this.driver = driver;
        this.addToCartBtnBackpack = By.xpath("//button[@id='add-to-cart-sauce-labs-backpack']");
        this.addToCartBtnBikeLight = By.xpath("//button[@id='add-to-cart-sauce-labs-bike-light']");
        this.addToCartBtnBoltTShirt = By.xpath("//button[@id='add-to-cart-sauce-labs-bolt-t-shirt']");
        this.addToCartBtnFleeceJacket = By.xpath("//button[@id='add-to-cart-sauce-labs-fleece-jacket']");
        this.addToCartBtnOnesie = By.xpath("//button[@id='add-to-cart-sauce-labs-onesie']");
        this.addToCartBtnAllTheThingsShirt = By.xpath("//button[@id='add-to-cart-test.allthethings()-t-shirt-(red)']");
        this.cartCount = By.className('shopping_cart_link');
    }

    async addItemToCart(){
        await this.driver.findElement(this.addToCartBtnBackpack).click();
        await this.driver.findElement(this.addToCartBtnBikeLight).click();
        const cartItemCountText = await this.driver.findElement(this.cartCount).getText();
        const itemCount = cartItemCountText.trim();
        return itemCount;
    }
}

module.exports = CartPage;