import React , {useState , useEffect} from 'react'
import { auth , provider } from '../FireBase';
import axios from 'axios';
import {URL} from '../cred'
export const LoginContext = React.createContext();

const postUser = async(data) =>{
    try {
        const res = await axios.post(URL+'/users', data);
        console.log(res);
    }
    catch (err) {
        console.log(err);
    }
} 

export const signin = () => {
    auth.signInWithPopup(provider)
        .catch((error) => alert(error.message));
};

export const signOut = () => {
    auth.signOut(provider)
        .catch((err) => {
            alert(err.message);
        });
}


export const LoginProvider = ({children}) =>{

    const [user , setUser] = useState(null);
    
    useEffect(()=>{
        auth.onAuthStateChanged(async(authUser)=>{
            if(authUser){
                setUser({
                    uid: authUser.uid,
                    photo: authUser.photoURL,
                    email: authUser.email,
                    name: authUser.displayName,
                })
                postUser({name:authUser.displayName , email:authUser.email})
            }
            else{
                setUser(null)
            }
        })
    } , [])

    return(
        <LoginContext.Provider value={{user}}>
            {children}
        </LoginContext.Provider>
    )
}