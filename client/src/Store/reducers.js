const initialState = {
    user:null,
    log:false
}


export const reducer = (state = initialState , action) =>{
    switch(action.type){
        case 'SET_USER':
            return{
                ...state,
                user:action.value,
            }
        case 'SET_LOG':
            return{
                ...state,
                log:true
            }
        default:
            return state
    }
}

