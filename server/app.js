const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const { pool } = require('./db');

const app = express();

//middlewares
app.use(cors({
    origin: 'http://localhost:3000'
}))
app.use(express.json());

app.post('/sp101' , async(req,res)=>{
    try {
        console.log(req.body);
        const {email , data , status} = req.body;
        let query = await pool.query(
            "insert into sp101 (email , data , status) VALUES ($1,$2,$3) returning *",
            [email , data , status]
        )
        res.json({comment:'form submitted'});
    } catch (err) {
        console.log(err);
    }
})

app.post('/users' , async(req,res)=>{
    try {
        console.log(req.body);
        const { email , name } = req.body;
        let query = await pool.query(
            "Select email from users where email = $1" , [email]
        )
        if(query.rowCount == 0) query = await pool.query(
            "INSERT into users (name , email) VALUES ($1 , $2 ) returning *",
            [name , email]
        );
        res.json({comment:'user data updated / added'});
    } catch (error) {
        res.status(404).json(error);
    }
})


module.exports = {app};