import React from 'react'
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Grid,
    GridItem,
    Stack,
    Box,
    Button,
    Text
} from '@chakra-ui/react'
import {ConstrainMode, Depths, DetailsList, DetailsListLayoutMode, SelectionMode} from '@fluentui/react';
import { useNavigate } from 'react-router';
import { useContext , useState , useEffect } from 'react';
import { LoginContext } from '../Login/LoginContext';
import { ScrollablePane } from '@fluentui/react';
import { getActivities } from '../Requests/formRequests';
import { PDFbyID } from '../Forms/PDFHandler';
import {gridStyle , ColumnHeader} from "../Styles/Utils";



const Activities = () => {
    const nav = useNavigate();
    const {user , role} = useContext(LoginContext);
    const [fv , Sfv] = useState(0)
    const [items , setItems] = useState([]);

    const _columns = [
        {
            key: 'Activity',
            minWidth:800,
            name: ColumnHeader('Your Activities'),
            isResizable: true,
            onRender: (props) => {
                return (
                    <Alert status = {props.type} variant='top-accent' width={'100%'}>
                        <Stack width={'100%'}>
                            <AlertTitle fontSize={18}>{props.heading}</AlertTitle>
                            <Text as={'cite'} fontSize={13} >
                                {props.message}
                            </Text>
                            <Text align={'right'}>
                                - {String(new Date(props.activity_time)).slice(0,25)}
                            </Text>
                            <Button w={'150px'} onClick={()=>PDFbyID(props.id)}>View Form</Button>
                        </Stack>

                    </Alert>
                )
            }
        }
    ]

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
                <GridItem colStart={3} rowSpan = {12} colSpan={7} ml={4} mt={4}>
                    <div style={{ 'border': '8px solid #f3f2f1'  , backgroundColor:'#f3f2f1' , borderRadius: '2px', boxShadow: Depths.depth4 }}>

                        <DetailsList
                            items={items}
                            columns={_columns}
                            setKey="set"
                            selectionMode={SelectionMode.none}
                            styles = {gridStyle}
                            layoutMode={DetailsListLayoutMode.fixedColumns}
                            constrainMode={ConstrainMode.unconstrained}
                        />

                    </div>
                </GridItem>
                </Grid>
        </div>
    )
}

export default Activities