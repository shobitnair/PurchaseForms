
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { DefaultButton, Persona, PersonaSize, Stack, Label, Depths, Separator } from '@fluentui/react';
import { LoginContext } from './LoginContext';
import { Grid, GridItem , Button , Avatar , Badge , Text} from '@chakra-ui/react'


const Dashboard = () => {
    const nav = useNavigate();
    const { user  , role} = useContext(LoginContext)
    const [examplePersona, setPersona] = useState(null)

    const PersonDetails = () => {
        return (<Persona
            {...examplePersona}
            showUnknownPersonaCoin = {!user}
            size={PersonaSize.size100}
            styles={{
                text: {
                    fontSize: 22 , 
                    fontFamily: 'Open Sans'
                },
                secondaryText: {
                    fontFamily: 'Open Sans'
                },
                root:{margin:'10px'}
            }}
        />)
    }

    const FormItem = ({form,body}) =>{
        return(
            <GridItem rowSpan={2} colSpan={2} bg='#edebe9' p={2} style={{borderRadius:5 , boxShadow:Depths.depth4}}>
                <Grid w='100%' h='100%' templateRows='repeat(4,1fr)' templateColumns='repeat(2,1fr)'>
                    <GridItem rowSpan={1} colSpan={2}>
                        <Badge variant = 'outline' style={{fontSize:24}}>{form}</Badge>
                    </GridItem>
                    <GridItem rowSpan={2} colSpan={2} m={2}>
                        <Text as='i'>{body}</Text>
                    </GridItem>
                    <GridItem rowSpan={1} colSpan={1} colStart={2}>
                        <Button colorScheme={'blackAlpha'} onClick={()=>nav('/forms/'+form)} color='white'>Fill Out a Form</Button>
                    </GridItem>
                </Grid>
            </GridItem>
        )
    }

    useEffect(() => {
        if (user) {
            setPersona({
                ...examplePersona,
                imageUrl: user.photo,
                text: user.name,
                secondaryText: user.email,
                tertiaryText : role
            })
        }
        else {
            setPersona({ text: 'Please Login', })
        }
    }, [user])

    return (
            <Grid mt = '10px' ml='2%' w='96%' h='650px' 
            templateRows='repeat(8,1fr)' templateColumns='repeat(8,1fr)' 
            gap={4}>    
                <GridItem rowSpan={2} colSpan={2} bg='#edebe9' p={2} style={{borderRadius:5 , boxShadow:Depths.depth4}}>
                    <PersonDetails />
                </GridItem>
                {user && <>
                    <FormItem 
                        form='sp101' 
                        body='Indent for purchases below Rs. 25000' 
                    />
                    <FormItem 
                        form='sp102' 
                        body='Indent for purchases from Rs. 25000 to Rs. 1.00 Lac' 
                    />
                    <FormItem 
                        form='sp103' 
                        body='Indent for purchases from Rs. 1.00 Lac to Rs. 2.50 Lacs' 
                    />
                    <FormItem 
                        form='sp104' 
                        body='Indent for purchases from Rs. 2.50 Lac to Rs. 25.00 Lacs' 
                    />
                    <FormItem
                        form='sp105'
                        body='Indent for purchases above Rs. 25.00 Lacs'
                    />
                    </>
                }
            </Grid>
    )

}

export default Dashboard

