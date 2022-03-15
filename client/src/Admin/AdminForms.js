import React, {useEffect, useState} from 'react';
import {
    ConstrainMode,
    Depths,
    DetailsList, DetailsListLayoutMode, Label, PrimaryButton, Selection, SelectionMode, TextField
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

const AdminForms = () => {
    const [items , setItems] = useState([])
    const [forms , setForms] = useState([])
    const [temp , setTemp] = useState([])
    const [search , setSearch] = useState('')


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

    const handleSearch = (search) =>{
        setItems(temp.filter(x =>{
            if(x.email.toString().toLowerCase().indexOf(search.toLowerCase()) > -1)return 1
            if(x.id.toString().toLowerCase().indexOf(search.toLowerCase()) > -1)return 1
            if(x.status.toString().toLowerCase().indexOf(search.toLowerCase()) > -1)return 1
            if(x.type.toString().toLowerCase().indexOf(search.toLowerCase()) > -1)return 1
        }))
        setSearch(search)
    }

    useEffect(async () => {
        await getForms()
    } , [])

    const [selection, setSelection] = useState(new Selection());
    return (<>
        <Grid templateColumns='repeat(12,1fr)' templateRows='repeat(12,1fr)' w='100%'  h='600px' gap={1} m={4}>
            <GridItem rowSpan={1} colSpan={2}>
                <TextField
                    label = "Search"
                    onChange={(e)=>handleSearch(e.target.value)}
                    placeholder={'Enter any keyword'}></TextField>
            </GridItem>

            <GridItem rowStart={3} colSpan={12} m={8}>
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