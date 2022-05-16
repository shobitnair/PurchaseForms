import React from 'react';
import {PDFsp101} from "./PDFsp101";
import { PDFsp102 } from './PDFsp102';
import {getEmailbyROLE, getFile, getFileURL, getFormById, getHOD, getProfileDetails } from '../Requests/formRequests';

export const PDFHandler = (form , data , budget , meta) =>{
    if(form === 'sp101')PDFsp101(data , budget , meta)
    if(form === 'sp102')PDFsp102(data , budget , meta)
}

export const PDFbyID = async (id) => {
    const response = await getFormById(id)
    const department = (await getProfileDetails(response.email)).department
    const signInt = await getFileURL((await getProfileDetails(response.email)).signature)
    const signJAO = await getFileURL((await getEmailbyROLE('JAO')).signature);
    const signAO = await getFileURL((await getEmailbyROLE('AO')).signature);
    const signAR = await getFileURL((await getEmailbyROLE('AR')).signature);
    const signHOD = await getFileURL((await getHOD(department)).signature);
    const okJAO = response.jao;
    const okAO = response.ao;
    const okAR = response.ar;
    const okHOD = response.hod;
    const budget = (response.jao)?JSON.parse(response.budget) : {
        bs:'',
        ba:'',
        bb:'',
        bh:'',
        balb:''
    }
    
    if(response.type === 'sp101'){
        PDFHandler(response.type , JSON.parse(response.data), budget , {
            signInt , signJAO , signAO , signAR , signHOD , okJAO , okAO , okAR , okHOD
        })
    } 
    if(response.type === 'sp102'){
        
    }

    //PDFHandler(response.type , JSON.parse(response.data) , budget ,  )
}

