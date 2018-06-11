import { browser, by, element, ExpectedConditions } from 'protractor';

describe('Edit', () => {

  beforeEach(async () => {
    await browser.get(process.env.BASE_URL + 'edit/5');
    browser.waitForAngularEnabled(true);
  });

  const name = element(by.id('name'));
  const street = element(by.id('street'));
  const city = element(by.id('city'));

  it('should allow viewing a person', async () => {
    try {
      expect(await element(by.css('h3')).getText()).toEqual('Chelsey Dietrich');
      expect(await name.getAttribute('value')).toEqual('Chelsey Dietrich');
      expect(await street.getAttribute('value')).toEqual('Skiles Walks');
      expect(await city.getAttribute('value')).toEqual('Roscoeview');
    } catch (e) {
      console.log('ERROR');
      console.log(e);
      expect(true).toEqual(false);
    }
  });

  it('should allow updating a name', async () => {
    const save = element(by.id('save'));
    try {
      await name.sendKeys(' Won!');
      await save.click();
      await browser.wait(ExpectedConditions.visibilityOf(element(by.css('h2'))), 5000);
    } catch (e) {
      console.log('ERROR');
      console.log(e);
      expect(true).toEqual(false);
    }
    // verify one element matched this change
    const list = element.all(by.css('app-search table tbody tr'));
    expect(list.count()).toBe(1);
  });
});
