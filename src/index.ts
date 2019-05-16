import express from 'express'
import {reimbursementRouter} from './routes/reimbursement-router'
import { loginRouter } from './routes/login-router';
import { userRouter } from './routes/user-router';
import { logMiddleware } from './middleware/log-middleware';
import bodyParser = require('body-parser');

const app = express()

app.use(logMiddleware)
app.use(bodyParser)


app.get('/', (req, res) =>{
    res.json("There is really nothing here. I suggest adding login, users, or reimbursments")
})

app.use('/login', loginRouter)
app.use('/users', userRouter)
app.use('/reimbursment', reimbursementRouter)

app.listen(9050, ()=>{
    console.log('app has started')
})