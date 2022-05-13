import React, { useEffect , useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getFormById } from '../Requests/formRequests';
import { Text , Button } from '@chakra-ui/react';

const Response = () => {
    let params = useParams();
    const nav = useNavigate();
    const [form, setForm] = useState({})
    const [flag , setFlag] = useState(true);
    useEffect(async()=>{
        if(flag){
            let data = await getFormById(params.id)
            data.data = JSON.parse(data.data);
            setForm(data);
            setFlag(false);
        }
    } , [form , flag])
    return (
        <div>
            <Text>Message : {form.message}</Text>
            <Text>Status : {form.status}</Text>
            <Button onClick={()=> nav('/site/forms/sp101/resubmit/'+params.id)}>Resubmit ?</Button>
        </div>
    )
}

export default Response