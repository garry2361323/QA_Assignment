import { Given, Then, When, And } from '@badeball/cypress-cucumber-preprocessor'
import { apiGet } from '../api/latest/GET'

let response
let queryResponse
Given("I make a GET request with base currency as {string}", (baseCurrency) => {
   response = apiGet.getLatest(baseCurrency)
})

Then("I wait for a response with status code in body as {string}", (statusCode) => {
   apiGet.verifyStatusCodeInBody(response, statusCode)
})

Then("I wait for a response with status code as {string}", (statusCode) => {
   apiGet.verifyStatusCode(response, statusCode)
})

Then("I am able to see success as {string}", (success) => {
   apiGet.verifySuccess(response, success)
})

Then('I wait for a response body containing following keys', datatable => {
   const keys = []
   datatable.hashes().forEach(element => {
      keys.push(element.keys)
   })
   apiGet.verifyKeys(response, keys)
})

Given("I am able to see currency count of {string} in response", (count) => {
   apiGet.verifyCurrencyCount(response, count)
})

Then('I make a GET request with following query parameter', datatable => {
   let paramName = []
   let paramValue = []

   datatable.hashes().forEach(element => {
      paramName.push(element.name)
      paramValue.push(element.value)
   })
   queryResponse = apiGet.getLatestWithQueryParam(paramValue)
})

Then('I wait for a response body with following currency rates', datatable => {
   const rates = []
   datatable.hashes().forEach(element => {
      rates.push(element.rates)
   })
   apiGet.verifyRates(queryResponse, rates)
})

Then("I am able to validate correct JSON schema", () => {
   queryResponse.then((res) => {
      let body = JSON.parse(JSON.stringify(res.body))
      expect(body).to.be.jsonSchema(cy.fixture("latest_GET_schema"));
   })

})