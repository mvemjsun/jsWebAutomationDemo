const webdriver = require('selenium-webdriver');
const until = webdriver.until;
const using = webdriver.By;

class BasePage {

    constructor(driver, cssSelector = '') {
        if (!driver) {
            throw new Error('driver not specified');
        }

        this.driver = driver;
        this.cssSelector = cssSelector;
    }

    async findElement() {
        const elements = await this.driver.findElements(using.css(this.cssSelector));
        return elements[0];
    }

    async findElementByCss(cssSelector) {
        const elements = await this.driver.findElements(using.css(cssSelector));
        return elements[0];
    }

    async findElementsByCss(cssSelector) {
        return await this.driver.findElements(using.css(cssSelector));
    }

    async findChildByCss(childCssSelector) {
        const children = await this.findChildrenByCss(childCssSelector);
        return children[0];
    }

    async findChildrenByCss(childCssSelector) {
        const fullSelector = `${this.cssSelector} ${childCssSelector}`;
        return await this.driver.findElements(using.css(fullSelector));
    }

    async exists() {
        const elements = await this.driver.findElements(using.css(this.cssSelector));
        return elements.length > 0;
    }

    async isVisible() {
        const element = await this.findElement();
        if (!element) {
            return false;
        }
        return await element.isDisplayed();
    }

    async waitUntilExists(timeout) {
        const waitCondition = until.elementLocated(using.css(this.cssSelector));
        await this.driver.wait(waitCondition, timeout);
    }
}

module.exports = BasePage;
