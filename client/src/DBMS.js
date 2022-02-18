import React, { useEffect, useState } from 'react'
import axios from 'axios'

let url = "http://localhost:8000/todos"

const DBMS = () => {

    const [s, ss] = useState('');
    const [d, dd] = useState([]);
    const [f, sf] = useState(0);

    const postdata = async () => {
        try {
            const res = await axios.post(url, {description:s});
            console.log(res);
            getdata();
        }
        catch (err) {
            console.log(err);
        }
    }

    const getdata = async () => {
        try {
            const res = await axios.get(url)
            dd(res.data);
        }
        catch (err) {
            console.log(err);
        }
    }

    const deletedata = async (id) => {
        try {
            const response = await fetch(`${url}/${id}`, {
                method: "delete"
            })
            getdata();
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    const updatedata = async (id) => {
        try {
            const response = await fetch(`${url}/${id}`, {
                method: "put",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ description: s })
            })
            getdata();
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    const updatedataAXIOS = async (id) => {
        try {
            const response = await axios.put(`${url}/${id}`, {description:s})
            getdata();
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getdata();
    }, [])

    return (
        <div>
            <textarea value={s} onChange={(e) => ss(e.target.value)}></textarea>
            <button onClick={postdata}>Submit</button>
            {
                d.map(x => (
                    <>
                        <br />
                        <button key={x.todo_id}
                            onClick={(s === '') ? 
                            () => deletedata(x.todo_id) : 
                            () => updatedataAXIOS(x.todo_id)}>{x.description}</button>
                    </>
                ))
            }
        </div>
    )
}

export default DBMS