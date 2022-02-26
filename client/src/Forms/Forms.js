import { Label, PrimaryButton, Depths} from '@fluentui/react';
import React from 'react'
import { useNavigate } from 'react-router'

import { Grid, GridItem , Button  } from '@chakra-ui/react'

const Forms = () => {
    const nav = useNavigate();
    return(
        <div>
            <Grid mt = '10px' ml='1%' w='96%' h='1000px' 
            templateRows='repeat(12,1fr)' templateColumns='repeat(6,1fr)' 
            gap={4}>
                <GridItem rowSpan={2} colSpan={2} bg='#edebe9' p={2} style={{borderRadius:5 , boxShadow:Depths.depth4}}>
                    <Label style={{fontSize:24}}>SP101</Label>
                    <Label>Indent for purchases below Rs. 25000</Label>
                    <Button bg='#4C4A48' onClick={()=>nav('sp101')} color='white'>Fill Out a Form</Button>
                </GridItem>
                <GridItem rowSpan={2} colSpan={2} bg='#edebe9' p={2} style={{borderRadius:5 , boxShadow:Depths.depth4}}>
                    <Label style={{fontSize:24}}>SP102</Label>
                    <Label>Indent for purchases from Rs. 25000 to Rs. 1.00 Lac  </Label>
                    <Button bg='#4C4A48' onClick={()=>nav('sp101')} color='white'>Fill Out a Form</Button>
                </GridItem>
                <GridItem rowSpan={2} colSpan={2} bg='#edebe9' p={2} style={{borderRadius:5 , boxShadow:Depths.depth4}}>
                    <Label style={{fontSize:24}}>SP103</Label>
                    <Label>Indent for purchases from Rs. 1.00 Lac to Rs. 2.50 Lacs</Label>
                    <Button bg='#4C4A48' onClick={()=>nav('sp101')} color='white'>Fill Out a Form</Button>
                </GridItem>
                <GridItem rowSpan={2} colSpan={2} bg='#edebe9' p={2} style={{borderRadius:5 , boxShadow:Depths.depth4}}>
                    <Label style={{fontSize:24}}>SP104</Label>
                    <Label>Indent for purchases from Rs. 2.50 Lac to Rs. 25.00 Lacs</Label>
                    <Button bg='#4C4A48' onClick={()=>nav('sp101')} color='white'>Fill Out a Form</Button>
                </GridItem>
                <GridItem rowSpan={2} colSpan={2} bg='#edebe9' p={2} style={{borderRadius:5 , boxShadow:Depths.depth4}}>
                    <Label style={{fontSize:24}}>SP105</Label>
                    <Label>Indent for purchases above Rs. 25.00 Lacs</Label>
                    <Button bg='#4C4A48' onClick={()=>nav('sp101')} color='white'>Fill Out a Form</Button>
                </GridItem>

            </Grid>
        </div>
    )
}

export default Forms