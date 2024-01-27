import http from "./httpService";
import config from "./config.json";

export const register = model => {
    return http.post(`${config.api}/account/register`, model, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}

export const getActiveCode = (model) => {
    return http.get(`${config.api}/account/active-code`, JSON.stringify(model));
}

export const login = model => {
    return http.post(`${config.api}/account/login`, JSON.stringify(model));
}

export const forgetPassword = model => {
    return http.post(`${config.api}/account/forget-password`, JSON.stringify(model));
}

export const resetPassword = model => {
    return http.post(`${config.api}/account/reset-password`, JSON.stringify(model));
}

export const existsMobile = mobile => {
    return http.get(`${config.api}/account/exists-mobile/${mobile}`);
}

export const existsNationalCode = nationalCode => {
    return http.get(`${config.api}/account/exists-nationalCode/${nationalCode}`);
}