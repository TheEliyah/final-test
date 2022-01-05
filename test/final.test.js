'use strict';

const { Builder, By, until, Key } = require('selenium-webdriver');
const chai = require('chai');
const expect = chai.expect;
const chrome = require('selenium-webdriver/chrome');

describe('DemoQA test', function() {
    let driver;

    before(async function() {
        let service = new chrome.ServiceBuilder('C:\\Users\\38161\\Desktop\\Kurs\\chromedriver\\chromedriver.exe').build()
        chrome.setDefaultService(service);

        driver = await new Builder().forBrowser('chrome').build();
    });

    after(function() {
        return driver.quit();
    });

    it('Opens demoqa.com homepage', async function() {
        await driver.get('http://test.qa.rs/');

        expect(await driver.getCurrentUrl()).to.eq('http://test.qa.rs/');
    });

    it('Goes to registration page', async function() {
        const register = await driver.findElement(By.xpath('//a[contains(@href, 'register')]'));
        await register.click();

        expect(await driver.getCurrentUrl()).to.eq('http://test.qa.rs/register/elements');

        const fillFirstName = 'Ilija';
        const fillLastName = 'Bubanj';
        const fillUserEmail = 'ilijabubanj@gmail.com';
        const fillUserName = 'TheEliyah';
        const fillPassword = 'Kikiriki123';
        const fillConfirmPassword = 'Kikiriki123';

        const firstName = await driver.findElement(By.name('firstname'));
        firstName.sendKeys(fillFirstName);

        const lastName = await driver.findElement(By.name('lastname'));
        lastName.sendKeys(fillLastName);

        const userEmail = await driver.findElement(By.name('email'));
        userEmail.sendKeys(fillUserEmail);

        const userName = await driver.findElement(By.name('username'));
        userName.sendKeys(fillUserName);

        const userPassword = await driver.findElement(By.name('password'));
        userPassword.sendKeys(fillPassword);

        const userConfirmPassword = await driver.findElement(By.name('passwordAgain'));
        userConfirmPassword.sendKeys(fillConfirmPassword);

        const buttonRegister = await driver.findElement(By.name('register'));
        await buttonRegister.click();

        expect(await driver.findElement(By.xpath('//strong[contains(., 'TheEliyah')]')).getText()).to.contain('TheEliyah');

    });

    it('Goes to login page', async function() {
        const login = await driver.findElement(By.linkText('Login'))
        await login.click();

        expect(await driver.findElement(By.css('h2')).getText()).to.contain('Login');
    });

    it('Successfully performs login', async function() {
        const userName = await driver.findElement(By.name('username'));
        userName.sendKeys(fillUserName);

        const password = await driver.findElement(By.name('password'));
        password.sendKeys(fillPassword);

        const login = await driver.findElement(By.name('login'));
        await login.click();

        expect(await driver.findElement(By.css('h2')).getText()).to.contain('Welcome back,Ilija');
    });
});