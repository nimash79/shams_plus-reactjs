import http from "./httpService";
import config from "./config.json";


export const hasCard = () => {
    return http.get(`${config.api}/card/has-account`);
}

export const openAccount = (model) => {
    return http.post(`${config.api}/card/open-account`, JSON.stringify(model));
}

export const viewAccount = () => {
    return http.get(`${config.api}/card/view-account`);
}

export const getCardOwner = (cardNumber) => {
    return http.get(`${config.api}/card/owner/${cardNumber}`);
}

export const requestPin2 = () => {
    return http.get(`${config.api}/card/pin2`);
}

export const cardToCard = (model) => {
    return http.post(`${config.api}/card/card-to-card`, JSON.stringify(model));
}

export const charge = (model) => {
    return http.post(`${config.api}/card/charge`, JSON.stringify(model));
}

export const blockCard = () => {
    return http.post(`${config.api}/card/block`);
}

export const getTransactions = () => {
    return http.get(`${config.api}/card/transactions`);
}

export const getCardSummary = () => {
    return http.get(`${config.api}/card/summary`);
}