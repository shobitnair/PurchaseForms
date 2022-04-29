
import React  , {useState, useContext, useEffect} from 'react';
import {Grid, GridItem, Stack, Text} from "@chakra-ui/react";
import {DefaultButton, Depths, TextField} from "@fluentui/react";
import {useNavigate, useParams} from "react-router-dom"
import { LoginContext } from '../Login/LoginContext';
import { getProfileDetails, updateProfileDetails } from '../Requests/formRequests';
import { useToast } from '@chakra-ui/react'

const Profile = () => {
    
    const nav = useNavigate();
    const {user , role} = useContext(LoginContext);
    const toast = useToast()

    const[data,setData] = useState({
        name:null,
        department:null,
        signature:null,
        email:null,
    });



    useEffect(async()=>{
        if(user && role){
            const response = await getProfileDetails(user.email);
            console.log(response);
            setData({...data,
                name:response.name,
                department:response.department,
                signature:response.signature,
                email:user.email,
            });
        }
    
    },[user,role]);
   
    
    const onSubmit = async() => {
        await updateProfileDetails(data);
        toast({
            title: 'Profile Updated',
            status: 'success',
            duration: 1000,
            isClosable: true,
        })
    };

    return(
        <div>
            <Grid templateColumns='repeat(12,1fr)' templateRows='repeat(12,1fr)' w='100%'  h='600px' gap={4} bg={'whiteAlpha.300'}>
                <GridItem rowSpan={1} colSpan={3} ml={4} mt={4} style={{'alignItems':'center'}}>
                    <Text className='Header' as='b' w="100%"> Manage Profile Details </Text>
                </GridItem>
                <GridItem colStart={1} rowSpan = {11} colSpan={3} ml={4}>
                    <div style={{'border': '8px solid #f3f2f1' ,    padding:'10px' , backgroundColor:'#f3f2f1', borderRadius: '2px', boxShadow: Depths.depth4 }}>
                        <Stack>
                            <TextField label={"Name"} value = {data.name}
                            onChange={(e) => setData({ ...data , name:e.target.value})}/ >
                            <TextField label={"Department"} value ={data.department}
                            onChange={(e) => setData({ ...data , department:e.target.value})}/>
                            <TextField label={"Signature"} value ={data.signature}
                            onChange={(e) => setData({ ...data , signature:e.target.value})}/>                            
                        </Stack>

                        <Stack style={{'alignItems':'center' , 'marginTop':'20px'}}>
                            <DefaultButton style={{'width':'100px'}} onClick={()=>onSubmit()}>Submit</DefaultButton>
                        </Stack>
                    </div>
                </GridItem>
            </Grid>
        </div>
    );
}

export default Profile;
