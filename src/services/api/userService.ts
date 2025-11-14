import axios from 'axios';
import { getApiUrl } from '../../utils/environment';
import { getAuthToken } from '../../utils/auth';
import { UserData } from '../../types/user';

const api = axios.create({
    baseURL: getApiUrl()
});

// Add auth token to requests
api.interceptors.request.use((config) => {
    const token = getAuthToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const userService = {
    getUsers: async (page: number = 1) => {
        try {
            const response = await api.get('/admin/users', {
                params: { page }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    },

    updateUserStatus: async (userId: string, status: 'pending' | 'active' | 'disabled') => {
        try {
            const response = await api.patch(`/admin/users/${userId}/status`, { status });
            return response.data;
        } catch (error) {
            console.error('Error updating user status:', error);
            throw error;
        }
    },

    async getUserDetails(userId: string) {
        try {
            const response = await api.get(`/admin/users/${userId}`);
            return response.data.data;
        } catch (error) {
            console.error('Failed to fetch user details:', error);
            throw new Error('Failed to fetch user details');
        }
    },

    updateUser: async (userId: string, userData: UserData) => {
        try {
            const response = await api.put(`/admin/users/${userId}`, userData);
            return response.data;
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    },

    addBalance: async (userId: string, amount: number) => {
        try {
            // Assumption: backend exposes an endpoint to increment a user's balance
            const response = await api.patch(`/admin/users/${userId}/balance`, { amount });
            return response.data;
        } catch (error) {
            console.error('Error adding balance to user:', error);
            throw error;
        }
    },
};









