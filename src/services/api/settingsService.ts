import { api } from './api';

export interface ProfileData {
  name: string;
  email: string;
}

export interface SystemSettings {
  maintenance: boolean;
  chatEnabled: boolean;
  maxUsers: number;
  theme: string;
  emailNotifications: boolean;
  backupFrequency: string;
}

export const settingsService = {
  updateProfile: async (data: ProfileData) => {
    const response = await api.put('/admin/settings/profile', data);
    return response.data;
  },

  changePassword: async (data: {
    currentPassword: string;
    newPassword: string;
  }) => {
    const response = await api.put('/admin/settings/password', data);
    return response.data;
  },

  getSystemSettings: async () => {
    const response = await api.get('/admin/settings/system');
    return response.data;
  },

  updateSystemSettings: async (data: SystemSettings) => {
    const response = await api.put('/admin/settings/system', data);
    return response.data;
  },
};