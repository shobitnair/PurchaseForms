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
    Text
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
import { ScrollablePane } from '@fluentui/react';
import { getNotifications } from '../Requests/formRequests';

const gridStyle = {
    root: {
        overflowX:'scroll',
        selectors: {
            '& [role=grid]': {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                height: '500px',
                width:'100%',
            },
        },
    },
    headerWrapper: {
        flex: '0 0 auto',
      },
    contentWrapper: {
    flex: '1 1 auto',
    overflowY: 'auto',
    overflowX: 'auto',
    },
};

const formatDate = (date) => {
    if (!date)
        return '';
    const month = date.getMonth() + 1; // + 1 because 0 indicates the first Month of the Year.
    const day = date.getDate();
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
};

const Notifications = () => {
    const nav = useNavigate();
    const {user , role} = useContext(LoginContext);
    const [fv , Sfv] = useState(0)
    const [items , setItems] = useState([]);
    
    const ColumnHeader = (text) =>{
        return <Text className='Header' as='b' w="100%">{text}</Text>
    }
    const _columns = [
        {
            key: 'Notif',
            name: ColumnHeader('Notifications')  , 
            minWidth: 480,
            maxWidth: 480,
            isResizable: true,
            onRender: (props) =>{
                return (
                    <Box style={{boxShadow: Depths.depth4  , width:'100%'}} >
                        <Alert status = {props.type}>
                        <AlertIcon boxSize='30px'/>
                        <Box>
                            <AlertTitle fontSize={18}>{props.heading}</AlertTitle>
                            <AlertDescription fontSize={16}>
                            {props.message}  {formatDate(new Date(props.notification_time))}
                            </AlertDescription>
                        </Box>
                    </Alert>
                    </Box>
                )
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
        <div style={{ 'border': '8px solid #f3f2f1'  , backgroundColor:'#f3f2f1' , maxWidth:'100%', borderRadius: '2px', boxShadow: Depths.depth4 }}>
                    
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