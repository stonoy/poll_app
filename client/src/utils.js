import axios from "axios"

export const customFetch = axios.create({
    baseURL: location.hostname == "localhost" ? "http://localhost:8080/api/v1" : "/api/v1",
})