// logic dari register:

import { useState } from "react";

export const useRegister = () => {
    const [visiblePassword, setVisiblePassword] = useState({
        // ada 2 state, yaitu password dan confirm password:
        password: false,
        passwordConfirmation: false
    });

    const handleVisiblePassword = (key: "password" | "passwordConfirmation") => {
        setVisiblePassword({
            ...visiblePassword,
            // menggunakan Computed Property Names javaScript:
            [key]: !visiblePassword[key]
        })
    }

    return { visiblePassword, handleVisiblePassword }
}