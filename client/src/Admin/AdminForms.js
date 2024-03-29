import React, {useContext, useEffect, useState} from 'react';
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
    IconButton,
} from '@fluentui/react'
import {Badge, Button, ButtonGroup, Grid, GridItem, Text} from "@chakra-ui/react";
import {PDFbyID, PDFHandler} from "../Forms/PDFHandler";
import { useNavigate } from 'react-router';
import { LoginContext } from '../Login/LoginContext';
import { getAdminForms, getFileURL, getFormById, getProfileDetails } from '../Requests/formRequests';

const modelProps = {
    isBlocking: false,
    styles: { main: { maxWidth: 400 } },
};

const formatDate = (date) => {
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
    { key: 'D', text: 'Denied' },
    { key: 'E', text: 'Resubmitted' },
]

const AdminForms = () => {
    const {user , role} = useContext(LoginContext)
    const nav = useNavigate();
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
        endDate :  new Date("Jan 01 2200"),
        budgetHead : ''
    })
    

    const menuProps = (props) =>{
        return {
            items: [
                {
                  key: 'View',
                  text: 'View the form',
                  iconProps: { iconName: 'View' },
                  onClick: ()=> PDFbyID(props.id),
                },
                {
                  key: 'Proceed',
                  text: 'Approve and fill the Budget Section',
                  iconProps: { iconName: 'PlanView' },
                  onClick: ()=> nav('budget/'+props.id),
                  hidden: (props.status !== 'pending') || (role !== 'JAO')
                },
                {
                    key: 'Approve',
                    text: 'Approve the form',
                    iconProps: { iconName: 'SkypeCheck'},
                    onClick: ()=> nav('accept/'+props.id+'/'+role),
                    hidden: !(role === 'AO' || role === 'AR' || role === 'HOD') || (props.status === 'approved')
                },
                {
                    key:'Deny',
                    text:'Deny the form',
                    iconProps: {iconName: 'Blocked'},
                    onClick: ()=> nav('deny/'+props.id+'/'+role),
                    hidden: (props.status !== 'pending')
                } ,
                {
                    key:'Download',
                    text:'Download all attachments',
                    onClick: async() =>nav('download/'+props.id),
                    iconProps: {iconName: 'Download'},
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
            key: 'Date Submitted',
            name: ColumnHeader('Date Submitted'),
            minWidth: 150,
            maxWidth: 150,
            isResizable: true,
            onRender: (props) =>{
                return <Text className='rowLabel'>{props.date}</Text>
            }
        },
        {
            key: 'Type',
            name: ColumnHeader('Type'),
            minWidth: 100,
            maxWidth: 100,
            isResizable: true,
            onRender: (props) =>{
                return <Text as='b' className='rowLabel'>{props.type}</Text>
            }
        },
        {
            key: 'Email',
            name: ColumnHeader('E-mail'),
            minWidth: 200,
            maxWidth: 200,
            isResizable: true,
            onRender: (props) =>{
                return <Text className='rowLabel'>{props.email}</Text>
            }
        },
        {
            key: 'Name',
            name: ColumnHeader('Name'),
            minWidth: 175,
            maxWidth: 175,
            isResizable: true,
            onRender: (props) =>{
                return <Text className='rowLabel'>{props.name}</Text>
            }
        },
        {
            key: 'Budget Head',
            name: ColumnHeader('Budget Head'),
            minWidth: 175,
            maxWidth: 175,
            isResizable: true,
            onRender: (props) =>{
                return <Text className='rowLabel' as='b'>{props.budgetHead}</Text>
            }
        }

    ];

    const getForms = async() =>{

        const profileInfo = await getProfileDetails(user.email);
        const response = await getAdminForms(profileInfo.department , role);
     
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
                date:formatDate(new Date(x.submit_date)),
                budget:JSON.parse(x.budget)
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
                date:formatDate(new Date(x.submit_date)),
                budget:JSON.parse(x.budget)
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
                exists(x.budgetHead , filter.budgetHead) &&
                (filter.type === 'All' || exists(x.type , filter.type)) &&
                filter.startDate <= revformatDate(x.date) && revformatDate(x.date) <= filter.endDate 
            ) return 1
            else return 0
        }))
    }

    useEffect(async () => {
        if(user&&role){
            if(first){
                await getForms()
                setFirst(false)
            } else {
                updateForms()
            }
        }
    } , [user,role, first , filter])

    const [selection, setSelection] = useState(new Selection());
    const [range , setRange] = useState({
        endDate: new Date("Jan 01 2200") ,
        startDate: new Date("Jan 01 1900")
    })

    const [toggleSubmit, setToggleSubmit] = useState(true);


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
                <TextField
                    label = "Filter by Budget Head"
                    onChange={(e)=>setFilter({...filter , budgetHead:e.target.value})}
                    placeholder={'Enter any keyword'}></TextField>
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

            <GridItem rowStart={3}  rowSpan={10} colSpan={12} m={4}>
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

export default AdminForms;