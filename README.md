# Express Register, Login & Auth Users Using JWT

- This is an express login application that leverages passport's jwt strategy.

# Set up
## Mongo DB
- This application uses Mongo DB Atlas to connect.
- [This](https://www.mongodb.com/docs/atlas/getting-started/) is a good guide to quickly set up a Mongo DB atlas collection.
- You need to get the connection string from your account to place in the default config file.

## Postman 
- Make sure you have [Postman](https://www.postman.com/downloads/) installed.

# Postman collections
- (optional) I created a folder called 'Users & Auth' to place my calls in.
  - Register User
  - Get Auth User
  - Login User

### Register User
- This registers the user and saves their credentials in the DB.
- POST http://localhost:3001/api/users
- Add header:
  - Key: Content-Type, Value: Application/Json
- Body > raw > json example:
```json
{
  "name":"Git Hub",
  "email":"Github@gmail.com",
  "password":"Github"
}
```
  

### Get Auth User
- This Authorizes that the user is registered/logged in and has an authorized token
- GET http://localhost:3001/api/auth
- Add header:
  - Key: Authorization, Value: ```bearer token```

### Login User
- This Logs the user in and provides the authorization token 
- POST http://localhost:3001/api/auth
- Add header:
  - Key: Content-Type, Value: Application/Json
- Body > raw > json example:
```json
{
  "email":"Github@gmail.com",
  "password":"Github"
}
```
