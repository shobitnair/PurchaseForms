import axios from "axios";
import { URL } from "../cred";

export const getFormById = async(id) =>{
    const response = await axios.get(URL + '/form/' + id);
    return response.data;
}

export const postForm = async(type , email , data , status) =>{
    const response = await axios.post(URL +'/forms' , {
        type , email , data , status
    });
    return response.data;
}

export const updateForm = async(id , data , status) =>{
    const response = await axios.post(URL +'/forms/update' , {
        id , data , status
    });
    return response.data;
}

export const getDraftById = async(id , email) =>{
    const response = await axios.get(URL + `/draft/${email}/${id}`);
    return response.data;
}

export const getDrafts = async(email) =>{
    const response = await axios.get(URL + `/drafts/${email}`);
    return response.data;
}

export const postDraft = async(email,data,type) => {
    const response = await axios.post(URL +'/drafts' , {email,data,type});
    return response.data;
}

export const deleteDraft = async(id , email) => {
    const response = await axios.post(URL +'/drafts/delete' , {id , email});
    return response.data;
}

export const updateDraft = async(id , email , data) => {
    const response = await axios.post(URL+'/drafts/update' , {id,email , data});
    return response.data;
}

