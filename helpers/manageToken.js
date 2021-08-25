const tokenName = 'token';

export const getToken = () => {
    return window.localStorage.getItem(tokenName)
};

export const setToken = token => {
    window.localStorage.setItem(tokenName, token);
};

export const unsetToken = () => {
    window.localStorage.removeItem(tokenName);
};

export default {getToken, setToken, unsetToken}
