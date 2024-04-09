const selenium = require('selenium-webdriver');


describe('My Selenium Tests', function () {

    let driver;

    beforeAll(async function () {
        driver = await new selenium.Builder().forBrowser('chrome').build();
        await driver.manage().window().maximize();
        await driver.get('http://localhost:3000/');
    });

    afterAll(async function () {
        await driver.quit()
    })

    test(' should verify h1 text', async function() {
        // we no longer have to provide our setup code as this will now run beforeAll
        //  test thanks to the beforeAll method
        // const driver = await new selenium.Builder().forBrowser('chrome').build();
        // await driver.manage().window().maximize();
        // await driver.get('http://localhost:3000/');
        const h1Element = await driver.findElement(selenium.By.css('h1'));
        const actualText = await h1Element.getText();
        const expectedText = 'Things I should stop procrastinating:';

        // Using Jest's expect and toBe matcher
        expect(actualText).toBe(expectedText);
    })

    test('Add Item to List', async () => {
        // Find the text input element
        const inputElement = await driver.findElement(selenium.By.css('[placeholder="Type an item here"]'));

        // Enter "Eat more ice cream" into the text input one character at a time with a delay so we can see our text
        for (const char of 'Eat more ice cream') {
            await inputElement.sendKeys(char);
            await new Promise(resolve => setTimeout(resolve, 50)); // Add a delay of 50 milliseconds
        }

        // after we have entered our text now lets go ahead and hit the return key
        await inputElement.sendKeys(selenium.Key.RETURN);

        //  without a delay
        // await inputElement.sendKeys('Eat more ice cream', selenium.Key.RETURN);

        // lets select our list items by targeting li css element
        const listItems = await driver.findElements(selenium.By.css('li'));

        // Get the text of the last item
         const lastItemText = await listItems[listItems.length - 1].getText();

         // Verify that the last item has the text "Eat more ice cream"
         expect(lastItemText).toBe('Eat more ice cream');
      });

      test('Clicking on "Finished the list!" will delete all elements in the list', async () => {

        // Locate and click the "Finished the list!" button
        const finishedButton = await driver.findElement(selenium.By.xpath('//button[normalize-space()="Finished the list!"]'));
        await finishedButton.click();

        // Wait for a brief moment to allow the list to update (you can use a wait if necessary)
        await driver.sleep(1000);

        // Verify that all elements in the list are deleted
        const listItems = await driver.findElements(selenium.By.css('li'));
        expect(listItems.length).toBe(0);
    });
})
