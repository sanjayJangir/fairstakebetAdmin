import { useEffect, useState } from 'react';
import { Label, TextInput, Button, Checkbox } from 'flowbite-react';
import { toast } from 'sonner';
import { api } from '../../services/api/api';

interface Setting {
  key: string;
  value: boolean | number | string;
  type: 'boolean' | 'number' | 'string';
  description: string;
}

interface SettingsData {
  [section: string]: Setting[];
}

export default function SystemSettings() {
  const [settings, setSettings] = useState<SettingsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const resp = await api.get('/admin/settings/system');
      setSettings(resp.data.data || resp.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load system settings');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (section: string, key: string, value: boolean | number | string) => {
    setSettings(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        [section]: prev[section].map(s =>
          s.key === key ? { ...s, value } : s
        )
      };
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    try {
      // Build payload: flatten all settings
      const payload: Record<string, boolean | number | string> = {};
      Object.values(settings).forEach(section => {
        section.forEach(setting => {
          payload[setting.key] = setting.value;
        });
      });
      await api.put('/admin/settings/system', payload);
      toast.success('System settings updated successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update system settings');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setSettings(null);
    loadSettings();
  };

  const formatLabel = (key: string): string => {
    return key
      .replace(/_/g, ' ')                    // Replace underscores with spaces
      .replace(/([a-z])([A-Z])/g, '$1 $2')  // Split camelCase
      .replace(/\b\w/g, char => char.toUpperCase()) // Capitalize each word
      .trim();
  };

  if (loading && !settings) {
    return <div className="p-6">Loading system settings...</div>;
  }

  const sectionIcons: Record<string, string> = {
    email: '📧',
    game: '🎮',
    payment: '💳',
    security: '🔒',
    system: '⚙️',
    user: '👤'
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">System Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Manage and configure all system settings and features</p>
      </div>

      <form onSubmit={handleSave}>
        <div className="grid grid-cols-1 gap-6">
          {settings && Object.entries(settings).map(([section, sectionSettings]) => (
            <div key={section} className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray overflow-hidden">
              {/* Section Header */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{sectionIcons[section] || '⚙️'}</span>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
                      {section.replace(/_/g, ' ')} Settings
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {sectionSettings.length} settings
                    </p>
                  </div>
                </div>
              </div>

              {/* Section Content */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sectionSettings.map(setting => (
                    <div key={setting.key} className="flex flex-col">
                      {setting.type === 'boolean' ? (
                        <div className="flex items-start space-x-3 h-full p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                          <Checkbox
                            checked={!!setting.value}
                            onChange={(e) => handleChange(section, setting.key, (e.target as HTMLInputElement).checked)}
                            id={`${section}-${setting.key}`}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <Label htmlFor={`${section}-${setting.key}`} className="font-medium text-gray-900 dark:text-white cursor-pointer">
                              {formatLabel(setting.key)}
                            </Label>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{setting.description}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col h-full">
                          <Label 
                            htmlFor={`${section}-${setting.key}`} 
                            value={formatLabel(setting.key)}
                            className="font-medium text-gray-900 dark:text-white mb-2"
                          />
                          <TextInput
                            id={`${section}-${setting.key}`}
                            type={setting.type === 'number' ? 'number' : 'text'}
                            value={setting.value}
                            onChange={(e) => handleChange(section, setting.key, setting.type === 'number' ? Number(e.target.value) : e.target.value)}
                            className="mb-2 flex-1"
                            placeholder={`Enter ${setting.type}`}
                          />
                          <p className="text-xs text-gray-600 dark:text-gray-400">{setting.description}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-8 pt-6">
          <Button 
            color="primary" 
            type="submit" 
            disabled={saving}
            className="px-6 py-2 font-medium"
          >
            {saving ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">⏳</span>
                Saving...
              </span>
            ) : (
              'Save All Settings'
            )}
          </Button>
          <Button 
            color="gray" 
            type="button" 
            onClick={handleReset}
            className="px-6 py-2 font-medium"
          >
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
}
