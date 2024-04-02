import axios from "axios";


export const frontendAPI = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        "Content-Type":"application/json"
    }
});

export const backendAPI = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type":"application/json" 
    }
});