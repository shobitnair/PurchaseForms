import React, {useEffect, useState , useContext} from 'react';
import {
    ConstrainMode,
    Depths,
    DetailsList, 
    DetailsListLayoutMode, 
    Dropdown, 
    Selection, 
    SelectionMode, 
    TextField,
    DatePicker,
    IconButton
} from '@fluentui/react'
import {URL} from '../cred'
import axios from "axios";
import {Badge, Button, ButtonGroup, Grid, GridItem, Text} from "@chakra-ui/react";
import {DraftByID, PDFbyID, PDFHandler} from "../Forms/PDFHandler";
import { useNavigate } from 'react-router';
import { LoginContext } from '../Login/LoginContext';
import { deleteDraft, getDrafts } from '../Requests/formRequests';


const formatDate = (date) => {
    console.log(date);
    if (!date)
        return '';
    const month = date.getMonth() + 1; // + 1 because 0 indicates the first Month of the Year.
    const day = date.getDate();
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
};
const revformatDate = (date) =>{
    var parts = date.split("/");
    var dt = new Date(parseInt(parts[2], 10),
                  parseInt(parts[1], 10) - 1,
                  parseInt(parts[0], 10));
    return dt;
}

const gridStyle = {
    root: {
        overflowX:'scroll',
        selectors: {
            '& [role=grid]': {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                height: '55vh',
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


const formOptions = [
    { key: 'A', text: 'All'},
    { key: 'B', text: 'Sp101' },
    { key: 'C', text: 'Sp102' },
];

const statusOptions = [
    { key: 'A', text: 'All'},
    { key: 'B', text: 'Pending' },
    { key: 'C', text: 'Approved' },
    { key: 'C', text: 'Denied' },
]

const Drafts = () => {
    const {user , role} = useContext(LoginContext)
    const nav = useNavigate();
    const [items , setItems] = useState([])
    const [forms , setForms] = useState([])
    const [temp , setTemp] = useState([])
    const [first , setFirst] = useState(true)
    const [filter , setFilter] = useState({
        id:'',
        type:'All' ,
        startDate: new Date("Jan 01 1900"), 
        endDate :  new Date(Date.now()),
    })

    const handleDelete = async(id , email) => {
        await deleteDraft(id , email) 
        setFirst(true);
    }

    const menuProps = (props) =>{
        return {
            items: [
                {
                    key: 'View',
                    text: 'View the form',
                    iconProps: { iconName: 'View' },
                    onClick: ()=> DraftByID(props.id , user.email),
                },
                {
                    key: 'Edit',
                    text: 'Edit',
                    iconProps: { iconName: 'EditMirrored' },
                    onClick: ()=> nav(`/site/forms/${props.type}/draft/${props.id}`),
                },
                {
                    key:'Delete Draft',
                    text: 'Delete',
                    iconProps: { iconName : 'Delete'} ,
                    onClick: async() => await handleDelete(props.id , user.email)   
                }
              ],
        }
    }

    const ColumnHeader = (text) =>{
        return <Text className='Header' as='b' w="100%">{text}</Text>
    }

    const _columns = [
        {
            key: 'Actions',
            minWidth: 35,
            maxWidth: 35,
            isResizable: true,
            onRender: (props) =>{
                return <div >
                    <IconButton
                    menuProps = {menuProps(props)}
                    title="Actions"
                    ariaLabel="Actions"
                    styles={{icon:{color:'black'}}}
                    />
                </div>
            },
            
        },
        {
            key: 'Id',
            name: ColumnHeader('ID')  , 
            minWidth: 75,
            maxWidth: 75,
            isResizable: true,
            onRender: (props) =>{
                return <Text className='rowLabel'>{props.id}</Text>
            }
        },
        {
            key: 'Type',
            name: ColumnHeader('Type'),
            minWidth: 75,
            maxWidth: 75,
            isResizable: true,
            onRender: (props) =>{
                return <Text as='b' className='rowLabel'>{props.type}</Text>
            }
        },
        {
            key: 'Last Updated',
            name: ColumnHeader('Last Updated'),
            minWidth: 350,
            maxWidth: 350,
            isResizable: true,
            onRender: (props) =>{
                return (
                    <Text className='rowLabel'>{props.lastUpdated}</Text>
                )
            }
        },
        
    ];

    const getDateInfo = (x) => {
        let d = new Date(Date.parse(x.last_updated))
        let delta = new Date(new Date() - d).getDate() - 1;
        let result=`${new Date(new Date() - d).getDate() - 1} days ago`;
        if(delta === 0){
            result = `${(new Date().getHours() - d.getHours() + 24)%24} hours ago`;
            delta = (new Date().getHours() - d.getHours() + 24)%24;
            if(delta === 0){
                return 'few moments ago';
            }
            else return result;
        }
        else return result;
    }

    const getForms = async() =>{
        const response = await getDrafts(user.email);
        setForms( response )
        setItems( response.map(x => {
            const data = JSON.parse(x.data)
            return {
                id: x.id ,
                type:x.type ,
                lastUpdated: getDateInfo(x)
            }
        }))
        setTemp( response.map(x => {
            const data = JSON.parse(x.data)
            return {
                id: x.id ,
                type:x.type ,
                lastUpdated: getDateInfo(x)
            }
        }))

    }

    const exists = (a , b) => {
        return a.toString().toLowerCase().indexOf(b.toString().toLowerCase()) > -1
    }

    const updateForms = () =>{

        setItems(temp.filter(x =>{
            console.log(x);
            if(
                exists(x.id , filter.id) &&
                (filter.type === 'All' || exists(x.type , filter.type))
            ) return 1
            else return 0
        }))
    }

    useEffect(async () => {
        if(user){
            if(first){
                await getForms(user.email);
                setFirst(false)
            } else {
                updateForms()
            }
        }
    } , [user , first , filter])

    const [selection, setSelection] = useState(new Selection());

    return (<>
        <Grid templateColumns='repeat(12,1fr)' templateRows='repeat(12,1fr)' w='100%'  h='600px' gap={4} >
            <GridItem rowSpan={1} colSpan={2} ml={4}>
                <TextField
                    label = "Filter by ID"
                    onChange={(e)=>setFilter({...filter,id:String(e.target.value)})}
                    placeholder={'Enter any keyword'}></TextField>
            </GridItem>
            <GridItem  rowSpan={1} colSpan={2} ml={4}>
                <Dropdown
                    defaultSelectedKey={'A'}
                    options={formOptions} label="Form type"
                    onChange={(e, i) => setFilter({ ...filter, type: i.text })}
                />
            </GridItem>

            <GridItem rowStart={2}  rowSpan={10} colSpan={12} m={4}>
                <div style={{'border': '8px solid #f3f2f1' ,padding:'10px' , backgroundColor:'#f3f2f1', maxWidth:'100%',width:'fit-content', borderRadius: '2px', boxShadow: Depths.depth4 }}>
                    <div >
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
                </div>
            </GridItem>
        </Grid>
        </>
    );
};

export default Drafts;