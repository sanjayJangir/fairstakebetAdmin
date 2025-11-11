import { api } from './api';

interface ChatStats {
  totalMessages: number;
  activeUsers: number;
  bannedUsers: number;
}

interface ChatResponse {
  success: boolean;
  data: ChatStats;
}

export const chatService = {
  banUser: async (username: string) => {
    try {
      const response = await api.post('/admin/chat/ban', { username });
      return response.data;
    } catch (error) {
      console.error('Error banning user:', error);
      throw error;
    }
  },

  getChatStats: async (): Promise<ChatStats> => {
    try {
      const response = await api.get<ChatResponse>('/admin/chat/stats');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching chat stats:', error);
      throw error;
    }
  },

  getChatHistory: async (hours: number = 24) => {
    try {
      const response = await api.get(`/admin/chat/history?hours=${hours}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching chat history:', error);
      throw error;
    }
  }
};

