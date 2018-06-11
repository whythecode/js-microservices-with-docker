import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    browser.waitForAngularEnabled(true);
    return browser.get(process.env.BASE_URL);
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
