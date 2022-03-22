import React, {useEffect, useState} from 'react';
import {
    ConstrainMode,
    Depths,
    DetailsList, DetailsListLayoutMode, Dropdown, Icon, Label, PrimaryButton, Selection, SelectionMode, TextField,
    DatePicker
} from '@fluentui/react'
import {URL} from '../cred'
import axios from "axios";
import {Badge, Button, ButtonGroup, Grid, GridItem, Text} from "@chakra-ui/react";
import {PDFbyID, PDFHandler} from "../Forms/PDFHandler";
import { DefaultButton } from '@fluentui/react';


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
        overflowX: 'scroll',
        selectors: {
            '& [role=grid]': {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '450px',
                backgroundColor:'#f3f2f1'
            },
        },
    },
    headerWrapper: {
        flex: '0 0 auto',
    },
    contentWrapper: {
        overflowX: 'hidden',
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

const AdminForms = () => {
    const [items , setItems] = useState([])
    const [forms , setForms] = useState([])
    const [temp , setTemp] = useState([])
    const [first , setFirst] = useState(true)
    const [filter , setFilter] = useState({
        id:'',
        email:'',
        type:'All' ,
        status:'All',
        startDate: new Date("Jan 01 1900"), 
        endDate :  new Date(Date.now()),
        budgetGreater:'',
        budgetLesser:''
    })


    const _columns = [
        {
            key: 'Actions',
            name: 'Actions',
            minWidth: 175,
            maxWidth: 175,
            isResizable: true,
            onRender: (props) =>{
                return <div>
                    <ButtonGroup  spacing='2'>
                        <Button onClick={()=>PDFbyID(props.id)}
                                h={'30px'} colorScheme={'blackAlpha'}>View</Button>
                        <Button h={'30px'} colorScheme={'teal'}>Proceed</Button>
                    </ButtonGroup>
                </div>
            },
            
        },
        {
            key: 'Id',
            name: 'Id',
            minWidth: 75,
            maxWidth: 75,
            isResizable: true,
            onRender: (props) =>{
                return <Text style={{fontSize:15}}>{props.id}</Text>
            }
        },
        {
            key: 'Date Submitted',
            name: 'Date Submitted',
            minWidth: 100,
            maxWidth: 100,
            isResizable: true,
            onRender: (props) =>{
                return <Text style={{fontSize:15}}>{props.date}</Text>
            }
        },
        {
            key: 'Type',
            name: 'Type',
            minWidth: 75,
            maxWidth: 75,
            isResizable: true,
            onRender: (props) =>{
                return <Text style={{fontSize:15}}>{props.type}</Text>
            }
        },
        {
            key: 'Email',
            name: 'Email',
            minWidth: 200,
            maxWidth: 200,
            isResizable: true,
            onRender: (props) =>{
                return <Text style={{fontSize:15}}>{props.email}</Text>
            }
        },
        {
            key: 'Name',
            name: 'Name',
            minWidth: 175,
            maxWidth: 175,
            isResizable: true,
            onRender: (props) =>{
                return <Text style={{fontSize:15}}>{props.name}</Text>
            }
        },
        {
            key: 'Budget Head',
            name: 'Budget Head',
            minWidth: 175,
            maxWidth: 175,
            isResizable: true,
            onRender: (props) =>{
                return <Badge fontSize={15}>{props.budgetHead}</Badge>
            }
        },
        {
            key: 'Status',
            name: 'Status',
            minWidth: 175,
            maxWidth: 175,
            isResizable: true,
            onRender: (props) =>{
                return <div >
                {props.status === 'approved' && <Badge fontSize={15} colorScheme={'green'}>{props.status}</Badge>}
                {props.status === 'denied' && <Badge fontSize={15} colorScheme={'red'}>{props.status}</Badge>}
                {props.status === 'pending' && <Badge fontSize={15} colorScheme={'purple'}>{props.status}</Badge>}
                </div>
            }
        },

    ];

    const getForms = async() =>{
        const response = await axios.get(URL+'/admin/forms')
        setForms( response.data )
        setItems( response.data.map(x => {
            const data = JSON.parse(x.data)
            return {
                id: x.id ,
                type:x.type ,
                email:x.email ,
                name:data.name,
                budgetHead:data.budgetHead,
                status:x.status,
                date:data.DOP
            }
        }))
        setTemp( response.data.map(x => {
            const data = JSON.parse(x.data)
            return {
                id: x.id ,
                type:x.type ,
                email:x.email ,
                name:data.name,
                budgetHead:data.budgetHead,
                status:x.status,
                date:data.DOP
            }
        }))

    }

    const exists = (a , b) => {
        return a.toString().toLowerCase().indexOf(b.toString().toLowerCase()) > -1
    }

    const updateForms = () =>{

        setItems(temp.filter(x =>{
            if(
                exists(x.email , filter.email) &&
                exists(x.id , filter.id) &&
                (filter.type === 'All' || exists(x.type , filter.type)) &&
                (filter.status === 'All' || exists(x.status , filter.status))&&
                filter.startDate <= revformatDate(x.date) &&
                revformatDate(x.date) <= filter.endDate 
            ) return 1
            else return 0
        }))
    }

    useEffect(async () => {
        if(first){
            await getForms()
            setFirst(false)
        } else {
            updateForms()

        }
    } , [first , filter])

    const [selection, setSelection] = useState(new Selection());
    const [range , setRange] = useState({
        endDate: new Date("Mar 28 2022") ,
        startDate: new Date("Jan 01 1900")
    })
    return (<>
        <Grid templateColumns='repeat(12,1fr)' templateRows='repeat(12,1fr)' w='100%'  h='600px' gap={4} >
            <GridItem rowSpan={1} colSpan={2} ml={4}>
                <TextField
                    label = "Filter by ID"
                    onChange={(e)=>setFilter({...filter,id:String(e.target.value)})}
                    placeholder={'Enter any keyword'}></TextField>
            </GridItem>
            <GridItem  rowStart={2} rowSpan={1} colSpan={2} ml={4}>
                <TextField
                    label = "Filter by Email"
                    onChange={(e)=>setFilter({...filter , email:e.target.value})}
                    placeholder={'Enter any keyword'}></TextField>
            </GridItem>
            <GridItem rowSpan={1} colSpan={2} ml={4}>
                <Dropdown
                    defaultSelectedKey={'A'}
                    options={formOptions} label="Form type"
                    onChange={(e, i) => setFilter({ ...filter, type: i.text })}
                />
            </GridItem>
            <GridItem  rowStart={2} rowSpan={1} colSpan={2} ml={4}>
                <Dropdown
                    defaultSelectedKey={'A'}
                    options={statusOptions} label="Status type"
                    onChange={(e, i) => setFilter({ ...filter, status: i.text })}
                />
            </GridItem>
            <GridItem rowSpan={1} colSpan={2} ml={4} > 
                <DatePicker
                placeholder="Select Date"
                label="Start Date"
                onSelectDate={(e) => setFilter({ ...filter, startDate: e })} 
                maxDate = {filter.endDate}
                />
            </GridItem>
            <GridItem  rowStart={2} rowSpan={1} colSpan={2} ml={4}>
                <DatePicker
                    placeholder="Select Date"
                    label="End Date"
                    onSelectDate={(e) => setFilter({ ...filter, endDate: e })} 
                    minDate = {filter.startDate}
                    maxDate = {new Date(Date.now())}
                />
            </GridItem>

            <GridItem rowStart={3} rowSpan={10} colSpan={12} m={8}>
                <div style={{'border': '8px solid #f3f2f1' , borderRadius: '2px', boxShadow: Depths.depth4 }}>
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
        </>
    );
};

export default AdminForms;