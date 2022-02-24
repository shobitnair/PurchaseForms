
import React, { useEffect, useState } from 'react'
import { auth, provider } from "../FireBase";
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setLogin } from '../Store/actions';
import Sp101 from '../Forms/Sp101';
import { DefaultButton, Persona, PersonaSize, Stack , Label  , Depths} from '@fluentui/react';
import { URL } from '../cred';
import './login.css'

const stackTokens = { childrenGap: 50 };
const stackStyles = { root: { 
    width: "370px" , 
    margin:10, 
    boxShadow:Depths.depth4 ,
    backgroundColor:'#faf9f8'
} };
const columnProps = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: "100%", padding: 5 } },
};

const Dashboard = () => {
    const navigate = useNavigate();
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const [examplePersona, setPersona] = useState({text:'Please Login'})

    useEffect(() => {
        auth.onAuthStateChanged(async (authUser) => {
            if (authUser) {
                setPersona({
                    ...examplePersona,
                    imageUrl: authUser.photoURL,
                    text: authUser.displayName,
                    secondaryText: authUser.email
                })
            } else {
                console.log(authUser);
                setPersona({text:'Please Login'});
            }
        })
    }, [])
    
    return (
        <div>
            <Stack horizontal tokens={stackTokens} styles={stackStyles}>
                <Stack {...columnProps} >
                    <Persona
                        {...examplePersona}
                        showUnknownPersonaCoin={!state.user}
                        size={PersonaSize.size72} 
                        />
                </Stack>
            </Stack>
        </div>
    )
}

export default Dashboard
