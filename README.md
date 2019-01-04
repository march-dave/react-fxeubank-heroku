# react-fxeubank-heroku
A simple deployment ready webpack-react application for heroku

## Instructions

1.  Clone this repo
2.  Run `yarn install`
3.  Run `yarn dev run`, **localhost:8080** will open up in your default browser

## Verify production code
1. Run `webpack -p`
2. Run `node server.js`, and visit **localhost:8080**, voila your code is ready for heroku now.

## Heroku https://fxeubank.herokuapp.com/


## Create MongoDB to Heroku
heroku addons:create mongolab