
import React  , {useState, useContext, useEffect} from 'react';
import {Grid, GridItem, Stack, Text} from "@chakra-ui/react";
import {DefaultButton, Depths, TextField , Dropdown , DropdownMenuItemType} from "@fluentui/react";
import {useNavigate, useParams} from "react-router-dom"
import { LoginContext } from '../Login/LoginContext';
import { getProfileDetails, updateProfileDetails } from '../Requests/formRequests';
import { useToast } from '@chakra-ui/react'

const option5 = [
    { key: 'header1' , text:'Engineering',itemType: DropdownMenuItemType.Header },
    { key: 'A', text: 'BioMedical' },
    { key: 'B', text: 'Chemical' },
    { key: 'C', text: 'Civil' },
    { key: 'D', text: 'Computer Science'},
    { key: 'E', text: 'Electrical' },
    { key: 'F', text: 'Mechanical' },
    { key: 'G', text: 'Metallurigical and Materials' },
    { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
    { key: 'header2' , text:'Science & Humanities',itemType: DropdownMenuItemType.Header },
    { key: 'H', text: 'Chemistry' },
    { key: 'I', text: 'Physics' },
    { key: 'J', text: 'Mathematics' },
    { key:'K' , text: 'Humanities'}
]


const findKey = (options , value) =>{
    if(value){
        return options.filter(x => x.text === value)[0].key;
    } else return 'NULL_KEY'
}

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


    const [fv , Sfv] = useState(0)
    useEffect(async()=>{
        if(user && role){
            if(fv === 0){
                const response = await getProfileDetails(user.email);
                setData({...data,
                    name:response.name,
                    department:response.department,
                    signature:response.signature,
                    email:user.email,
                });
                Sfv(1)
            } else {

            }
        } else {
            setData({})
            Sfv(0)
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
                <GridItem rowSpan={1} colSpan={12} ml={4} mt={4} style={{'alignItems':'center'}}>
                    <Text className='Header' as='b' w="100%"> Manage Profile Details </Text>
                </GridItem>
                <GridItem colStart={1} rowSpan = {11} colSpan={12} ml={2} mr={2}>
                    {fv === 1 && <div style={{'border': '8px solid #f3f2f1' ,    padding:'10px' , backgroundColor:'#f3f2f1', borderRadius: '2px', boxShadow: Depths.depth4 }}>
                        <Stack>
                            <TextField label={"Name"} value = {data.name}
                            onChange={(e) => setData({ ...data , name:e.target.value})}/ >
                            
                            <Dropdown placeholder="Select an Option" options={option5} label="Department" 
                                defaultSelectedKey = {findKey(option5,data.department)}
                                onChange={(e, i) => setData({ ...data, department: i.text })} />

                            <TextField label={"Signature"} value ={data.signature}
                            onChange={(e) => setData({ ...data , signature:e.target.value})}/>                            
                        </Stack>

                        <Stack style={{'alignItems':'center' , 'marginTop':'20px'}}>
                            <DefaultButton style={{'width':'100px'}} onClick={()=>onSubmit()}>Submit</DefaultButton>
                        </Stack>
                    </div>}
                </GridItem>
            </Grid>
        </div>
    );
}

export default Profile;
