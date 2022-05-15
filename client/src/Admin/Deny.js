import React  , {useState}from 'react';
import {Grid, GridItem, Stack, Text} from "@chakra-ui/react";
import {DefaultButton, Depths, TextField} from "@fluentui/react";
import {useNavigate, useParams} from "react-router-dom"
import { addActivities, addNotifications, denyForm, getEmailbyROLE, getFormById } from '../Requests/formRequests';
const Deny = (props) => {
    const [message , setMessage] = useState('')
    const param = useParams()
    const nav = useNavigate()

    const onSubmit = async() =>{
        const res = await getFormById(param.id);
        await addNotifications(res.email , 'Purchase form with ID : '+param.id+' was denied by '+role+' on ','error' , 'Your Purchase form was denied')
        if(role === 'HOD'){
            await addActivities(user.email , 'You denied a purchase form with ID : '+param.id+' on ' ,'info','Denied a purchase form' )
        }   
        if(role === 'JAO'){
            await addActivities(user.email , 'You denied a purchase form with ID : '+param.id+' on ' ,'info','Denied a purchase form' )
            const ao = await getEmailbyROLE('AO');
            const ar = await getEmailbyROLE('AR');
            await addNotifications(ao.email , 'Purchase form with ID : '+param.id +' was denied by JAO','warning','A Purchase form was denied')
            await addNotifications(ar.email , 'Purchase form with ID : '+param.id +' was denied by JAO','warning','A Purchase form was denied')
        } 
        if(role === 'AO'){
            await addActivities(user.email , 'You denied a purchase form with ID : '+param.id+' on ' ,'info','Denied a purchase form' )
            const ar = await getEmailbyROLE('AR');
            await addNotifications(ar.email , 'Purchase form with ID : '+param.id +' was denied by AO','warning','A Purchase form was denied')
        }
        if(role === 'AR'){
            await addActivities(user.email , 'You denied a purchase form with ID : '+param.id+' on ' ,'info','Denied a purchase form' )
        }
        await denyForm(param.id , param.role , message)
        nav('/site/admin/activity')
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