import React, { useContext, useEffect, useState } from 'react'
import { LoginContext } from '../Login/LoginContext'
import axios from 'axios';
import { URL } from '../cred';
import {
    Label,
    Stack,
    Depths,
} from '@fluentui/react';
import { Grid, GridItem , Button , Badge  } from '@chakra-ui/react'
import {PDFHandler} from "./PDFHandler";


const SubmittedForms = () => {

    const { user } = useContext(LoginContext)
    const [forms, setForms] = useState([]);
    const [approved , setApproved] = useState([]);
    const [denied , setDenied] = useState([])
    
    const getSubmittedForms = async () => {
        setForms([]);
        setApproved([]);
        setDenied([]);
        try {
            const res = await axios.get(URL + '/forms/' + user.email);
            for(let i  = 0  ; i<res.data.length ; i++){
                if(res.data[i].status === 'pending')setForms(forms => [...forms, res.data[i]]);
                else if(res.data[i].status === 'approved')setApproved(approved => [...approved, res.data[i]])
                else if(res.data[i].status === 'denied')setDenied(denied => [...denied, res.data[i]])
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(async () => {
        if (user) {
            await getSubmittedForms();
        } else {
            setForms([]);
            setApproved([]);
        }
    }, [user])

    const formItem = (x) => {
        const data = JSON.parse(x.data);
        return (
            <div key = {x.id}>
                <Grid   w='100%' h='170px'
                    templateRows='repeat(4,1fr)' templateColumns='repeat(3,1fr)' 
                    gap={4}
                    bg='#faf9f8'
                    style={{padding: 5, borderRadius:5 , boxShadow:Depths.depth4}}
                >
                    <GridItem rowSpan={4} colSpan={2} >
                        <Stack style={{margin:10}}  tokens={{childrenGap:5}}>
                            <Badge variant='outline' colorScheme='gray' fontSize={17} >Form ID : {x.id} </Badge>
                            <Badge >Form Type : {x.type}</Badge>
                            <Badge >Budget Head : {data.budgetHead}</Badge>
                            <Badge >Number of Items : {data.items.length}</Badge>
                            {x.status==='pending' && <Badge fontSize={17} colorScheme={'blue'}>{x.status} </Badge>}
                            {x.status==='approved' && <Badge fontSize={17} colorScheme={'green'}>{x.status} </Badge>}
                            {x.status==='denied' && <Badge fontSize={17} colorScheme={'red'}>{x.status} </Badge>}
                        </Stack>
                    </GridItem>
                    <GridItem style={{margin:10}}  rowSpan={4} colSpan={1}>
                        <Stack tokens={{childrenGap:5}}>
                        <Button boxShadow='lg' colorScheme={'teal'} h='35px' w='100px' color='white'
                            onClick = {PDFHandler(x.type , data)}>
                            View</Button>
                        <Button boxShadow='lg' bg='#d13438' colorScheme={'red'} h='35px' w='100px' color='white'>Delete</Button>
                            {x.status === 'denied' &&
                                <Button boxShadow='lg' colorScheme={'blackAlpha'} h='35px' w='100px' color='white'>
                                    Resubmit
                                </Button>}
                        </Stack>
                    </GridItem>


                </Grid>
            </div>
        )
    }

    return (<>
        <Grid mt = '10px' ml='1%' w='96%' h='650px' 
            templateRows='repeat(12,1fr)' templateColumns='repeat(6,1fr)' 
            gap={4}
        >
            <GridItem align='center' rowSpan={1} colSpan={2} bg='#edebe9'  style={{borderRadius:5 , boxShadow:Depths.depth4}}>
                <Label style={{ fontSize: 24 }}>Pending</Label>
            </GridItem>
            <GridItem align='center' rowSpan={1} colSpan={2} bg='#edebe9'  style={{borderRadius:5 , boxShadow:Depths.depth4}}>
                <Label style={{ fontSize: 24 }}>Approved</Label>
            </GridItem>
            <GridItem align='center' rowSpan={1} colSpan={2} bg='#edebe9'  style={{borderRadius:5 , boxShadow:Depths.depth4}}>
                <Label style={{ fontSize: 24 }}>Denied</Label>
            </GridItem>
            <GridItem rowSpan={10} colSpan={2} bg='#edebe9' p={2} style={{overflow:'scroll',borderRadius:5 , boxShadow:Depths.depth4}}>
                <Stack tokens={{childrenGap:10}}>
                        {forms.map(x => {
                            return formItem(x);
                        })}
                </Stack>
            </GridItem>
            <GridItem rowSpan={10} colSpan={2} bg='#edebe9' p={2} style={{overflow:'scroll',borderRadius:5 , boxShadow:Depths.depth4}}>
                <Stack tokens={{childrenGap:10}}>
                        {approved.map(x => {
                            return formItem(x);
                        })}
                </Stack>
            </GridItem>
            <GridItem rowSpan={10} colSpan={2} bg='#edebe9' p={2} style={{overflow:'scroll',borderRadius:5 , boxShadow:Depths.depth4}}>
                <Stack tokens={{childrenGap:10}}>
                        {denied.map(x => {
                            return formItem(x);
                        })}
                </Stack>
            </GridItem>

        </Grid>
        </>)
}

export default SubmittedForms