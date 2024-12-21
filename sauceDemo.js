const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

async function sauceDemo() {
    // Membuat koneksi dengan Browser Driver
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get("https://www.saucedemo.com");

        //Memasukkan Username dan Password 
        await driver.findElement(By.id('user-name')).sendKeys('standard_user');
        await driver.findElement(By.xpath("//input[@id='password']")).sendKeys('secret_sauce');

        //Click button Login
        await driver.findElement(By.xpath("//input[@id='login-button']")).click();

        //Memastikan berada di dashboard dengan mencari Judul "Swag Labs"
        let titleText = await driver.findElement(By.xpath("//div[@class='app_logo']")).getText();
        assert.strictEqual(titleText.includes('Swag Labs'), true, "Title does not include 'Swag Labs'");

        //Add item to cart
        await driver.findElement(By.xpath("//button[@id='add-to-cart-sauce-labs-fleece-jacket']")).click();
        await driver.findElement(By.xpath("//button[@id='add-to-cart-sauce-labs-backpack']")).click();
        await driver.findElement(By.xpath("//button[@id='add-to-cart-sauce-labs-bolt-t-shirt']")).click();

        //Validate 3 item sukses ditambahkan ke cart
        let cartButton = await driver.findElement(By.xpath("//a[.='3']"));
        assert.strictEqual(await cartButton.isDisplayed(), true, "item on cart doesn't appear on the page");
        
        let addToCartButtonFleeceJacket = await driver.findElement(By.xpath("//button[@id='remove-sauce-labs-fleece-jacket']"));
        assert.strictEqual(await addToCartButtonFleeceJacket.isDisplayed(), true, "Item does not include 'Sauce Labs Fleece Jacket'");
        
        let addToCartButtonBackpack  = await driver.findElement(By.xpath("//button[@id='remove-sauce-labs-backpack']"));
        assert.strictEqual(await addToCartButtonBackpack.isDisplayed(), true, "Item does not include 'Sauce Labs Backpack'");

        let addToCartButtonTshirt = await driver.findElement(By.xpath("//button[@id='remove-sauce-labs-bolt-t-shirt']"));
        assert.strictEqual(await addToCartButtonTshirt.isDisplayed(), true, "Item does not include 'Sauce Labs Bolt T-Shirt'");
        
        let titleFleeceJacket = await driver.findElement(By.xpath("//div[.='Sauce Labs Fleece Jacket']")).getText();
        assert.strictEqual(titleFleeceJacket.includes('Sauce Labs Fleece Jacket'), true, "Title does not include 'Sauce Labs Fleece Jacket'");

        let titleBackpack = await driver.findElement(By.xpath("//div[.='Sauce Labs Backpack']")).getText();
        assert.strictEqual(titleBackpack.includes('Sauce Labs Backpack'), true, "Title does not include 'Sauce Labs Backpack'");

        let titleTshirt = await driver.findElement(By.xpath("//div[.='Sauce Labs Bolt T-Shirt']")).getText();
        assert.strictEqual(titleTshirt.includes('Sauce Labs Bolt T-Shirt'), true, "Title does not include 'Sauce Labs Bolt T-Shirt'");

    } finally {
        await driver.quit();
    }

}

sauceDemo();