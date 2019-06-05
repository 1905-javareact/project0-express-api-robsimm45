import express from 'express'
import {reimbursementRouter} from './routes/reimbursement-router'
import { loginRouter } from './routes/login-router';
import { userRouter } from './routes/user-router';
import { logMiddleware } from './middleware/log-middleware';
import bodyParser from 'body-parser';
import { sessionMiddleware } from './middleware/session-middleware';
import { corsfilter } from './middleware/corsfilter-middleware';
import cors from 'cors'

const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))


app.use(corsfilter)
app.use(logMiddleware)
app.use(bodyParser.json())
app.use(sessionMiddleware)



app.get('/', (req, res) =>{
    res.json("There is really nothing here. I suggest adding login, users, or reimbursments")
})

app.use('/login', loginRouter)
app.use('/users', userRouter)
app.use('/reimbursement', reimbursementRouter)

app.listen(9050, ()=>{
    console.log('app has started')
})