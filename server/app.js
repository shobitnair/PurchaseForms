const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const knex = require('knex');
const multer = require('multer');
const { pool } = require('./db');
const { fileURLToPath } = require('url');
const fs = require("fs")
const {promisify} = require("util")
const pipeline = promisify(require("stream").pipeline)

//const {sq}  = require('./sqlite')

const app = express();

//middlewares
app.use(cors({
    origin: [
        'http://localhost:8000',
        'http://localhost:8000/*',
        'http://localhost:80',
        'http://localhost:80/*', ,
        'http://localhost:3000/*',
        'http://localhost:3000',
        'http://65.0.131.63/*',
        'http://65.0.131.63',
        'http://pf-iitrpr.eastasia.cloudapp.azure.com',
        'http://pf-iitrpr.eastasia.cloudapp.azure.com/*'
    ]
}))
app.use(express.json());



//Build 
app.use(express.static("../client/build"));
app.get('/site*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'))
})



app.get('/api/admin/forms', async (req, res) => {
    /*
    sq.all('select * from forms' , [] , (err,row)=>{
        if(err)return res.status(404).json(err);
        return res.json(row);
    })
    */
    try {
        let query = await pool.query('select * from forms');
        res.json(query.rows);
    } catch (error) {
        res.status(404).json(error);
    }
})

app.get('/api/ao/forms', async (req, res) => {
    try {
        let query = await pool.query('select * from forms where "Accountant" = true');
        res.json(query.rows);
    } catch (error) {
        res.status(404).json(error);
    }
})

app.get('/api/accounts/forms', async (req, res) => {
    try {
        let query = await pool.query('select * from forms where ao = true');
        res.json(query.rows);
    } catch (error) {
        res.status(404).json(error);
    }
})




app.post('/api/admin/forms/deny', async (req, res) => {
    try {
        const { id, data } = req.body;
        let query = await pool.query('update forms set status = $1 , "Message" = $2 where id = $3', ['denied', data, id])
        res.json(query)
    } catch (e) {
        res.status(400).json(e);
    }
})

app.post('/api/accountant/forms/budget', async (req, res) => {
    try {
        const { id, data } = req.body;
        console.log(id, data)
        let query = await pool.query('update forms set "Accountant" = $1 , "Budget" = $2 where id = $3',
            [true, data, id]);
        res.json(query)
    } catch (err) {
        res.status(404).json(err)
    }
})

app.get('/api/form/:id', async (req, res) => {
    try {
        let query = await pool.query('select * from forms where id = $1', [req.params.id])
        res.json(query.rows[0])
    } catch (error) {
        res.status(404).json(error);
    }
})

app.get('/api/forms/:email', async (req, res) => {
    try {
        let query = await pool.query('select * from forms where email = $1 order by id desc', [req.params.email])
        res.json(query.rows);
    } catch (error) {
        res.status(404).json(error)
    }
})

app.get('/api/users/:email', async (req, res) => {
    try {
        let query = await pool.query('select * from users where email = $1', [req.params.email]);
        res.json(query.rows);
    } catch (error) {
        res.status(404).json(error)
    }
})

app.post('/api/forms', async (req, res) => {
    try {
        const { type, email, data, status } = req.body;
        let mx = await pool.query('select max(id) from forms');
        const id = (mx.rows[0].max) ? mx.rows[0].max + 1 : 1;
        let query = await pool.query(
            `insert into forms (id,type,email , data , status) VALUES ($1,$2,$3,$4) returning *`,
            [id, type, email, data, status]
        )
        res.json({ comment: 'form submitted with PurchaseForm ID ' + id });
    } catch (err) {
        res.status(404).json(err);
    }
})

app.post('/api/forms/update', async (req, res) => {
    try {
        const { id, data, status } = req.body;
        let query = await pool.query(
            "update forms set status = $1 , data = $2 where id = $3 returning *"
            , [status, data, id]
        )
        res.json({ comment: 'form submitted with PurchaseForm ID ' + query.rows[0].id });
    } catch (err) {
        res.status(400).json(err);
    }
})

app.get('/api/draft/:email/:id', async (req, res) => {
    try {
        const { email, id } = req.params;
        const table_suffix = email.split('@')[0]
        query = await pool.query(
            `select * from draft_${table_suffix} where id = $1`
            , [id]);
        res.json(query.rows[0]);
    } catch (err) {
        res.status(404).json(err);
    }
})

app.get('/api/drafts/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const table_suffix = email.split('@')[0]
        query = await pool.query(`select * from draft_${table_suffix} order by last_updated desc`);
        res.json(query.rows);
    } catch (err) {
        res.status(404).json(err);
    }
})

app.post('/api/drafts', async (req, res) => {
    try {
        const { email, data, type } = req.body;
        const table_suffix = email.split('@')[0]
        let mx = await pool.query(`select max(id) from draft_${table_suffix}`)
        const id = (mx.rows[0].max) ? mx.rows[0].max + 1 : 1;
        let query = await pool.query(
            `insert into draft_${table_suffix} (id , data , type , last_updated) values ($1,$2,$3,$4) returning *`
            , [id, data, type, new Date()])
        res.json(query.rows[0])
    } catch (err) {
        res.status(404).json(err);
    }
})

app.post('/api/drafts/delete', async (req, res) => {
    try {
        const { email, id } = req.body;
        const table_suffix = email.split('@')[0]
        await pool.query(
            `delete from draft_${table_suffix} where id = $1`
            , [id])
        res.json({ comment: 'draft deleted' })

    } catch (err) {
        res.status(404).json(err);
    }
})

app.post('/api/drafts/update', async (req, res) => {
    try {
        const { email, id, data } = req.body;
        const table_suffix = email.split('@')[0]
        await pool.query(
            `update draft_${table_suffix} set data = $1 , last_updated=$2 where id = $3`
            , [data, new Date(), id])
        res.json({ comment: 'draft updated' })

    } catch (err) {
        res.status(404).json(err);
    }
})

app.post('/api/users', async (req, res) => {
    try {
        console.log(req.body);
        const { email, name } = req.body;

        // find the user from the database.
        let query = await pool.query(
            "Select email from users where email = $1", [email]
        )

        // If user does not exist in database then create user and draft tables.
        if (query.rowCount == 0) {
            query = await pool.query(
                "INSERT into users (name , email , role) VALUES ($1 , $2  , $3) returning *",
                [name, email, 'FACULTY']
            );
        }
        const table_suffix = email.split('@')[0]
        query = await pool.query("create table if not exists draft_" + table_suffix +
            "(\n" +
            "    id   serial,\n" +
            "    type varchar not null,\n" +
            "    data text    not null,\n" +
            "    last_updated timestamp not null\n" +
            ");\n" +
            "\n" +
            "alter table draft_" + table_suffix +
            "    owner to postgres;")

        res.json({ comment: 'user data updated / added' })
    } catch (error) {
        console.log(error)
        res.status(404).json(error);
    }
})


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + file.originalname)
    }
})
  
const upload = multer({ storage: storage })

app.post('/api/upload',upload.array("file" , 100) ,  async (req, res) => {
    try {
        console.log(req.files)
        res.json({
            status: true,
            message: "File was uploaded successfuly",
        });
    } catch (error) {
        res.status(404).json(error);
    }
})

module.exports = { app };