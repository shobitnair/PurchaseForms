import React, { useContext, useEffect, useState } from 'react'
import { LoginContext } from '../Login/LoginContext'
import axios from 'axios';
import { URL } from '../cred';
import {
    Label,
    Stack,
    Depths,
    StackItem,
    DefaultButton,
    PrimaryButton,
    Separator,
    Icon,
    IconButton
} from '@fluentui/react';


const column1 = {
    tokens: { childrenGap: 10 },
    styles: { root: { width: "50%", padding: "20px" , height:'600px' } },
};
const column2 = {
    tokens: { childrenGap: 10 },
    styles: { root: { width: "50%", padding: "20px"  , height:'600px'} },
};
const stackTokens = { childrenGap: 30 };
const stackStyles = {
    root: {
        width: "80%",
        margin: 10,
        boxShadow: Depths.depth8,
        backgroundColor: '#edebe9',
        borderRadius: 20
    }
};
const columnProps = {
    tokens: { childrenGap: 15 },
    styles: { root: { width: "100%", padding: 5 } },
};

const SubmittedForms = () => {

    const { user } = useContext(LoginContext)
    const [forms, setForms] = useState([]);
    const [approved , setApproved] = useState([]);
    const getSubmittedForms = async () => {
        try {
            const res = await axios.get(URL + '/forms/' + user.email);
            for(let i  = 0  ; i<res.data.length ; i++){
                if(res.data[i].status == 'pending')setForms(forms => [...forms, res.data[i]]);
                else setApproved(approved => [...approved, res.data[i]])
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (user) {
            getSubmittedForms();
        }
        else {
            setForms([]);
            setApproved([]);
        }
    }, [user])

    const formItem = (x) => {
        const data = JSON.parse(x.data);
        return (
            <div>
                <Stack horizontal tokens={{childrenGap:20}} styles={{root:{
                        backgroundColor: '#faf9f8',
                        padding: 5,
                        boxShadow:Depths.depth4
                }}}>
                    <Stack column style={{margin:20 , width:'50%'}}>
                        <Label>PurchaseForm ID : {x.id} </Label>
                        <Label>Form Type : {x.type}</Label>
                        <Label>Budget Head : {data.budgetHead}</Label>
                        <Label>Number of Items : {data.items.length}</Label>
                        <Label>status : {x.status} </Label>
                    </Stack>
                    <Separator column vertical />
                    <Stack column styles={{root:{margin:20 }}} tokens={{childrenGap:15}}>
                        <DefaultButton text="Edit" style={{ width:'130px' ,boxShadow: Depths.depth4 }} />
                        <PrimaryButton text="Delete" style={{ 'backgroundColor': '#4C4A48', boxShadow: Depths.depth4}} />
                    </Stack>
                </Stack>

            </div>
        )
    }

    return (
        <Stack horizontal tokens={stackTokens} styles={stackStyles}>
            <Stack {...column1} >
                <Label style={{ fontSize: 20, marginLeft: 10 }}>Submitted</Label>
                <Stack tokens={{childrenGap:10}} style={{overflow:'scroll'}}>
                        {forms.map(x => {
                            return formItem(x);
                        })}
                </Stack>
            </Stack>  

            <Stack {...column2} >
                <Stack horizontal tokens={{childrenGap:25}}>
                <Label style={{ fontSize: 20, marginLeft: 10 }}>Approved</Label>
                </Stack>
                <Stack tokens={{childrenGap:10}} style={{overflow:'scroll'}}>
                        {approved.map(x => {
                            return formItem(x);
                        })}
                </Stack>
            </Stack>
        </Stack>
    )
}

export default SubmittedForms