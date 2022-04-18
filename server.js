const express = require('express');
const ConnectDB = require('./config/db');

const PORT = process.env.PORT || 3001;
const app = express();

//init middleware
app.use(express.json({extended:false}));

//connect to mongodb
ConnectDB();

app.get('/', (req,res)=>res.send('hello world, the api is working'));

//create routes
app.use('/api/users', require('./routes/api/users'));

app.listen(PORT, ()=> console.log(`listening on port ${PORT}`));