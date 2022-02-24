
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { DefaultButton, Persona, PersonaSize, Stack , Label  , Depths} from '@fluentui/react';
import { LoginContext } from './LoginContext';

const stackTokens = { childrenGap: 50 };
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
                    backgroundColor:'#f3f2f1',
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
        <div>
            <Stack horizontal tokens={stackTokens} styles={stackStyles}>
                <Stack {...columnProps} >
                    <PersonDetails/>
                </Stack>
            </Stack>
        </div>
    )
}

export default Dashboard
