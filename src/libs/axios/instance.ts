import environtment from "@/config/environment";
import { SessionExtended } from "@/types/Auth";
import axios from "axios";
import { getSession } from "next-auth/react";


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

        // Memeriksa apakah ada session dari user dan memiliki accessToken. Jika kedua kondisi benar, Authorization header dengan token Bearer akan ditambahkan ke outgoing request. Ini digunakan untuk tujuan autentikasi dan otorisasi, di mana token akses digunakan untuk memverifikasi identitas dan izin pengguna.
        const session: SessionExtended | null = await getSession();
        if (session && session.accessToken) {
            request.headers.Authorization = `Bearer ${session.accessToken}`
        }

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