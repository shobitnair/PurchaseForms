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
    Text,
    Button
} from '@chakra-ui/react'
import { ConstrainMode,
    Depths,
    DetailsList, 
    DetailsListLayoutMode,
    Selection, 
    SelectionMode,  } from '@fluentui/react';
import { useNavigate } from 'react-router';
import { useContext , useState , useEffect } from 'react';
import { LoginContext } from '../Login/LoginContext';
import { addActivities, addNotifications, committee, getFormById, getHOD, getNotifications } from '../Requests/formRequests';
import { PDFbyID } from '../Forms/PDFHandler';
import {gridStyle , ColumnHeader} from "../Styles/Utils";


const Notifications = () => {
    const nav = useNavigate();
    const {user , role} = useContext(LoginContext);
    const [fv , Sfv] = useState(0)
    const [items , setItems] = useState([]);
    


    const acceptComm = async(id , type , email)=>{
                                    
        const res=await committee(id,type,email)
        console.log(res);
        if(res.count===3){
            const response = await getFormById(id);
            const hod = await getHOD(response.department);
            await addNotifications(hod.email , 'Take action on new form : '+id , 'warning' , 'New Form Added' , id)
        }
        
        
    }


    const _columns = [
        {
            key: 'Notif',
            name: ColumnHeader('Notifications')  ,
            minWidth:520,
            isResizable: true,
            onRender: (props) =>{
                if(props.type === 'partA'){
                    return (
                            <Alert status = 'info' variant='top-accent' width={'100%'}>
                            <Stack>
                                <AlertTitle fontSize={18}>{props.heading}</AlertTitle>
                                <Text as={'cite'} fontSize={13} >
                                    {props.message}
                                </Text>
                                <Text align={'right'}>
                                    - {String(new Date(props.notification_time)).slice(0,25)}
                                </Text>
                                <Text>Fill part B of the form.</Text>
                                <Button w={'150px'} onClick={()=>nav('/site/forms/sp102/'+props.id)}>Proceed</Button>
                            </Stack>
                            
                        </Alert>
                    )

                }
                else if(props.type === 'committee'){
                    return (
                            <Alert status = 'info' variant='top-accent' width={'100%'}>
                            <Stack>
                                <AlertTitle fontSize={18}>{props.heading}</AlertTitle>
                                <Text as={'cite'} fontSize={13} >
                                    {props.message}
                                </Text>
                                <Text align={'right'}>
                                    - {String(new Date(props.notification_time)).slice(0,25)}
                                </Text>
                                <Button w={'150px'} onClick={()=>PDFbyID(props.id)}>View Form</Button>
                                <Button w={'150px'} onClick={async()=>{await acceptComm(props.id , props.type , props.email);
                                    await addActivities(props.email, 'You accepted the request for being committee member', 'warning', 'Accepted Committee Request', props.id);
                                    nav('/site/admin/activity');}}>Approve</Button>
                            </Stack>
                            
                        </Alert>
                    )
                }
                else if(props.type === 'committee_done'){
                    return (
                            <Alert status = 'info' variant='top-accent' width={'100%'}>
                            <Stack>
                                <AlertTitle fontSize={18}>{props.heading}</AlertTitle>
                                <Text as={'cite'} fontSize={13} >
                                    {props.message}
                                </Text>
                                <Text align={'right'}>
                                    - {String(new Date(props.notification_time)).slice(0,25)}
                                </Text>
                                <Button w={'150px'} onClick={()=>PDFbyID(props.id)}>View Form</Button>
                                <Button w={'150px'} disabled={true} onClick={async()=>{
                                    await committee(props.id,props.type,props.email)
                                }}>Approve</Button>
                            </Stack>
                        </Alert>
                    )
      
                }
                else{
                return (
                    <Alert status = {props.type} variant='top-accent' width={'100%'}>
                        <Stack width={'100%'}>
                            <AlertTitle fontSize={18}>{props.heading}</AlertTitle>
                            <Text as={'cite'} fontSize={13} >
                                {props.message}
                            </Text>
                            <Text align={'right'}>
                                - {String(new Date(props.notification_time)).slice(0,25)}
                            </Text>
                            <Button w={'150px'} onClick={()=>PDFbyID(props.id)}>View Form</Button>
                        </Stack>
                        
                    </Alert>
                )
                }
            }
        },
    ]
    
    useEffect(async()=>{
        if(user && role){
            if(fv === 0){
                setItems(await getNotifications(user.email));
                Sfv(1)
            } else {
            }
        } else {
            setItems([])
            Sfv(0)
        }
    },[user,role]);

    

    return (
        <div style={{ 'border': '8px solid #f3f2f1'  ,height:'100%', backgroundColor:'#f3f2f1' , maxWidth:'100%', borderRadius: '2px', boxShadow: Depths.depth4 }}>
                    
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
    )
}

export default Notifications 