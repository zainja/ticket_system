const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const userRouter = require("./routes/auth");
const teamRouter = require('./routes/team')
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/auth', userRouter)
app.use('/team', teamRouter )
const port = 5000 | process.env.PORT
app.listen(port)
module.exports = app;
