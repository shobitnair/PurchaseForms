
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { DefaultButton, Persona, PersonaSize, Stack , Label  , Depths, Separator} from '@fluentui/react';
import { LoginContext } from './LoginContext';
import Forms from '../Forms/Forms';

const stackTokens = { childrenGap: 20 };
const stackStyles = { root: { 
    width: "370px" , 
    margin:10, 
    boxShadow:Depths.depth8 ,
    backgroundColor:'#f3f2f1',
    borderRadius:3 
} };
const columnProps = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: "100%", padding: 5 } },
};

const Dashboard = () => {
    const navigate = useNavigate();
    const {user} = useContext(LoginContext)
    const [examplePersona, setPersona] = useState(null)
    
    const PersonDetails = () =>{
        return(<Persona
            {...examplePersona}
            showUnknownPersonaCoin={!user}
            size={PersonaSize.size72}
            styles ={{
                primaryText:{
                    fontSize:22
                } , 
                secondaryText:{ 
                    fontFamily:'jetbrains mono'
                } ,
                root:{
                    backgroundColor:'#faf9f8',
                }
            }} 
            />)
    }

    useEffect(() => {
        if(user){
            setPersona({
                ...examplePersona,
                imageUrl: user.photo,
                primaryText: user.name,
                secondaryText: user.email,
            })
        }
        else{
            setPersona({primaryText: 'Please Login',})
        }
    }, [user])
    
    return (
        <Stack vertical>
            <Stack horizontal tokens={stackTokens} styles={stackStyles}>
                <Stack vertical {...columnProps} >
                    <PersonDetails/>
                </Stack>
            </Stack>
            {user && <Forms/>}
        </Stack>
    )
}

export default Dashboard
