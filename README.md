# react-fxeubank-heroku
A simple deployment ready webpack-react application for heroku

## Instructions

1.  Clone this repo
2.  Run `yarn install`
3.  Run `yarn dev`, **localhost:8080** will open up in your default browser

## Verify production code
1. Run `webpack -p`
2. Run `node server.js`, and visit **localhost:8080**, voila your code is ready for heroku now.

## Heroku https://fxeubank.herokuapp.com/


## Create MongoDB to Heroku
heroku addons:create mongolab

## What is redux
Redux is a predictable state container for JavaScript apps. That means Redux can be used with vanilla JavaScript or frameworks/libraries such as Angular and Vue. Redux is mainly a framework for issuing state updates and responses to actions.

## What is an action
Actions are payloads of information that send data from your application to your store. They are the only source of information for the store.

##What is a reducer?
In technical terms, the reducer is a pure function that receives two parameters (the current state and the action), and you return a new immutable state depending on the action.