
import { auth, provider } from "../FireBase";
import {setUser , setLogin} from "../Store/actions"


export function LoginCheck(state , dispatch){
    auth.onAuthStateChanged(async (authUser) => {
        if (authUser) {
            dispatch(setUser({
                uid: authUser.uid,
                photo: authUser.photoURL,
                email: authUser.email,
                displayName: authUser.displayName,
            }));
        } else {
            dispatch(setUser(null));
        }
    });
}