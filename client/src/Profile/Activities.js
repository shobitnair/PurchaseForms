import React from 'react'
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Grid,
    GridItem,
    Stack,
    Box
} from '@chakra-ui/react'
import { Depths } from '@fluentui/react';
import { useNavigate } from 'react-router';
import { useContext , useState , useEffect } from 'react';
import { LoginContext } from '../Login/LoginContext';
import { ScrollablePane } from '@fluentui/react';
import { getActivities } from '../Requests/formRequests';

const formatDate = (date) => {
    if (!date)
        return '';
    const month = date.getMonth() + 1; // + 1 because 0 indicates the first Month of the Year.
    const day = date.getDate();
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
};

const Activities = () => {
    const nav = useNavigate();
    const {user , role} = useContext(LoginContext);
    const [fv , Sfv] = useState(0)
    const [items , setItems] = useState([]);
    useEffect(async()=>{
        if(user && role){
            if(fv === 0){
                setItems(await getActivities(user.email));
                Sfv(1)
            } else {

            }
        }
    },[user,role]);


    return (
        <div>
            <Grid templateColumns='repeat(12,1fr)' templateRows='repeat(12,1fr)' w='100%'  h='600px' gap={4} bg={'whiteAlpha.300'}>
                <GridItem colStart={1} rowSpan = {12} colSpan={6} ml={4}>
                    <ScrollablePane style={{marginLeft:'20%','height':'600px' , 'width':'60%' , marginTop:'80px' ,'border': '8px solid #f3f2f1' , padding:'10px' , backgroundColor:'#f3f2f1', borderRadius: '2px', boxShadow: Depths.depth4 }}>
                        <Stack style={{'alignItems':'center' , 'marginTop':'20px'}}>
                            {
                                items.map(x => {
                                    return(
                                            <Box style={{boxShadow: Depths.depth4  , width:'95%' , marginTop:'10px'}} >
                                                <Alert status = {x.type} variant='top-accent'>
                                                <AlertIcon boxSize='30px'/>
                                                <Stack>
                                                    <AlertTitle fontSize={18}>{x.heading}</AlertTitle>
                                                    <AlertDescription fontSize={16}>
                                                    {x.message}  {formatDate(new Date(x.activity_time))}
                                                    </AlertDescription>
                                                    
                                                </Stack>
                                            </Alert>
                                            </Box>
                                    )
                                })
                            }   
                        </Stack>
                    </ScrollablePane>
                </GridItem>
                </Grid>
        </div>
    )
}

export default Activities