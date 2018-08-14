const webdriver = require('selenium-webdriver');
const using = webdriver.By;

class BasePage {

    constructor(driver, selector = '') {
        this.driver = driver;
        this.selector = selector;
    }

    async findElement() {
        const elements = await this.driver.findElements(using.css(this.selector));
        return elements[0];
    }

    async findElementByCss(selector) {
        const elements = await this.driver.findElements(using.css(selector));
        return elements[0];
    }

    async exists() {
        const elements = await this.driver.findElements(using.css(this.selector));
        return elements.length > 0;
    }
}

module.exports = BasePage;
