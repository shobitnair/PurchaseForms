import React  , {useState}from 'react';
import {Grid, GridItem, Stack, Text} from "@chakra-ui/react";
import {DefaultButton, Depths, TextField} from "@fluentui/react";
import {useNavigate, useParams} from "react-router-dom"
import { updateAccountant } from '../Requests/formRequests';

const Budget = (props) => {
    const [data , setData] = useState({
        amount:null,
        bs:null,
        ba:null,
        bb:null,
        bh:null,
        balb:null
    })
    const param = useParams()
    const nav = useNavigate()

    const onSubmit = async() =>{
        await updateAccountant(param.id , data);
        nav('/site/admin/forms')
    }

    return (
        <div>
            <Grid templateColumns='repeat(12,1fr)' templateRows='repeat(12,1fr)' w='100%'  h='600px' gap={4} bg={'whiteAlpha.300'}>
                <GridItem rowSpan={1} colSpan={3} ml={4} mt={4} style={{'alignItems':'center'}}>
                    <Text className='Header' as='b' w="100%"> Enter the Budget Informations </Text>
                </GridItem>
                <GridItem colStart={1} rowSpan = {11} colSpan={3} ml={4}>
                    <div style={{'border': '8px solid #f3f2f1' ,padding:'10px' , backgroundColor:'#f3f2f1', borderRadius: '2px', boxShadow: Depths.depth4 }}>
                        <Stack>
                            <TextField label={"Amount in Rs."}
                            onChange={(e) => setData({ ...data , amount:e.target.value})}/ >
                            <TextField label={"Budget Sanctioned"} 
                            onChange={(e) => setData({ ...data , bs:e.target.value})}/>
                            <TextField label={"Budget Available"} 
                            onChange={(e) => setData({ ...data , ba:e.target.value})}/>
                            <TextField label={"Budget Booked"} 
                            onChange={(e) => setData({ ...data , bb:e.target.value})}/>
                            <TextField label={"Budget Head"} 
                            onChange={(e) => setData({ ...data , bh:e.target.value})}/>
                            <TextField label={"Balance Budget"} 
                            onChange={(e) => setData({ ...data , balb:e.target.value})}/>
                        </Stack>
                        <Stack style={{'alignItems':'center' , 'marginTop':'20px'}}>
                            <DefaultButton style={{'width':'200px'}} onClick={()=>onSubmit()}>Submit</DefaultButton>
                        </Stack>
                    </div>
                </GridItem>
            </Grid>
        </div>
    );
}

export default Budget;