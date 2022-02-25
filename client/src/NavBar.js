import React, { useContext, useEffect } from 'react'
import {useNavigate  , useLocation} from 'react-router'
import { CommandBar, Depths  } from '@fluentui/react';
import {signin , signOut} from './Login/LoginContext'
import { LoginContext } from './Login/LoginContext';

/**     
 * signin , signout and Postuser are functions for google auth and database insertion 
 * of the corresponding user.
 */


const NavBar = () => {
    const nav = useNavigate();
    const loc = useLocation();
    const {user} = useContext(LoginContext);

    const itemStyles = {
        label: { fontSize: 14 , fontWeight:500 },
        icon: {fontSize : 24 , color:'black'},
        root: {padding: 5 , marginLeft: 5 , marginRight:5 , boxShadow:Depths.depth4 , borderRadius:5 },
        iconHovered:{color:'#0078d4'},
        labelHovered:{color:'#0078d4'}
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
        {
            key:'log',
            text:(!user)?"Login":"Logout" , 
            iconProps: { iconName : (!user)?'UserFollowed':'UserRemove'},
            buttonStyles: {
                ...itemStyles , 
                icon:{fontSize:22 , color:'white'} , 
                iconHovered:{color:(!user)?'#004b1c':'#740912'},
                labelHovered:{color:(!user)?'#004b1c':'#740912'}
            },
            style:{color:'white', backgroundColor:(!user)?'#4e9668':'#d83b01'},
            onClick:(!user)? ()=>signin() : ()=>signOut(),
        }
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
            onClick: ()=>nav('/forms/submitted')
        },
    ]

    useEffect(()=>{
        
    } , [])


    return( 
        
        <div>
            <CommandBar
                items={_items}
                farItems = {_farItems}
                styles={{root:{
                    backgroundColor:'#484644',
                    padding:8,
                    borderBottom:'6px solid #605e5c',
                    height:70,
                    boxShadow:Depths.depth4
                }}}
            />
        </div>
    )
}

export default NavBar