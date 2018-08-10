Feature: As a crypto bank user
    I want to visit the bank website
    So that I can Login into my account

  Scenario: Visit the Login page
      Then I should see a text box for entering the email
      And I should see a text box for entering the password
      And I should see a sign in button
      And I should see a login header with text "Crypto Bank Login"
      And I should see a email address label with text "Email address"

  Scenario: Attempt to login
      When I attempt to login without any credentials
