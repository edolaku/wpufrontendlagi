// logic dari register:

import authServices from "@/services/auth.service";
import { IRegister } from "@/types/Auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const registerSchema = yup.object().shape({
    fullName: yup.string().required("Full name is required"),
    username: yup.string().required("Username is required"),
    email: yup.string().email('Email is invalid').required("Email is required"),
    password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
    confirmPassword: yup.string().oneOf([yup.ref('password'), ""], 'Passwords not match').required("Confirm password is required"),
})

export const useRegister = () => {

    const router = useRouter();

    const [visiblePassword, setVisiblePassword] = useState({
        // ada 2 state, yaitu password dan confirm password:
        password: false,
        confirmPassword: false
    });


    const handleVisiblePassword = (key: "password" | "confirmPassword") => {
        setVisiblePassword({
            ...visiblePassword,
            // menggunakan Computed Property Names javaScript:
            [key]: !visiblePassword[key]
        })
    }

    const { control, handleSubmit, formState: { errors }, reset, setError } = useForm({
        resolver: yupResolver(registerSchema),
        // defaultValues: {
        //     fullName: '',
        //     username: '',
        //     email: '',
        //     password: '',
        //     confirmPassword: ''
        // },
    })

    

    const registerService = async (payload: IRegister) => {
        const result = await authServices.register(payload);
        return result;
    };

    // isPending untuk mengecek apakah sedang loading, sehingga dapat diberi ui loading
    const { mutate: mutateRegister, isPending: isPendingRegister } = useMutation({
        mutationFn: registerService,
        onError: (error) => {
            console.log('error dari backend:', error);
            
            setError('root', {
                message: error.message,
            })
        },
        onSuccess: () => {
            router.push('/auth/register/success');
            reset();
        },
    });

    const handleRegister = (data: IRegister) => {
        mutateRegister(data);
    }

    return { visiblePassword, handleVisiblePassword, control, handleSubmit, handleRegister, isPendingRegister, errors }
}

export default useRegister