import {Text} from "@chakra-ui/react";
import React from "react";

export const gridStyle = {
    root: {
        overflowX:'scroll',
        selectors: {
            '& [role=grid]': {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                height: '600px'
            },
        },
    },
    headerWrapper: {
        flex: '0 0 auto',
        width:'100%'

    },
    contentWrapper: {
        flex: '1 1 auto',
        overflowY: 'auto',
        overflowX: 'auto',
        width:'100%'
    },
};

export const ColumnHeader = (text) =>{
    return <Text className='Header' as='b' w="100%">{text}</Text>
}

export const formatDate = (date) => {
    if (!date)
        return '';
    const month = date.getMonth() + 1; // + 1 because 0 indicates the first Month of the Year.
    const day = date.getDate();
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
};