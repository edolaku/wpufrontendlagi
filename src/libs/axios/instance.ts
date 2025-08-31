import environtment from "@/config/environment";
import axios from "axios";

const headers = {
    "Content-Type": "application/json",
}

const instance = axios.create({
    baseURL: environtment.production,
    headers,
    timeout: 60 * 1000,
});

// untuk mengintercept request/response
// karena nantinya utk mengecek error dan session
instance.interceptors.request.use(
    async (request) => {
        return request
    },
    (error) => {
        return Promise.reject(error)
    }

)

instance.interceptors.response.use(
    async (response) => {
        return response
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default instance;