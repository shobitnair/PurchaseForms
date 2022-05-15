import { AccordionDescendantsProvider } from "@chakra-ui/react";
import axios from "axios";
import { URL } from "../cred";

export const getFormById = async(id) =>{
    const response = await axios.get(URL + '/form/' + id);
    return response.data;
}

export const postForm = async(type , email , data , status , department) =>{
    const response = await axios.post(URL +'/forms' , {
        type , email , data , status , department
    });
    return response.data;
}

export const updateForm = async(id , data , status) =>{
    const response = await axios.post(URL +'/forms/update' , {
        id , data , status
    });
    return response.data;
}

export const acceptForm = async(id , role) => {
    const response = await axios.post(URL + '/admin/forms/accept' , {id,role})
    return response.data;
}

export const denyForm = async(id , role , message) => {
    const response = await axios.post(URL + '/admin/forms/deny' , {id , message , role});
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


export const updateBudget = async(id , data) => {
    const response = await axios.post(URL+'/jao/forms/budget' , {id,data})
    return response.data;
}


export const getAdminForms = async(department , role) => {
    const response = await axios.post(URL+'/admin/forms/load',{department , role})
    return response
}


export const getProfileDetails = async(email) => {
    const response = await axios.post(URL+'/profile',{email});
    return response.data;
}

export const updateProfileDetails = async(data) => {
    const {name,department,signature, email} = data; 
    const response = await axios.post(URL+'/profile/update',{name,department,signature,email});
    return response.data; 
}   

export const getActivities = async(email) => {
    const response = await axios.post(URL+'/activities' , {email:email});
    return response.data
}

export const addActivities = async(email , message , type , heading) => {
    const response = await axios.post(URL+'/activities/add' , {email , message , type , heading})
    return response.data
}

export const getNotifications = async(email) => {
    const response = await axios.post(URL+'/notifications' , {email:email});
    return response.data
}

export const addNotifications = async(email , message , type , heading) => {
    const response = await axios.post(URL+'/notifications/add' , {email , message , type , heading})
    return response.data
}

export const getEmailbyROLE = async(role) => {
    const response = await axios.post(URL + '/email' , {role});
    return response.data;
}