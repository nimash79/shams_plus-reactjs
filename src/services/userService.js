import http from "./httpService";
import config from "./config.json";


export const getMe = () => {
    return http.get(`${config.api}/user`);
}

export const changePassword = (model) => {
    return http.post(`${config.api}/user/change-password`, JSON.stringify(model));
}