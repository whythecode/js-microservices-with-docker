import { browser, by, element, ExpectedConditions } from 'protractor';

describe('Search', () => {

  beforeEach(async () => {
    await browser.get(process.env.BASE_URL + 'search');
    browser.waitForAngularEnabled(true);
  });

  it('should have an input and search button', () => {
    expect(element(by.css('app-root app-search form input')).isPresent()).toEqual(true);
    expect(element(by.css('app-root app-search form button')).isPresent()).toEqual(true);
  });

  it('should allow searching', async () => {
    const searchButton = element(by.css('button'));
    const searchBox = element(by.css('input'));
    try {
      await searchBox.sendKeys('M');
      await searchButton.click();
      await browser.wait(ExpectedConditions.visibilityOf(element.all(by.css('app-search table tbody tr')).first()), 5000);
    } catch (e) {
      console.log('ERROR');
      console.log(e);
      expect(true).toEqual(false);
    }
    const list = element.all(by.css('app-search table tbody tr'));
    expect(list.count()).toBe(3);
  });
});
