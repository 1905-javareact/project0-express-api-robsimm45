import session from 'express-session'

const sess =  {
    secret: 'Nani?',
    cookie: { secure: false },
    resave: false,
    saveUninitialized: false
}

export const sessionMiddleware = session(sess)