import React from 'react';
import {PDFsp101} from "./PDFsp101";
import { PDFsp102 } from './PDFsp102';
import { getDraftById, getFormById } from '../Requests/formRequests';

export const PDFHandler = (form , data) =>{
    if(form === 'sp101')PDFsp101(data,null)
    if(form==='sp102')PDFsp102(data,null)
}

export const PDFbyID = async (id) => {
    const response = await getFormById(id)
    PDFHandler(response.type , JSON.parse(response.data))
}

export const DraftByID = async(id , email) =>{
    const response = await getDraftById(id , email)
    PDFHandler(response.type , JSON.parse(response.data))
}