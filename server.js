const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

app.get('/', (req,res)=>res.send('hello world, the api is working'));

app.listen(PORT, ()=> console.log(`listening on port ${PORT}`));