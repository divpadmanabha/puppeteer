const { defineFeature, loadFeature } = require("jest-cucumber");

const feature = loadFeature("./test/features/much-borrow.feature");

const PAGE = "https://www.anz.com.au/personal/home-loans/calculators-tools/much-borrow/";

//locators
const borrowingPage = {
    applicationTypeSingle: 'label[for="application_type_single"]',
    applicationTypeJoint: 'label[for="application_type_joint"]',
    noOfDependants: 'select[title="Number of dependants"]',
    property2BorrowHome: 'label[for="borrow_type_home"]',
    property2BorrowInvestment: 'label[for="borrow_type_investment"]',
    yourIncome:  'input[aria-labelledby="q2q1"]',
    yourOtherIncome:  'input[aria-labelledby="q2q2"]',
    livingExpenses: 'input[id="expenses"]',
    currentHomeRepayments:  'input[id="homeloans"]',
    otherLoanRepayments:  'input[id="otherloans"]',
    otherCommitments:  'input[aria-labelledby="q3q4"]',
    totalCreditCardLimits:  'input[id="credit"]',
    btnHowMuchCanIBorrow: 'button[class="btn btn--action btn--borrow__calculate"]',
    landingSpan: 'span[class="borrow__result__text__amount"]',
    btnStartOver: 'button[class="start-over"]',
    errorSpan: 'span[class="borrow__error__text"]'
}


defineFeature(feature, test => {


  const givenAtBorrowScreen = given => {
      given("I am at the - How much can I borrow screen", async () => {
        await page.goto(PAGE);
        await page.waitFor(borrowingPage.applicationTypeSingle);
    });
    };

test("Test Borrowing Power Calculator UnSuccessfully", ({ given, when, then }) => {
    givenAtBorrowScreen(given);

    when(/^I Select Single as the applicationType$/, async () => {
    await page.click(borrowingPage.applicationTypeSingle);
   });

   when(/^Select "(.*)" as the dependants$/, async (dependants) => {
     await page.select(borrowingPage.noOfDependants, dependants);
  });

  when(/^Select Home to live in as the Property Type$/, async () => {
    await page.click(borrowingPage.property2BorrowHome);
 });

    when(/^Select "(.*)" as your income before tax$/, async expenses => {
    await page.type(borrowingPage.yourIncome, expenses);
   });

   when(/^Select "(.*)" as your other income$/, async expenses => {
   await page.type(borrowingPage.yourOtherIncome, expenses);
  });

  when(/^Select "(.*)" as Living Expenses$/, async expenses => {
  await page.type(borrowingPage.livingExpenses, expenses);
 });

 when(/^Select "(.*)" as Current home loan repayments$/, async expenses => {
 await page.type(borrowingPage.currentHomeRepayments, expenses);
});

when(/^Select "(.*)" as Other loan repayments$/, async expenses => {
await page.type(borrowingPage.otherLoanRepayments, expenses);
});

when(/^Select "(.*)" as Other commitments$/, async expenses => {
await page.type(borrowingPage.otherCommitments, expenses);
});

when(/^Select "(.*)" as Total credit card limits$/, async expenses => {
await page.type(borrowingPage.totalCreditCardLimits, expenses);
});


when(/^Click How much can I Borrow Button$/, async () => {
  await page.click(borrowingPage.btnHowMuchCanIBorrow);

});

then(/^Validate User has Borrowing Estimate of "(.*)"$/, async borrowingEstimate => {
   await page.waitForSelector(borrowingPage.landingSpan);
   await new Promise(f => setTimeout(f, 1000));

  const txt = await page.$eval(borrowingPage.landingSpan, e => e.innerText);
  console.log(txt);
  // Asserting it
 await expect(txt).toMatch(borrowingEstimate);
});


  });

  test("Testing Start Over Button",({ given, when, then }) => {
    given(/^Nothing$/, async () => {

    });
      when(/^Click on Start Over Button$/, async () => {
      await new Promise(f => setTimeout(f, 1000));
      await page.click(borrowingPage.btnStartOver);
     });

     then(/^Validate all the fields are cleared$/, async () => {
      await new Promise(f => setTimeout(f, 1000));

       // Validating the value has been reset to 0
      var value = await page.evaluate(() => {
        return document.getElementById('expenses').value
      });
      console.log(value);
      await expect(value).toMatch("0");

      // Validating the value has been reset to 0
      var otherloansvalue = await page.evaluate(() => {
         return document.getElementById('otherloans').value
       });
      console.log(otherloansvalue);

      await expect(otherloansvalue).toMatch("0");

     });
  });

  test("Testing with Living Expenses Field Only",({ given, when, then }) => {
    given(/^Nothing$/, async () => {
    });
    when(/^Select "(.*)" as Living Expenses$/, async expenses => {
    await page.type(borrowingPage.livingExpenses, expenses);
   });

   when(/^Click How much can I Borrow Button$/, async () => {
     await page.click(borrowingPage.btnHowMuchCanIBorrow);
   });

   then(/^Validate Error Message "(.*)"$/, async borrowingEstimate => {
    await page.waitForSelector(borrowingPage.landingSpan);
    await new Promise(f => setTimeout(f, 1000));
    const txt = await page.$eval(borrowingPage.errorSpan, e => e.innerText);
     // Asserting it
    await expect(txt).toMatch(borrowingEstimate);
   });
  });

    });
