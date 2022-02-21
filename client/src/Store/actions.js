export const setUser = (user) =>{
    return {
        type:'SET_USER',
        value:user
    }
}

export const setLogin = (flag) =>{
    return {
        type:'SET_LOG' , 
        value:flag
    }
}

