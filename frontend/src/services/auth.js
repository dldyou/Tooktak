import axiosInstance from './config/axiosInstance';

export async function requestLoginApi(id, pw) {
    return axiosInstance.post("account/login", {
        username: id,
        password: pw,
    });
}


