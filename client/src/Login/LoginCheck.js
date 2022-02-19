
import { auth, provider } from "../FireBase";
import {setUser , setLogin} from "../Store/actions"

export async function LoginCheck(dispatch){
    auth.onAuthStateChanged(async (authUser) => {
        if (authUser) {
            dispatch(setUser({
                uid: authUser.uid,
                photo: authUser.photoURL,
                email: authUser.email,
                displayName: authUser.displayName,
            }));
            console.log(authUser.email);
        } else {
            dispatch(setUser(null));
            dispatch(setLogin(false));
        }
    });
}