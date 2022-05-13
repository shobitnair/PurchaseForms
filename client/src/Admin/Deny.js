import React  , {useState}from 'react';
import {Grid, GridItem, Stack, Text} from "@chakra-ui/react";
import {DefaultButton, Depths, TextField} from "@fluentui/react";
import {useNavigate, useParams} from "react-router-dom"
import { denyForm } from '../Requests/formRequests';
const Deny = (props) => {
    const [message , setMessage] = useState('')
    const param = useParams()
    const nav = useNavigate()

    const onSubmit = async() =>{
        await denyForm(param.id , param.role , message)
        nav('/site/admin/forms')
    }

    return (
        <div>
            <Grid templateColumns='repeat(12,1fr)' templateRows='repeat(12,1fr)' w='100%'  h='600px' gap={4} bg={'whiteAlpha.300'}>
                <GridItem rowSpan={1} colSpan={3} ml={4} mt={4} style={{'alignItems':'center'}}>
                    <Text className='Header' as='b' w="100%"> Details for the denial of the purchase form </Text>
                </GridItem>
                <GridItem colStart={1} rowSpan = {11} colSpan={3} ml={4}>
                    <div style={{'border': '8px solid #f3f2f1' ,padding:'10px' , backgroundColor:'#f3f2f1', borderRadius: '2px', boxShadow: Depths.depth4 }}>
                        <Stack>
                            <TextField label={"Message"} multiline rows={4} 
                            onChange={(e) => setMessage(e.target.value)}/ >
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

export default Deny;