# Bottlestash app (frontend)

This is a project work for the Helsinki University course [Full Stack Open 2019](https://fullstackopen.com/). This repository is for the apps frontend only. See projects full description and documentation from the backends repository, [Bottlestash app (backend)](https://github.com/MiguelSombrero/bottlestash-app-backend)

## Implementation

Client side (frontend) is implemented with [React](https://reactjs.org/) 16.8.6. Axios id used for communicating with the backend. React-bootstrap is used for styling.

## Cloning project

To clone projects frontend to your machine:

    git clone https://github.com/MiguelSombrero/bottlestash-app-frontend

## Install dependencies and run

Navigate to cloned folder (bottlestash-app-frontend), install dependencies and start application (you need to have npm installed)

    npm install
    npm start

## Tests

Unit testing is done with [Jest](https://jestjs.io/), [react-testing-library](https://github.com/testing-library/react-testing-library) and [deep-freeze](https://www.npmjs.com/package/deep-freeze). Test coverage is ~ 25 % (something I'm not proud of).

Tests can be run on applications root directory

    npm test

Test coverage report

    CI=true npm test -- --coverage