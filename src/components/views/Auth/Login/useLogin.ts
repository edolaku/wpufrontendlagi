// logic dari login:

import { ILogin, } from "@/types/Auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const loginSchema = yup.object().shape({
    identifier: yup.string().required("Username/Email is required"),
    password: yup.string().required("Password is required"),
})

export const useLogin = () => {

    const router = useRouter();

    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const callbackUrl: string = (router.query.callbackUrl as string) || '/';

    const { control, handleSubmit, formState: { errors }, reset, setError } = useForm({
        resolver: yupResolver(loginSchema),
    })



const loginService = async (payload: ILogin) => {
        const result = await signIn('credentials', {
            ...payload,
            redirect: false,
            callbackUrl,
        });

        // console.log("👉 [useLogin] payload:", payload);
        console.log("👉 [useLogin] result:", result);

        if (result?.error && result.status === 401) {
            throw new Error("Email or username did not match with your password");
        }
    };

    // isPending untuk mengecek apakah sedang loading, sehingga dapat diberi ui loading
    const { mutate: mutateLogin, isPending: isPendingLogin } = useMutation({
        mutationFn: loginService,
        onError: (error) => {
            console.log('error dari backend:', error);

            setError('root', {
                message: error.message,
            })
        },
        onSuccess: () => {
            router.push(callbackUrl);
            reset();
        },
    });

    const handleLogin = (data: ILogin) => {
        mutateLogin(data);
    }

    return { isVisible, toggleVisibility, control, handleSubmit, handleLogin, isPendingLogin, errors }
}

export default useLogin