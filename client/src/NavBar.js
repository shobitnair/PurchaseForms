import React, { useContext, useEffect } from 'react'
import {useNavigate  , useLocation} from 'react-router'
import { CommandBar, Depths  } from '@fluentui/react';
import {signIn,  signOut} from './Login/LoginContext'
import { LoginContext } from './Login/LoginContext';
import axios from 'axios';

/**     
 * signin , signout and Postuser are functions for google auth and database insertion 
 * of the corresponding user.
 */


const NavBar = () => {
    const nav = useNavigate();
    const loc = useLocation();
    const {user , role} = useContext(LoginContext);

    const itemStyles = {
        label: { fontSize: 14 , fontWeight:500 },
        icon: {fontSize : 24 , color:'black'},
        root: {padding: 5 , marginLeft: 5 , marginRight:5 , boxShadow:Depths.depth4 , borderRadius:5 },
        iconHovered:{color:'#0078d4'},
        labelHovered:{color:'#0078d4'}
    }

    const _farItems = [
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
            onClick:(!user)? ()=>signIn(nav) : ()=>signOut(nav),
        }
    ]
    
    
    const _items = [
        { 
            key:'dashboard',
            text: 'DashBoard', 
            iconProps: { iconName: 'ViewDashboard' },
            buttonStyles : itemStyles,
            hidden:(role === 'PURCHASE'),
            onClick: ()=>nav('/site')
        },
        {
            key:'subform',
            text:(role==='JAO' || role==='AO' || role ==='AR' || role === 'HOD' || role === 'PURCHASE')?'Received Forms':'Submitted Forms',
            iconProps: { iconName : 'AllApps'},
            buttonStyles: itemStyles,
            disabled:(user === null),
            onClick: (role==='JAO' || role==='AO' || role ==='AR' || role === 'HOD' || role === 'PURCHASE')?()=>nav('/site/admin/forms'):()=>nav('/site/forms/submitted')
        },
        {
            key:'activities',
            text:'Your Activities',
            iconProps: {iconName : 'History'},
            buttonStyles :itemStyles,
            disabled:(user === null),
            hidden:(role === 'PURCHASE'),
            onClick: ()=>nav('/site/admin/activity')
        }
        
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