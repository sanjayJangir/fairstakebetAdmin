import { removeAuthToken } from './auth';

export const logout = () => {
    removeAuthToken();
    window.location.href = '/auth/login';
};