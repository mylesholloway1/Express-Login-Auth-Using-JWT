# DevConnector

this is a mock social media app for learning

# Backend

## Depedencies to install

- express
- express-validator
- bcryptjs
- config
- gravatar
- jsonwebtoken
- mongoose
- request

## Dev-Dependencies to install (-D)

- nodemon
- concurrently

## Register user in MongoDB

- Create api

  - Create get request to empty endpoint
  - Ensure api is serving to endpoint in postman

- Create config

  - This is a config folder that holds the config files
    - /config
  - default.json holds the connection string to mongodb
  - db.js makes the connection to the database
    - there should be a console log to let you know the connection was successful.

- Create routes

  - This is a seperate folder that holds the api folder.
    - /routes/api
    - users.js, profile.js... etc.
  - Create a simple get req/res to ensure they are connecting in postman
  - Add these routes to the server.js file

- Create model

  - This is a model folder that will hold all models
  - These files start with a capital (User.js) for best practice
  - Give ability to read body in server.js with ```app.use(express.json({extended:false}));

- Add validation

  - You should recieve error messages when data is incorrect
  - You should also get a bad request status when the data is invalid
  - on error status is 400

- Create Business Process
  - Whatever this may be
  - in this case, register user
  - business processes are put in try catch statement
  - on error status is 500

## Adding Authentication

- If they have not already been installed:

  - passport
  - passport-jwt

- Create A Signed Json Web Token

  - The payload will be the user's id
  - create secret in config file
  - if error throw error
  - else send 200 and token with bearer

- Create Passport middleware

  - Remember you can get the middlewar from passports website
  - Configure this respectfully

- Create auth route

  - this is a get request for the user data
  - passport authenticate with jwt
  - no sessions

- Init Passport Middleware & auth route

  - This is done in server.js
  - app uses passport initialize
  - require the middle ware you are about to create
  - create auth route
