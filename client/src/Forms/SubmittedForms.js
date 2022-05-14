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
import {PDFbyID, PDFHandler} from "../Forms/PDFHandler";
import { useNavigate } from 'react-router';
import { LoginContext } from '../Login/LoginContext';


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
    { key: 'E' , text: 'ReSubmitted'}
]

const SubmittedForms = () => {
    const {user} = useContext(LoginContext)
    const nav = useNavigate();
    const [items , setItems] = useState([])
    const [forms , setForms] = useState([])
    const [temp , setTemp] = useState([])
    const [first , setFirst] = useState(true)
    const [filter , setFilter] = useState({
        id:'',
        qno:'',
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
                    key:'Status' ,
                    text:'Show Current Status',
                    iconProps : { iconName: 'PowerBILogo'},
                    onClick: () => nav('response/'+props.id+'/status')
                },
                {
                  key: 'res',
                  text: 'Response from Budget Section',
                  iconProps: { iconName: 'PlanView' },
                  onClick: ()=> nav('response/'+props.id),
                  hidden: (props.status !== 'denied')
                },
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
            minWidth: 75,
            maxWidth: 75,
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
            key: 'Quotation',
            name: ColumnHeader('Quotation Number'),
            minWidth: 175,
            maxWidth: 175,
            isResizable: true,
            onRender: (props) =>{
                return <Text className='rowLabel'>{props.qno}</Text>
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
        },
        {
            key: 'Status',
            name: ColumnHeader('Status'),
            minWidth: 175,
            maxWidth: 175,
            isResizable: true,
            onRender: (props) =>{
                return <div >
                {props.status === 'approved' && 
                    <Badge fontFamily={'roboto'} fontSize={15} align='center' w='120px' colorScheme={'green'}>
                        {props.status}
                    </Badge>
                }
                {props.status === 'pending' && 
                    <Badge fontFamily={'roboto'} fontSize={15} align='center' w='120px' colorScheme={'purple'}>
                        {props.status}
                    </Badge>
                }
                {props.status === 'denied' && 
                    <Badge fontFamily={'roboto'} fontSize={15} align='center' w='120px' colorScheme={'red'}>
                        {props.status}
                    </Badge>
                }
                {props.status === 'resubmitted' && 
                    <Badge fontFamily={'roboto'} fontSize={15} align='center' w='120px' colorScheme={'orange'}>
                    {props.status}
                    </Badge>
                }
                </div>
            }
        },

    ];

    const getForms = async() =>{
        const response = await axios.get(URL+'/forms/'+user.email)
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
                qno:data.Qno
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
                qno:data.Qno
            }
        }))

    }

    const exists = (a , b) => {
        return a.toString().toLowerCase().indexOf(b.toString().toLowerCase()) > -1
    }

    const updateForms = () =>{

        setItems(temp.filter(x =>{
            if(
                exists(x.qno , filter.qno) &&
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
        if(user){
            if(first){
                await getForms()
                setFirst(false)
            } else {
                updateForms()
            }
        }
    } , [user , first , filter])

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
                    label = "Filter by Quotation Number"
                    onChange={(e)=>setFilter({...filter , qno:e.target.value})}
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

export default SubmittedForms;