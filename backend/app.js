const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');
const authRouter = require("./routes/auth");
const teamRouter = require('./routes/team')
const userRouter = require('./routes/user')
const teamOPRouter = require('./routes/teamOperations')
const taskRouter = require('./routes/task')
const locationRouter = require('./routes/location')
const cors = require('cors')
const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/auth', authRouter)
app.use('/team', teamRouter )
app.use('/user', userRouter )
app.use('/team-users', teamOPRouter)
app.use('/task', taskRouter)
app.use('/location', locationRouter)
const port = 5000 | process.env.PORT
app.listen(port)
module.exports = app;
