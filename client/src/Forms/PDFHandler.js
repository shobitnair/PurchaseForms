import React from 'react';
import {PDFsp101} from "./PDFsp101";
import {URL} from "../cred"
import axios from "axios";

export const PDFHandler = (form , data) =>{
    if(form === 'sp101')PDFsp101(data)
}

export const PDFbyID = async (id) => {
    const response = await axios.get(URL + '/forms/' + id)
    PDFHandler(response.data.type , JSON.parse(response.data.data))
}