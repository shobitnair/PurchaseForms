const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const { pool } = require('./db');

const pg = express();


//middlewares
pg.use(cors({
    origin: [
        '*' ,
        'http://localhost:80/*' , 
        'http://localhost:80' , 
        'http://localhost:3000/*' , 
        'http://localhost:3000' ,
        'http://65.0.131.63/*',
        'http://65.0.131.63',
    ]
}))
pg.use(express.json());

//create a todo
pg.post("/todos", async (req, res) => {
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
pg.get("/todos", async (req, res) => {
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
pg.get("/todos/:id", async (req, res) => {
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
pg.put("/todos/:id" , async(req,res)=>{
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
pg.delete("/todos/:id" , async(req,res)=>{
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

module.exports = { pg };