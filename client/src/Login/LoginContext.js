import React , {useState , useEffect} from 'react'
import { auth , provider } from '../FireBase';
import axios from 'axios';
import {URL} from '../cred'
export const LoginContext = React.createContext();

const postUser = async(data) =>{
    try {
        const res = await axios.post(URL+'/users', data);
    }
    catch (err) {
        console.log(err);
    }
} 

const getRole = async(email) =>{
    try {
        const res = await axios.get(URL+'/users/'+email);
        return res.data[0].role;
    }
    catch (err) {
        console.log(err);
    }
}

export const signIn = (nav) => {
    auth.signInWithPopup(provider)
        .catch((error) => alert(error.message));
    
    nav('/site')
};

export const signOut = (nav) => {
    auth.signOut()
        .catch((err) => {
            alert(err.message);
        });
    nav('/site')
}


export const LoginProvider = ({children}) =>{

    const [user , setUser] = useState(null);
    const [role , setRole] = useState(null);
    
    useEffect(()=>{
        auth.onAuthStateChanged(async(authUser)=>{
            if(authUser){
                setUser({
                    uid: authUser.uid,
                    photo: authUser.photoURL,
                    email: authUser.email,
                    name: authUser.displayName,
                })
                await postUser({name: authUser.displayName, email: authUser.email})
                const res = await getRole(authUser.email)
                setRole(res);
            }
            else{
                setUser(null)
                setRole(null)
            }
        })


    } , [])

    return(
        <LoginContext.Provider value={{user , role}}>
            {children}
        </LoginContext.Provider>
    )
}