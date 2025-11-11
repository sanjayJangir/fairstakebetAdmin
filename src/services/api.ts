import axios, { AxiosResponse } from 'axios';
import { toast } from 'sonner';

interface ProfileUser {
  user_id: string;
  username: string;
  email: string;
  current_level: string;
  is_verified: boolean;
}

interface ApiResponse {
  users: ProfileUser[];
  totalPages: number;
  currentPage: number;
}

const api = axios.create({
  baseURL: import.meta.env.DEV ? 'http://localhost:8000' : 'https://api.fairstakebet.com' // adjust this to your backend URL
});

export const userService = {
  getUsers: async (page: number = 1, limit: number = 20): Promise<ApiResponse> => {
    try {
      const response: AxiosResponse = await api.get(`/users/profiles?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || 'Failed to fetch users';
        toast.error(message);
        throw new Error(message);
      }
      throw error;
    }
  },

  disableUser: async (userId: string): Promise<void> => {
    try {
      await api.post(`/users/${userId}/disable`);
      toast.success('User disabled successfully');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || 'Failed to disable user';
        toast.error(message);
        throw new Error(message);
      }
      throw error;
    }
  }
};


