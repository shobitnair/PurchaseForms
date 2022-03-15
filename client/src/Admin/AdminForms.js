import React, {useEffect, useState} from 'react';
import {
    ConstrainMode,
    Depths,
    DetailsList, DetailsListLayoutMode, Dropdown, Label, PrimaryButton, Selection, SelectionMode, TextField
} from '@fluentui/react'
import {URL} from '../cred'
import axios from "axios";
import {Badge, Button, Grid, GridItem} from "@chakra-ui/react";


const gridStyle = {
    root: {
        overflowX: 'scroll',
        selectors: {
            '& [role=grid]': {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                height: '500px',
                marginLeft:'20px'
            },
        },
    },
    headerWrapper: {
        flex: '0 0 auto',
    },
    contentWrapper: {
        flex: '1 1 auto',
        overflowY: 'auto',
        overflowX: 'hidden',
    },
};

const _columns = [
    {
        key: 'Id',
        name: 'Id',
        minWidth: 75,
        maxWidth: 75,
        isResizable: true,
        onRender: (props) =>{
            return <div>{props.id}</div>
        }
    },
    {
        key: 'Date Submitted',
        name: 'Date Submitted',
        minWidth: 125,
        maxWidth: 125,
        isResizable: true,
        onRender: (props) =>{
            return <div>{props.date}</div>
        }
    },
    {
        key: 'Type',
        name: 'Type',
        minWidth: 125,
        maxWidth: 125,
        isResizable: true,
        onRender: (props) =>{
            return <div >{props.type}</div>
        }
    },
    {
        key: 'Email',
        name: 'Email',
        minWidth: 175,
        maxWidth: 175,
        isResizable: true,
        onRender: (props) =>{
            return <div>{props.email}</div>
        }
    },
    {
        key: 'Name',
        name: 'Name',
        minWidth: 175,
        maxWidth: 175,
        isResizable: true,
        onRender: (props) =>{
            return <div>{props.name}</div>
        }
    },
    {
        key: 'Budget Head',
        name: 'Budget Head',
        minWidth: 175,
        maxWidth: 175,
        isResizable: true,
        onRender: (props) =>{
            return <div>{props.budgetHead}</div>
        }
    },
    {
        key: 'Status',
        name: 'Status',
        minWidth: 175,
        maxWidth: 175,
        isResizable: true,
        onRender: (props) =>{
            return <Badge>{props.status}</Badge>
        }
    },
];

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
        type:'' ,
        status:'',
    })


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
                (filter.status === 'All' || exists(x.status , filter.status))
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
                <Dropdown placeholder="Select an Option" options={formOptions} label="Form type"
                          onChange={(e, i) => setFilter({ ...filter, type: i.text })} />
            </GridItem>
            <GridItem  rowStart={2} rowSpan={1} colSpan={2} ml={4}>
                <Dropdown placeholder="Select an Option" options={statusOptions} label="Status type"
                          onChange={(e, i) => setFilter({ ...filter, status: i.text })} />
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