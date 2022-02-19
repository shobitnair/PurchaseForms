
import React, { useEffect, useState } from 'react'
import { auth, provider } from "../FireBase";
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setLogin } from '../Store/actions';
import Sp101 from '../Forms/Sp101';
import { DefaultButton, Persona, PersonaSize, Stack , Label } from '@fluentui/react';

const stackTokens = { childrenGap: 50 };
const stackStyles = { root: { width: "400px" } };
const columnProps = {
  tokens: { childrenGap: 8 },
  styles: { root: { width: "100%", padding: "20px" } },
};

const Login = () => {
    const navigate = useNavigate();
    const state = useSelector(state => state);
    const dispatch = useDispatch();

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

    const [examplePersona, setPersona] = useState({
        imageUrl: '',
        text: '',
        secondaryText: '',
        tertiaryText: 'Faculty',
    })

    const postUser = async(data) =>{
        try {
            const res = await axios.post('http://localhost:8000/users', data);
            console.log(res);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {

        //auth.signOut();

        auth.onAuthStateChanged(async (authUser) => {
            if (authUser) {

                dispatch(setUser({
                    uid: authUser.uid,
                    photo: authUser.photoURL,
                    email: authUser.email,
                    displayName: authUser.displayName,
                }));
                setPersona({
                    ...examplePersona,
                    imageUrl: authUser.photoURL,
                    text: authUser.displayName,
                    secondaryText: authUser.email
                })
                const {email , displayName} = authUser
                postUser({email , name:displayName});

            } else {
                console.log(authUser);
                dispatch(setUser(null));
                dispatch(setLogin(false));
            }
        })
        ;


    }, [])
    return (
        <div>
            {!state.user && (
                <DefaultButton onClick={signin} text="Login using Google" />
            )}
            {state.user && (
                <Stack horizontal tokens={stackTokens} styles={stackStyles}>
                    <Stack {...columnProps} style={{ 'backgroundColor': '#EFF6FC' }}>
                        <DefaultButton onClick={signOut} text="Logout" style={{'width':'150px'}} />
                        <Persona
                            {...examplePersona}
                            size={PersonaSize.size72} />
                        <Label/>
                        <Label>Purchase Forms</Label>
                        <DefaultButton 
                        style={{'width':'150px'}}
                        text="SP-101" onClick={() => navigate("/sp101")} />
                    </Stack>
                </Stack>
            )}
        </div>
    )
}

export default Login
