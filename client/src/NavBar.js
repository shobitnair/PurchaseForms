import React from 'react'
import {useNavigate } from 'react-router'
import { CommandBar  } from '@fluentui/react';



const NavBar = () => {
    const nav = useNavigate();
    const itemStyles = {
        label: { fontSize: 18},
        icon: {fontSize : 24 , color:'black'},
        root: {padding: 5 , marginLeft: 5}
    }

    const _farItems = [
        {
            key:'aboutus',
            text:'About Us',
            iconProps: { iconName : 'UserOptional'},
            buttonStyles: itemStyles,
        },
        {
            key:'help',
            text:'Help',
            iconProps: { iconName : 'Error'},
            buttonStyles: itemStyles,
        },
    ]
    
    const _items = [
        { 
            key:'dashboard',
            text: 'DashBoard', 
            iconProps: { iconName: 'ViewDashboard' },
            buttonStyles : itemStyles,
            onClick: ()=>nav('/')
        },
        {   
            key:'newform',
            text: 'New Form', 
            iconProps: { iconName: 'AddToShoppingList' }, 
            buttonStyles : itemStyles,
            onClick: ()=>nav('/forms')
        },
        {
            key:'subform',
            text:'Submitted Forms',
            iconProps: { iconName : 'AllApps'},
            buttonStyles: itemStyles,
        },
        

    ]
    

    return( 
        <div>
            <CommandBar
                items={_items}
                farItems = {_farItems}
            />
        </div>
    )
}

export default NavBar