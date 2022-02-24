import React, { useEffect } from 'react'
import {useNavigate  , useLocation} from 'react-router'
import { CommandBar, Depths  } from '@fluentui/react';
import { LoginCheck } from './Login/LoginCheck';
import { useSelector , useDispatch } from 'react-redux';
import {auth , provider} from './FireBase'
import axios from 'axios';
import { setUser } from './Store/actions';
import { URL } from './cred';

/**
 * signin , signout and Postuser are functions for google auth and database insertion 
 * of the corresponding user.
 */
const signin = () => {
    auth.signInWithPopup(provider)
        .catch((error) => alert(error.message));
};

const signOut = () => {
    auth.signOut(provider)
        .catch((err) => {
            alert(err.message);
        });
}

const postUser = async(data) =>{
    try {
        const res = await axios.post(URL+'/users', data);
        console.log(res);
    }
    catch (err) {
        console.log(err);
    }
}



const NavBar = () => {
    const nav = useNavigate();
    const state = useSelector(state=>state);
    const dispatch = useDispatch();
    const loc = useLocation();


    const itemStyles = {
        label: { fontSize: 14 , fontWeight:500 },
        icon: {fontSize : 24 , color:'black'},
        root: {padding: 5 , marginLeft: 5 , marginRight:5 , boxShadow:Depths.depth4 , borderRadius:5 },
        iconHovered:{color:'#038387'},
        labelHovered:{color:'#038387'}
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
            text:(!state.user)?"Login":"Logout" , 
            iconProps: { iconName : (!state.user)?'UserFollowed':'UserRemove'},
            buttonStyles: {
                ...itemStyles , 
                icon:{fontSize:22 , color:'white'} , 
                iconHovered:{color:(!state.user)?'#004b1c':'#740912'},
                labelHovered:{color:(!state.user)?'#004b1c':'#740912'}
            },
            style:{color:'white', backgroundColor:(!state.user)?'#4e9668':'#d83b01'},
            onClick:(!state.user)? ()=>signin() : ()=>signOut(),
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
        auth.onAuthStateChanged(async(authUser)=>{
            if(authUser){
                dispatch(setUser({
                    uid: authUser.uid,
                    photo: authUser.photoURL,
                    email: authUser.email,
                    displayName: authUser.displayName,
                }));
                const {email , displayName} = authUser
                postUser({email , name:displayName});
            }
            else{
                dispatch(setUser(null));
            }
        })
    } , [])


    return( 
        
        <div>
            <CommandBar
                items={_items}
                farItems = {_farItems}
                styles={{root:{
                    backgroundColor:'#a19f9d',
                    padding:8,
                    borderBottom:'6px solid #8a8886',
                    borderRadius:5,
                    boxShadow:Depths.depth4
                }}}
            />
        </div>
    )
}

export default NavBar