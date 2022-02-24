
import { auth, provider } from "../FireBase";
import {setUser , setLogin} from "../Store/actions"


export function LoginCheck(dispatch){
    auth.onAuthStateChanged(async (authUser) => {
        if (authUser) {
            dispatch(setUser({
                uid: authUser.uid,
                photo: authUser.photoURL,
                email: authUser.email,
            }));
            console.log(authUser.displayName)
        } else {
            dispatch(setUser(null));
        }
    })
}