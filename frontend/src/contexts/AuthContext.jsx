import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { requestLoginApi } from "../services/auth";
import { removeCookie, setCookie } from '../services/config/cookies';

const ModeContext = createContext(null);
const AuthContext = createContext(null);


export const AuthProvider = ({ children }) => {
    const [mode, setMode] = useState(null);

    return (
        <ModeContext.Provider value={mode}>
            <AuthContext.Provider value={setMode}>
                {children}
            </AuthContext.Provider>
        </ModeContext.Provider>
    );
};

export function useMode() {
    return useContext(ModeContext);
}

export function useAuth() {
    return useContext(AuthContext);
}

export function useLogout() {
    const setMode = useContext(AuthContext);
    const navigate = useNavigate();
    return () => {
        setMode(null);
        removeCookie("Authorization");
        removeCookie("RefreshToken");
        navigate("/login");
    }
}

export function useLogin() {
    const navigate = useNavigate();
    const setMode = useContext(AuthContext);
    return (id, password) => {
        requestLoginApi(id, password)
            .then((data) => {
                if (data && data.data) {
                    const { accessToken, refreshToken, user } = data.data.data;
                    if (user.role === "admin") setMode("admin");
                    else setMode("user");

                    if (!accessToken || !refreshToken) {
                        console.error("Missing tokens:", data);
                        return;
                    }
                    setCookie('Authorization', accessToken, { path: '/', secure: false }); // 운영 환경에 맞게 secure 옵션 조정
                    setCookie('RefreshToken', refreshToken, { path: '/', secure: false });
                    navigate("/search");
                } else alert("Login failed: " + data.message);
            }).catch(error => {
                console.error("Login error:", error);
                alert("An error occurred during login.");
            });
    };
}