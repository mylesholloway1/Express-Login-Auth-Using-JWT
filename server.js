const express = require('express');
const ConnectDB = require('./config/db');
const passport = require('passport');

const PORT = process.env.PORT || 3001;
const app = express();

//init middleware
app.use(express.json({ extended: false }));
app.use(passport.initialize());

require('./middleware/passport');

//connect to mongodb
ConnectDB();

app.get('/', (req, res) => res.send('hello world, the api is working'));

//create routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
