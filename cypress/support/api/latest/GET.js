export class get {

    getLatest(baseCurrency) {
        return cy.request({
            method: "GET",
            url: "/latest",
            qs: {
                base: baseCurrency
            },
            headers: {
                apikey: Cypress.env("apikey")
            }
        })
    }

    getLatestWithQueryParam(paramValue) {

        return cy.request({
            method: "GET",
            url: "/latest",
            qs: {
                base: `${paramValue[0]}`,
                symbols: `${paramValue[1]}`
            },
            headers: {
                apikey: Cypress.env("apikey")
            }
        })
    }

    verifyStatusCodeInBody(response, statusCode) {
        response.then((res) => {
            let body = JSON.parse(JSON.stringify(res.body))
            expect(body.error.code).to.equal(Number(statusCode))
        })
    }

    verifyStatusCode(response, statusCode) {
        response.its("status").should("equal", Number(statusCode))
    }

    verifySuccess(response_test, success) {
        response_test.then((res) => {
            let body = JSON.parse(JSON.stringify(res.body))
            expect(String(body.success)).to.equals(success)
        })
    }

    verifyKeys(response, keys) {
        response.then((res) => {
            let body = JSON.parse(JSON.stringify(res.body))
            expect(body).to.have.all.keys(keys)
        })
    }

    verifyRates(response, rates) {
        response.then((res) => {
            let body = JSON.parse(JSON.stringify(res.body))
            expect(body.rates).to.have.all.keys(rates)
        })
    }

    verifyCurrencyCount(response, count) {
        response.then((res) => {
            let body = JSON.parse(JSON.stringify(res.body))
            var count = Object.keys(body.rates).length;
            expect(count).equals(Number(count))
        })

    }



}

export const apiGet = new get;