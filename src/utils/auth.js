export const getToken = () => localStorage.getItem('access_token');
export const saveToken = (token) => localStorage.setItem('access_token', token);
export const removeToken = () => {
    localStorage.removeItem('access_token');
};

export const getUserFromToken = () => {
    const token = getToken();
    if (!token) return null;
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    const tokenPayload = JSON.parse(atob(base64));
    return tokenPayload.sub.username || null;
};
