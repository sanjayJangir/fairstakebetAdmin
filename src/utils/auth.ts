export const isAuthenticated = () => {
    const token = localStorage.getItem('admin_token');
    return !!token;
};

export const getAuthToken = () => {
    return localStorage.getItem('admin_token');
};

export const setAuthToken = (token: string) => {
    localStorage.setItem('admin_token', token);
};

export const removeAuthToken = () => {
    localStorage.removeItem('admin_token');
};

export const clearAuth = () => {
    removeAuthToken();
};





