import React  , {useContext, useEffect, useState}from 'react';
import {Grid, GridItem, Stack, Text, useToast} from "@chakra-ui/react";
import {DefaultButton, Depths, TextField} from "@fluentui/react";
import {useNavigate, useParams} from "react-router-dom"
import { PDFsp101 } from '../Forms/PDFsp101';
import { PDFbyID } from '../Forms/PDFHandler';
import { acceptForm, addNotifications , getFormById , addActivities, getEmailbyROLE } from '../Requests/formRequests';
import { LoginContext } from '../Login/LoginContext';

const Accept = (props) => {
    const [message , setMessage] = useState('')
    const param = useParams()
    const nav = useNavigate()
    const toast = useToast()
    const {user , role} = useContext(LoginContext)

    const onSubmit = async() =>{
        
        const res = await getFormById(param.id);
        if(role === 'HOD'){
            if(res.type==='sp101' || (res.hod_com === true && res.committee===3)){
            await addActivities(user.email , 'You approved purchase form with ID : '+param.id+' on ' ,'success','Approved a purchase form',param.id )
            await addNotifications(res.email , 'Your Purchase form with ID : '+param.id+' has been approved by the HOD on ','info' , 'Status Update',param.id)
            const jao= await getEmailbyROLE('JAO');
            await addNotifications(jao.email,'A new form with ID: '+param.id+' received on', 'info', 'New form was added', param.id);
            }
            else{
                
                await addActivities(user.email , 'You approved purchase form with ID : '+param.id+' on ' ,'success','Approved a purchase form',param.id )
                await addNotifications(res.email , 'Your Purchase form with ID : '+param.id+' has been approved by the HOD on ','partA' , 'Status Update',param.id)
                
            }
        }
        if(role === 'AO'){
            await addActivities(user.email , 'You approved a purchase form with ID : '+param.id+' on ' ,'success','Approved a purchase form',param.id )
            await addNotifications(res.email , 'Your Purchase form with ID : '+param.id+' has been approved by the AO on ','info' , 'Status Update',param.id)
            const ar= await getEmailbyROLE('AR');
            await addNotifications(ar.email,'A new form with ID: '+param.id+' received on', 'info', 'New form was added', param.id);

        }
        if(role === 'AR'){
            await addActivities(user.email , 'You approved a purchase form with ID : '+param.id+' on ' ,'success','Approved a purchase form',param.id )
            await addNotifications(res.email , 'Your Purchase form with ID : '+param.id+' has been approved by the AR on ','success' , 'Purchase form approved',param.id)
        }
        const response = await acceptForm(param.id , param.role);
        toast({
            title: 'Form Approved',
            status: 'success',
            duration: 3000,
            isClosable: true,
        })
        nav('/site/admin/activity')
    }

    useEffect(() => {
        if(user && role){

        }
    } , [user , role])

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