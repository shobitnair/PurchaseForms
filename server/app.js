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



app.get('/admin/forms' , async(req, res) =>{
    try {
        let query = await pool.query('select * from forms');
        res.json(query.rows);
    } catch (error) {
        res.status(404).json(error);
    }
})

app.post('/admin/forms/deny' , async(req,res) =>{
    try{
        const {id , message} = req.body;
        let query = await pool.query('update forms set status = $1 , admin_msg = $2 where id = $3' , ['denied',message,id])
        console.log(query)
    } catch (e) {
        res.status(404).json(e);
    }
})

app.get('/forms/:email' , async(req,res) =>{
    try {
        let query = await pool.query('select * from forms where email = $1 order by id desc'  , [req.params.email])
        res.json(query.rows);
    } catch (error) {
        res.status(404).json(error)
    }
})


app.get('/users/:email' , async(req,res) =>{
    try{
        let query = await pool.query('select * from users where email = $1' , [req.params.email]);
        res.json(query.rows);
    } catch (error) {
        res.status(404).json(error)
    }
})


app.post('/forms' , async(req,res)=>{
    try {
        const {type , email , data , status} = req.body;
        let query = await pool.query(
            `insert into forms (type,email , data , status) VALUES ($1,$2,$3,$4) returning *`,
            [type,email , data , status]
        )
        res.json({comment:'form submitted with PurchaseForm ID '+ query.rows[0].id});
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