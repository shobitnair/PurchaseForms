
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { DefaultButton, Persona, PersonaSize, Stack, Label, Depths, Separator } from '@fluentui/react';
import { LoginContext } from './LoginContext';
import { Grid, GridItem , Button , Avatar , Badge , Text} from '@chakra-ui/react'
import Notifications from '../Profile/Notifications';
import Profile from '../Profile/Profile';


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
                    fontFamily: 'Droid sans mono'
                },
                secondaryText: {
                    fontFamily: 'Droid sans mono'
                },
                root:{margin:'10px'}
            }}
        />)
    }

    const FormItem = ({form,body}) =>{
        return(
            <GridItem  w='100%' h='100%' rowSpan={2} colSpan={3} bg='#edebe9' p={2} style={{borderRadius:5 , boxShadow:Depths.depth4}}>
                <Grid w='100%' h='100%' templateRows='repeat(4,1fr)' templateColumns='repeat(2,1fr)'>
                    <GridItem rowSpan={1} colSpan={2}>
                        <Badge variant = 'outline' style={{fontSize:24}}>{form}</Badge>
                    </GridItem>
                    <GridItem rowSpan={2} colSpan={2} m={2}>
                        <Text as='i'>{body}</Text>
                    </GridItem>
                    <GridItem rowSpan={1} colSpan={1} colStart={2}>
                        <Button colorScheme={'blackAlpha'} 
                        onClick={()=>nav('/site/forms/'+form)} 
                        color='white'
                        disabled={form > 'sp102'}>
                            {form<='sp102'&&'Fill Out a Form'}
                            {form>'sp102'&&'Under Work'}
                        </Button>
                    </GridItem>
                </Grid>
            </GridItem>
        )
    }

    useEffect(() => {
        if (user && role) {
            if(role === 'PURCHASE'){
                nav('/site/admin/forms')
            }
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
    }, [user , role])

    return (<>
            <Grid mt = '10px' ml='2%' w='96%' h='100%' 
            templateRows='repeat(8,1fr)' templateColumns='repeat(10,1fr)' 
            gap={4}>    
                <GridItem w='100%' rowSpan={2} colSpan={3} bg='#edebe9' p={2} style={{borderRadius:5 , boxShadow:Depths.depth4}}>
                    <PersonDetails />
                </GridItem>
                {user && role && (role !== 'PURCHASE') &&
                    <>
                        <GridItem rowSpan={6} colSpan={4} >
                            <Notifications/>
                        </GridItem>
                        <GridItem rowSpan={6} colSpan={3} bg='#edebe9' p={2} style={{borderRadius:5 , boxShadow:Depths.depth4}}>
                            <Profile/>
                        </GridItem>
                    </>
                }
                
                {user && role === 'FACULTY' && <>
                    <FormItem 
                        form='sp101' 
                        body='Indent for purchases below Rs. 25000' 
                    />
                    <FormItem 
                        form='sp102' 
                        body='Indent for purchases from Rs. 25000 to Rs. 1.00 Lac' 
                    />
                    </>
                }
                
            </Grid>
            </>
    )

}

export default Dashboard

