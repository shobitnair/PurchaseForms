import { Label, PrimaryButton, Text } from '@fluentui/react';
import React from 'react'
import { useNavigate } from 'react-router'

import { Grid, GridItem  } from '@chakra-ui/react'

const Forms = () => {
    const nav = useNavigate();
    return(
        <div>
            <Grid mt = '10px' ml='2%' w='96%' h='500px' 
            templateRows='repeat(6,1fr)' templateColumns='repeat(6,1fr)' 
            gap={2}>
                <GridItem rowSpan={2} colSpan={2} bg='#edebe9' p={2} style={{borderRadius:5}}>
                    <Label style={{fontSize:24}}>SP101</Label>
                    <Label>Indent for purchases below Rs. 25000</Label>
                    <PrimaryButton style={{position:'relative', left:'65%' , top:'20%'}} 
                        onClick={()=>nav('sp101')}> Fill Out a Form</PrimaryButton>
                </GridItem>
                <GridItem rowSpan={2} colSpan={2} bg='#edebe9' p={2} style={{borderRadius:5}}>
                    <Label style={{fontSize:24}}>SP102</Label>
                    <Label>Indent for purchases from Rs. 25000 to Rs. 1.00 Lac  </Label>
                    <PrimaryButton style={{position:'relative', left:'65%' , top:'20%'}} 
                        onClick={()=>nav('sp102')}> Fill Out a Form</PrimaryButton>
                </GridItem>
                <GridItem rowSpan={2} colSpan={2} bg='#edebe9' p={2} style={{borderRadius:5}}>
                    <Label style={{fontSize:24}}>SP103</Label>
                    <Label>Indent for purchases from Rs. 1.00 Lac to Rs. 2.50 Lacs</Label>
                    <PrimaryButton style={{position:'relative', left:'65%' , top:'20%'}} 
                        onClick={()=>nav('sp103')}> Fill Out a Form</PrimaryButton>
                </GridItem>
                <GridItem rowSpan={2} colSpan={2} bg='#edebe9' p={2} style={{borderRadius:5}}>
                    <Label style={{fontSize:24}}>SP104</Label>
                    <Label>Indent for purchases from Rs. 2.50 Lac to Rs. 25.00 Lacs</Label>
                    <PrimaryButton style={{position:'relative', left:'65%' , top:'20%'}} 
                        onClick={()=>nav('sp104')}> Fill Out a Form</PrimaryButton>
                </GridItem>
                <GridItem rowSpan={2} colSpan={2} bg='#edebe9' p={2} style={{borderRadius:5}}>
                    <Label style={{fontSize:24}}>SP105</Label>
                    <Label>Indent for purchases above Rs. 25.00 Lacs</Label>
                    <PrimaryButton style={{position:'relative', left:'65%' , top:'20%'}} 
                        onClick={()=>nav('sp105')}> Fill Out a Form</PrimaryButton>
                </GridItem>

            </Grid>
        </div>
    )
}

export default Forms