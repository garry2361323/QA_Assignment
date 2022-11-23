Feature: Returns real-time exchange rate data for all available or a specific set of currencies

    @smoke
    Scenario Outline: Verify status code based on base currency value
        When I make a GET request with base currency as "<baseCurrency>"
        Then I wait for a response with status code as "<statusCode>"

        Examples:
            | baseCurrency | statusCode |
            |              | 200        |
            | INCORRECT    | 200        |
            | USD          | 200        |


    Scenario: Verify JSON keys and currency count in response
        When I make a GET request with base currency as "USD"
        Then I wait for a response body containing following keys
            | keys      |
            | success   |
            | timestamp |
            | base      |
            | date      |
            | rates     |
        And I am able to see currency count of "169" in response

    Scenario: Verify that user gets limited currency rates in response
        When I make a GET request with following query parameter
            | name    | value   |
            | base    | EUR     |
            | symbols | USD,GBP |
        Then I wait for a response body with following currency rates
            | rates |
            | USD   |
            | GBP   |

    # TODO: Below scenario is failing and need more analysis
    Scenario: Test JSON schema
        When I make a GET request with following query parameter
            | name    | value   |
            | base    | EUR     |
            | symbols | USD,GBP |
        Then I am able to validate correct JSON schema