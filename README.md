# QA developer task

This framework uses Cypress v11 for testing with mochawesome for reporting..

 - [mochawesome-report](https://github.com/garry2361323/QA_Assignment/tree/main/mochawesome-report) contains mochawesome report i.e. mochawesome.html
 - [e2e](https://github.com/garry2361323/QA_Assignment/tree/main/cypress/e2e/feature) contains all the feature files
 - [support/<feature_file_name>](https://github.com/garry2361323/QA_Assignment/tree/main/cypress/support) contains step definations.
 - [fixtures/latest_GET_schema.json](https://github.com/garry2361323/QA_Assignment/tree/main/cypress/fixtures) contains external pieces of static data that can be used by the tests.

### How to run the tests

Running in headless mode

```sh
npm run triggerAllTests-headless
```
Running in headed mode
```sh
npm run triggerAllTests-headed
```
Running using tags

```sh
npx cypress run --env tags=@smoke
```

### Retry for flaky tests

By default this project is specified to have retry count with 1. This can be changed by modifying the "retries" entry in 'cypress.config.js' file.

```sh
module.exports = defineConfig({
retries: 1
})
```

### Reports

For better illustration on the testcases, mochawesome reports has been integrated.

<img width="955" alt="image" src="https://user-images.githubusercontent.com/19347472/203657392-e2ecab7e-32b0-4c54-a394-1a3e66a643c5.png">

After every execution the reports can be merged by using following script

```sh
npm run mochawesome-merge
```

