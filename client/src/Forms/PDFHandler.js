import React from 'react';
import {PDFsp101} from "./PDFsp101";
import { PDFsp102 } from './PDFsp102';
import {getFormById, getProfileDetails } from '../Requests/formRequests';

export const PDFHandler = (form , data) =>{
    if(form === 'sp101')PDFsp101(data)
    if(form === 'sp102')PDFsp102(data)
}

export const PDFbyID = async (id) => {
    const response = await getFormById(id)
    const signJAO = await getProfileDetails()
    if(response.type === 'sp101'){
        let budget = (response.budget)?response.budget : {
            bs:'',
            ba:'',
            bb:'',
            bh:'',
            balb:''
        }
    }
    PDFHandler(response.type , JSON.parse(response.data))
}

