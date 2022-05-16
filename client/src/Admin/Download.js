import React  , {useState , useEffect}from 'react';
import {Grid, GridItem, Stack, Text} from "@chakra-ui/react";
import {DefaultButton, Depths, TextField} from "@fluentui/react";
import {useNavigate, useParams} from "react-router-dom"
import { addActivities, addNotifications, getFileURL, getFormById, updateBudget } from '../Requests/formRequests';
import { LoginContext } from '../Login/LoginContext';
import { useContext } from 'react';


const Download = (props) => {

    const {user,role} = useContext(LoginContext)
    const param = useParams()
    const nav = useNavigate()

    const [files , setFiles] = useState([]);
    useEffect(async() => {
        if(user && role && param){
            const response = await getFormById(param.id);
            console.log(response)
            setFiles(JSON.parse(response.data).files)
        } else {
            setFiles([]);
        }
    }, [user , role])
    

    return (
        <div>
            <Grid templateColumns='repeat(12,1fr)' templateRows='repeat(12,1fr)' w='100%'  h='600px' gap={4} bg={'whiteAlpha.300'}>
                <GridItem rowSpan={1} colSpan={3} ml={4} mt={4} style={{'alignItems':'center'}}>
                    <Text className='Header' as='b' w="100%"> Download the attachments </Text>
                </GridItem>
                <GridItem colStart={1} rowSpan = {11} colSpan={3} ml={4}>
                    <div style={{'border': '8px solid #f3f2f1' ,padding:'10px' , backgroundColor:'#f3f2f1', borderRadius: '2px', boxShadow: Depths.depth4 }}>
                        <Stack>
                            {
                                files.map((x,i) => {
                                    return <DefaultButton onClick={async()=>{
                                        window.open(await getFileURL(x))
                                    }}> Attachment {i+1} </DefaultButton>
                                })
                            }
                        </Stack>
                    </div>
                </GridItem>
            </Grid>
        </div>
    );
}

export default Download;