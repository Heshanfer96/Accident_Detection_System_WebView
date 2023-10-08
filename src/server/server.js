const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { DBConnect } = require("./connection");
// import { response } from 'express'
const userAPI = require('./route/userApi');
const bodyparser = require("body-parser")
const session = require('express-session')
const jwt = require('jsonwebtoken')

DBConnect();

const path = require("path");

const app = express();

app.use(express.json())

// app.use(
//     cors({
//         origin: [process.env.URL],
//         credentials: true,
//     })
// );

app.use(cors())

app.use(cookieParser());
app.use(bodyparser.urlencoded({extended:true}));

app.use(session({
    key:'userId',
    secret : "groupProject",
    resave : false ,
    saveUninitialized : false ,
    cookie: {
        expires : 60 * 60 * 24 ,
    }
}))

// app.post("/register",(req,res)=>{
//     console.log(req.body)
// })

app.use('/users', userAPI());

const port = process.env.PORTADDRESS || 5000;

app.listen(port, () => console.log(`listening on http://localhost:${port}`)).on("error", (err) => {
    console.log(`catched error on listen & error is   ${err}\n`);
});
