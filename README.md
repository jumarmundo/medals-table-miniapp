# Medal Count Mini-app
![image](https://github.com/user-attachments/assets/ac813c4a-b1ae-4b8d-aa22-64d2a7326195)

## Table of Contents
- [Getting Started](#getting-started)
  - [Running the app](#running-the-app)
  - [Running tests](#running-tests)
- [Features](#features)
  - [Functional](#functional)
  - [Non-functional](#non-functional)
- [Assumptions](#assumptions)

## Getting Started
Developed using Node version 20.11.0
### Running the app
1. Run `npm install` in the root directory
2. Run `npm run dev` in the root directory
3. Navigate to [http://localhost:3000/](http://localhost:3000/)

### Running tests
1. Run `npm run test` in the root directory

## Features

<table>
  <thead>
    <tr>
      <th align="left">Functional</th>
      <th align="left">Non-functional</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td valign="top">
        <ul>
          <li>
            Accept a sort parameter from the URL with one of:
            <code>total</code>, <code>gold</code>, <code>silver</code>, <code>bronze</code>
          </li>
          <li>
            Default to sorting by <code>gold</code> if no sort parameter is provided
          </li>
          <li>
            Tie-breaking rules when sorting:
            <ul>
              <li>
                <strong>Total</strong>: if total medals tie, country with more gold ranks higher
              </li>
              <li>
                <strong>Gold</strong>: if gold medals tie, country with more silver ranks higher
              </li>
              <li>
                <strong>Silver</strong>: if silver medals tie, country with more gold ranks higher
              </li>
              <li>
                <strong>Bronze</strong>: if bronze medals tie, country with more gold ranks higher
              </li>
            </ul>
          </li>
          <li>
            Allow users to click any column header
            (<code>gold</code>, <code>silver</code>, <code>bronze</code>, <code>total</code>)
            to re-sort the table
          </li>
        </ul>
      </td>
      <td valign="top">
        <ul>
          <li>
            Client-side sorting only—don’t re-fetch medals data from the server when
            sort changes
          </li>
          <li>
            Render flag icons from the provided <code>flags.png</code> sprite
            (icons are ordered alphabetically by country code)
          </li>
          <li>
            Load country/medal data dynamically via AJAX from <code>medals.json</code>
            (simulating a real API endpoint)
          </li>
          <li>
            Display an appropriate error message if the AJAX request to
            <code>medals.json</code> fails
          </li>
          <li>
            Provide screen reader support that announces the current table sort order.
          </li>
          <li>
            Generate a URL that encodes and preserves the table’s current sort state.
          </li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

## Assumptions
* Sorting per column is always descending
  * Users are not able to unsort or sort by ascending
* Tie breaker logic is owned by the frontend as it is simple for now
* There are no authentication or authorisation measures in place for the medals API
  * The API is public
* The designs only show one breakpoint so the app design is not responsive or fluid


