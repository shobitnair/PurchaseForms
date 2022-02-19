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

//create a todo
app.post("/todos", async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT into todo (description) VALUES ($1) returning *",
            [description]
        );
        res.json(newTodo);

    } catch (error) {
        return res.status(404).json(error);
    }
})



//get all
app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query(
            "select * from todo"
        )
        res.json(allTodos.rows);
    } catch (error) {
        return res.status(404).json(error);
    }
})


//get a
app.get("/todos/:id", async (req, res) => {
    try {
        const allTodos = await pool.query(
            "select * from todo where todo_id != $1",
            [req.params.id]
        )
        res.json(allTodos.rows);
    } catch (error) {
        return res.status(404).json(error);
    }
})


//update 
app.put("/todos/:id" , async(req,res)=>{
    try {
        const {id} = req.params;
        const {description} = req.body;
        const updated = await pool.query(
            "update todo set description = $1 where todo_id = $2",
            [description , id]
        )
        return res.json(updated)
    } catch (error) {
        return res.status(404).json(error);
    }
})

//delete 
app.delete("/todos/:id" , async(req,res)=>{
    try {
        const {id} = req.params;
        const deleted = await pool.query(
            "delete from todo where todo_id = $1",
            [id]
        );
        return res.json(deleted);
    } catch (error) {
        return res.status(404).json(error);
    }
})

module.exports = { app };