# React Exchange Converter test task

Please see deployed application here: 
https://453m86-3000.csb.app/

## Features (by developer):

● Fetching from real API

● Responsive layout

● Decomposition and code structure close to bigger projects

● Utilize of HOC pattern for error page

● Utilize of memoized selectors for calculations of derived state

● Unit tests for both components and validating functions

## Installation:

Please checkout code from the Github repo:
https://github.com/oerbyy/exchange-test

<code>npm i <br>
npm start</code>

## Requirements (by client):

● Creat-react-app - as starter template

● High-level mockups for tech task
https://drive.google.com/file/d/1c23I1p57iTinRdsLrWleEHYSxb43Cq95/view?usp
=sharing

● Result of the test task - link to https://codesandbox.io/ (100% working
application, we can click on everything, responsive layouts, no errors in the
console or on the screen, where we can check code structure, structure of
folders, as example - https://codesandbox.io/s/y2lrywpk21)

● Currency API
https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5

● On each 5th api request - imitate server error (create counter, store it in
localStorage). After - reset value in localStortage. On error case - hide table,
show error message.

● Buy/Sell cells must be editable, on cell hover - edit icon appears, edit icon
onClick - appears editable input with two save/cancel icons, input value
validations - input value must be +- 10% + initial currency value from api,
otherwise - save icon must be disabled.

● Example of editable cell mockup
https://drive.google.com/file/d/1JkF_n03lIO4T6WDcfRG5nUZL38b15U3o/view?u
sp=sharing

● Create currency converter: two input fields and appropriate dropdown with
currencies(USD, EUR, UAH, BTC), currency for calculations -
get actual (can be changed in the table) value from cell with currency
Example - in the mockups
(https://drive.google.com/file/d/1c23I1p57iTinRdsLrWleEHYSxb43Cq95/view?usp=sharing two dropdowns with currencies). Values in the input can be swapped
(please see arrow, functionality the same as in google translate for example).

● On page reloading - wipe out editabled data, fetch fresh currency rates from api

● Cover by unit tests - currency converter and function, that will validate input
values in the editable cells.

● Height of layout application - full screen height, without vertical scroll header,
footer - 100px height, all another vertical space - content.

## Technology stack (by client):

● React - required

● State management - local state, context, Redux/Effector

● Ui framework - feel free to choose any

● Unit tests - jest, karma, mocha, react-testing-library

## Nice to have (by client):

● Fancy UI (any framework - bootstrap, material ui, etc )

● Error handling (imitate and catch server errors, handle min/max values in the
inputs)

● Good-structured code, react best practices are welcome

● React hooks

● Responsive layout

● Add fancy styles for head, footer, table and whole layout

● Typescript

## Prohibited (by client):

● Take ready-to-use npm packages or libs, that will provide functionality of currency
converter or editable tables. List of available packages - react, redux, effector,
typescript, any ui/css framework for styling, any test framework.
