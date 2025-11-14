import { useEffect, useState } from 'react';
import { Label, TextInput, Button, Checkbox, Select } from 'flowbite-react';
import { settingsService } from '../../services/api/settingsService';
import type { SystemSettings } from '../../services/api/settingsService';
import { toast } from 'sonner';

export default function SystemSettings() {
  const [settings, setSettings] = useState<SystemSettings | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const resp = await settingsService.getSystemSettings();
        // assume API returns the settings object directly
        setSettings(resp.data || resp);
      } catch (error) {
        console.error(error);
        toast.error('Failed to load system settings');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleChange = <K extends keyof SystemSettings>(key: K, value: SystemSettings[K]) => {
    setSettings(prev => prev ? { ...prev, [key]: value } : prev);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    try {
      await settingsService.updateSystemSettings(settings);
      toast.success('System settings updated');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update system settings');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    // reload from server
    setSettings(null);
    setLoading(true);
    settingsService.getSystemSettings()
      .then((resp) => setSettings(resp.data || resp))
      .catch((err) => { console.error(err); toast.error('Failed to reload settings'); })
      .finally(() => setLoading(false));
  };

  if (loading && !settings) {
    return <div className="p-6">Loading system settings...</div>;
  }

  return (
    <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 w-full">
      <h3 className="text-lg font-semibold mb-4">System Settings</h3>

      <form onSubmit={handleSave} className="grid grid-cols-12 gap-6">
        <div className="lg:col-span-6 col-span-12">
          <div className="mb-4">
            <Checkbox
              checked={!!settings?.maintenance}
              onChange={(e) => handleChange('maintenance', (e.target as HTMLInputElement).checked)}
              id="maintenance"
            />
            <Label htmlFor="maintenance" className="ml-3 inline">Maintenance Mode</Label>
            <p className="text-sm text-gray-500">When enabled, site will be in maintenance mode.</p>
          </div>

          <div className="mb-4">
            <Checkbox
              checked={!!settings?.chatEnabled}
              onChange={(e) => handleChange('chatEnabled', (e.target as HTMLInputElement).checked)}
              id="chatEnabled"
            />
            <Label htmlFor="chatEnabled" className="ml-3 inline">Chat Enabled</Label>
            <p className="text-sm text-gray-500">Allow users to use chat features.</p>
          </div>

          <div className="mb-4">
            <div className="mb-2 block">
              <Label htmlFor="maxUsers" value="Max Users" />
            </div>
            <TextInput
              id="maxUsers"
              type="number"
              value={settings?.maxUsers ?? ''}
              onChange={(e) => handleChange('maxUsers', Number(e.target.value))}
              className="form-control"
            />
            <p className="text-sm text-gray-500">Maximum allowed registered users.</p>
          </div>
        </div>

        <div className="lg:col-span-6 col-span-12">
          <div className="mb-4">
            <div className="mb-2 block">
              <Label htmlFor="theme" value="Theme" />
            </div>
            <Select
              id="theme"
              value={settings?.theme || 'light'}
              onChange={(e) => handleChange('theme', e.target.value)}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </Select>
          </div>

          <div className="mb-4">
            <Checkbox
              checked={!!settings?.emailNotifications}
              onChange={(e) => handleChange('emailNotifications', (e.target as HTMLInputElement).checked)}
              id="emailNotifications"
            />
            <Label htmlFor="emailNotifications" className="ml-3 inline">Email Notifications</Label>
            <p className="text-sm text-gray-500">Enable system generated email notifications.</p>
          </div>

          <div className="mb-4">
            <div className="mb-2 block">
              <Label htmlFor="backupFrequency" value="Backup Frequency" />
            </div>
            <Select
              id="backupFrequency"
              value={settings?.backupFrequency || 'daily'}
              onChange={(e) => handleChange('backupFrequency', e.target.value)}
            >
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </Select>
            <p className="text-sm text-gray-500">How often backups run.</p>
          </div>
        </div>

        <div className="col-span-12 flex gap-3 mt-2">
          <Button color="primary" type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Settings'}</Button>
          <Button color="gray" type="button" onClick={handleReset}>Reset</Button>
        </div>
      </form>
    </div>
  );
}
