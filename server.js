const express = require('express');
const ConnectDB = require('./config/db');

const PORT = process.env.PORT || 3001;
const app = express();

//connect to mongodb
ConnectDB();

app.get('/', (req,res)=>res.send('hello world, the api is working'));

app.listen(PORT, ()=> console.log(`listening on port ${PORT}`));