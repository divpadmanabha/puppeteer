Feature: Test Borrowing Functionality

  Scenario: Test Borrowing Power Calculator UnSuccessfully
    Given I am at the - How much can I borrow screen
    When I Select Single as the applicationType
    And Select "0" as the dependants
    And Select Home to live in as the Property Type
    And Select "80000" as your income before tax
    And Select "10000" as your other income
    And Select "500" as Living Expenses
    And Select "0" as Current home loan repayments
    And Select "100" as Other loan repayments
    And Select "0" as Other commitments
    And Select "10000" as Total credit card limits
    And Click How much can I Borrow Button
    Then Validate User has Borrowing Estimate of "$479,000"

  Scenario: Testing Start Over Button
      Given Nothing
      When Click on Start Over Button
      Then Validate all the fields are cleared

  Scenario: Testing with Living Expenses Field Only
    Given Nothing
    When Select "500" as Living Expenses
    And Click How much can I Borrow Button
    Then Validate Error Message "Based on the details you've entered, we're unable to give you an estimate of your borrowing power with this calculator. For questions, call us on 1800 100 641."
