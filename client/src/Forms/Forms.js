import { Label, PrimaryButton } from '@fluentui/react';
import React from 'react'
import { useNavigate } from 'react-router'

const Forms = () => {
    const nav = useNavigate();
    return(
        <div>
            <Label/>
            <PrimaryButton onClick={()=>nav('sp101')}>SP 101</PrimaryButton>
            <Label/>
            <PrimaryButton onClick={()=>nav('sp102')}>SP 102</PrimaryButton>
            <Label/>
            <PrimaryButton onClick={()=>nav('sp103')}>SP 103</PrimaryButton>
        </div>
    )
}

export default Forms