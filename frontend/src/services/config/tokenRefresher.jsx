import axiosInstance from "./axiosInstance";
import { useEffect } from 'react';
import { useLogout } from "../../contexts/AuthContext";
import { getCookie, setCookie } from "./cookies";

function TokenRefresher() {
    const logout = useLogout();

    useEffect(() => {
        const interceptor = axiosInstance.interceptors.response.use(
            (response) => {
                return response;
            },
            async (error) => {
                if (error.config && !error.config._retry && error.response && error.response.status === 401) {
                    error.config._retry = true;
                    const refreshtoken = getCookie("RefreshToken");
                    try {
                        const res = await axiosInstance.post('account/refresh', { refreshToken: refreshtoken });
                        if (res.status === 200 && res.data.accessToken) {
                            setCookie("Authorization", res.data.accessToken, {});
                            error.config.headers["Authorization"] = `Bearer ${getCookie("Authorization")}`;
                            return axiosInstance(error.config);
                        }
                    } catch (refreshError) {
                        logout();
                        return Promise.reject(refreshError);
                    }
                }
                logout();
                return Promise.reject(error);
            }
        );
        return () => {
            axiosInstance.interceptors.response.eject(interceptor);
        };
    }, [logout]);

    return null;
}

export const RefreshTokenProvider = ({ children }) => {
    return (
        <>
            <TokenRefresher />
            {children}
        </>
    );
};

export default TokenRefresher;
