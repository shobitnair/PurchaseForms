import React, { useContext, useEffect, useState } from 'react'
import { LoginContext } from '../Login/LoginContext'
import axios from 'axios';
import { URL } from '../cred';
import {
    Label,
    Stack,
    Depths,Dialog,
    DialogType,
    DialogFooter,TextField
} from '@fluentui/react';
import { Grid, GridItem , Button , Badge  } from '@chakra-ui/react'
import {PDFHandler} from "../Forms/PDFHandler";

const modelProps = {
    isBlocking: false,
    styles: { main: { maxWidth: 400 } },
};


const AdminForms = () => {
    const { user } = useContext(LoginContext)
    const [pending , setPending] = useState([]);
    const [done , setDone] = useState([]);
    const [needed , setNeeded] = useState([]);
    const [flag , setFlag] = useState(0);
    const [toggleItem , setToggleItem] = useState({flag:true , id:null});

    const getForms = async () =>{
        setPending([])
        setDone([])
        setNeeded([])
        const res = await axios.get(URL+'/admin/forms');
        for(let i  = 0  ; i<res.data.length ; i++){
            if(res.data[i].status === 'pending')setPending(pending => [...pending, res.data[i]]);
            else if(res.data[i].status === 'approved')setDone(done => [...done, res.data[i]])
            else setNeeded(needed => [...needed , res.data[i]])
        }
    }

    const handleDeny = async(id , message) =>{
        console.log(id , message)
        const response = await axios.post(URL+'/admin/forms/deny' , {
            id:id,
            message:message 
        })
        setToggleItem({flag:true , id:null})
    }

    const ItemPopUp = () => {
        return (
            <Dialog
                hidden={toggleItem.flag}
                onDismiss={() => setToggleItem(false)}
                modalProps={modelProps}
                dialogContentProps={{
                    type: DialogType.largeHeader,
                    title: 'Deny the Form'

                }}
            >
                <TextField id="admin_msg" label="Message" />
                <DialogFooter>
                    <Button onClick={async() => handleDeny(toggleItem.id , document.getElementById('admin_msg').value)}>Confirm</Button>
                    <Button onClick={() => setToggleItem({flag:true , id:null})}>Cancel</Button>
                </DialogFooter>
            </Dialog>
        )
    }

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
                            <Badge >Name : {data.name}</Badge>
                        </Stack>
                    </GridItem>
                    <GridItem style={{margin :10}}  rowSpan={4} colSpan={1}>
                        <Stack tokens={{childrenGap:5}}>
                            <Button boxShadow='lg' colorScheme={'blackAlpha'} h='35px' w='100px' color='white'
                                onClick = {PDFHandler(x.type , data)}
                            >View</Button>
                            <Button boxShadow='lg' colorScheme={'teal'} h='35px' w='100px' color='white'>Proceed</Button>
                            <Button boxShadow='lg' bg='#d13438' colorScheme={'red'} h='35px' w='100px' color='white'
                                onClick = {() => setToggleItem({id:x.id , flag:false})}
                            >Deny</Button>
                        </Stack>
                    </GridItem>
                </Grid>
            </div>
        )
    }

    useEffect(async () => {
        await getForms();
    }, [flag])

    return (
        <div>
            <ItemPopUp />
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
                    <Label style={{ fontSize: 24 }}>Denied / Action Needed</Label>
                </GridItem>
                <GridItem rowSpan={10} colSpan={2} bg='#edebe9' p={2} style={{overflow:'scroll',borderRadius:5 , boxShadow:Depths.depth4}}>
                    <Stack tokens={{childrenGap:10}}>
                        {pending.map(x => {
                            return formItem(x);
                        })}
                    </Stack>
                </GridItem>
                <GridItem rowSpan={10} colSpan={2} bg='#edebe9' p={2} style={{overflow:'scroll',borderRadius:5 , boxShadow:Depths.depth4}}>
                    <Stack tokens={{childrenGap:10}}>
                        {done.map(x => {
                            return formItem(x);
                        })}
                    </Stack>
                </GridItem>
                <GridItem rowSpan={10} colSpan={2} bg='#edebe9' p={2} style={{overflow:'scroll',borderRadius:5 , boxShadow:Depths.depth4}}>
                    <Stack tokens={{childrenGap:10}}>
                        {needed.map(x => {
                            return formItem(x);
                        })}
                    </Stack>
                </GridItem>

            </Grid>
        </div>
    );
};

export default AdminForms;