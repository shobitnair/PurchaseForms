import React from 'react';
import {PDFsp101} from "./PDFsp101";

export const PDFHandler = (form , data) =>{
    switch (form){
        case 'sp101' :
            return ()=>PDFsp101(data)
    }
}