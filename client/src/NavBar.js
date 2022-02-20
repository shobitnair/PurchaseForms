import React from 'react'
import {useNavigate } from 'react-router'
import { CommandBar  } from '@fluentui/react';



const NavBar = () => {
    const nav = useNavigate();
    const _farItems = []
    const itemStyles = {
        label: { fontSize: 18},
        icon: {fontSize : 24 , color:'black'},
        root: {padding: 10}
    }
    const _items = [
        { 
            text: 'Login', 
            iconProps: { iconName: 'UserFollowed' },
            buttonStyles : itemStyles,
            onClick: ()=>nav('/')
        },
        {   
            text: 'New Form', 
            iconProps: { iconName: 'AddToShoppingList' }, 
            buttonStyles : itemStyles,
            onClick: ()=>nav('/forms')
        },
        {
            text:'Submitted Forms',
            iconProps: { iconName : 'WorkFlow'},
            buttonStyles: itemStyles,
        }
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