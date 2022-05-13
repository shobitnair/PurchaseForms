import React  , {useEffect, useState}from 'react';
import {Grid, GridItem, Stack, Text, useToast} from "@chakra-ui/react";
import {DefaultButton, Depths, TextField} from "@fluentui/react";
import {useNavigate, useParams} from "react-router-dom"
import { PDFsp101 } from '../Forms/PDFsp101';
import { PDFbyID } from '../Forms/PDFHandler';
import { acceptForm } from '../Requests/formRequests';

const Accept = (props) => {
    const [message , setMessage] = useState('')
    const param = useParams()
    const nav = useNavigate()
    const toast = useToast()

    const onSubmit = async() =>{
        const response = await acceptForm(param.id , param.role);
        toast({
            title: 'Form Approved',
            status: 'success',
            duration: 4000,
            isClosable: true,
        })
        nav('/site/admin/forms')
    }

    useEffect(() => {

    } , [])

    return (
        <div>
            <Grid templateColumns='repeat(12,1fr)' templateRows='repeat(12,1fr)' w='100%'  h='600px' gap={4} bg={'whiteAlpha.300'}>
                <GridItem rowSpan={1} colSpan={3} ml={4} mt={4} style={{'alignItems':'center'}}>
                    <Text className='Header' as='b' w="100%"> Confirm your acceptance </Text>
                </GridItem>
                <GridItem colStart={1} rowSpan = {11} colSpan={3} ml={4}>
                    <div style={{'border': '8px solid #f3f2f1' ,padding:'10px' , backgroundColor:'#f3f2f1', borderRadius: '2px', boxShadow: Depths.depth4 }}>
                        <Stack style={{'alignItems':'center' , 'marginTop':'20px'}}>
                            <DefaultButton style={{'width':'200px'}} onClick={()=>PDFbyID(param.id)}>View</DefaultButton>
                            <DefaultButton style={{'width':'200px'}} onClick={()=>onSubmit()}>Confirm</DefaultButton>
                            <DefaultButton style={{'width':'200px'}} onClick={()=>nav('/site/admin/forms')}>Cancel</DefaultButton>
                        </Stack>
                    </div>
                </GridItem>
            </Grid>
        </div>
    );
}

export default Accept;