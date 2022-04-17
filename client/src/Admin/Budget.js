import React from 'react';
import {Grid, GridItem, Stack, Text} from "@chakra-ui/react";
import {DefaultButton, Depths, TextField} from "@fluentui/react";

const Budget = () => {
    return (
        <div>
            <Grid templateColumns='repeat(12,1fr)' templateRows='repeat(12,1fr)' w='100%'  h='600px' gap={4} bg={'whiteAlpha.300'}>
                <GridItem rowSpan={1} colSpan={3} ml={4} mt={4} style={{'alignItems':'center'}}>
                    <Text className='Header' as='b' w="100%"> Enter the Budget Informations </Text>
                </GridItem>
                <GridItem colStart={1} rowSpan = {11} colSpan={3} ml={4}>
                    <div style={{'border': '8px solid #f3f2f1' ,padding:'10px' , backgroundColor:'#f3f2f1', borderRadius: '2px', boxShadow: Depths.depth4 }}>
                        <Stack>
                            <TextField label={"Amount in Rs."}/>
                            <TextField label={"Budget Sanctioned"} />
                            <TextField label={"Budget Available"} />
                            <TextField label={"Budget Booked"} />
                            <TextField label={"Budget Head"} />
                            <TextField label={"Balance Budget"} />
                        </Stack>
                        <Stack style={{'alignItems':'center' , 'marginTop':'20px'}}>
                            <DefaultButton style={{'width':'200px'}}>Submit</DefaultButton>
                        </Stack>
                    </div>
                </GridItem>
            </Grid>
        </div>
    );
}

export default Budget;