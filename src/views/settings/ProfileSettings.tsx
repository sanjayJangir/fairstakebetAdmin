import { useEffect, useState } from 'react';
import { Label, TextInput, Button } from 'flowbite-react';
import { settingsService } from '../../services/api/settingsService';
import { toast } from 'sonner';
import { useAdmin } from '../../context/AdminContext';

export default function ProfileSettings() {
  const { admin } = useAdmin();

  const [name, setName] = useState('');
  const [email, setEmail] = useState(admin?.email || '');
  const [savingProfile, setSavingProfile] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    // Pre-fill email from admin context if available
    if (admin?.email) setEmail(admin.email);
  }, [admin]);

  useEffect(() => {
    // Fetch profile from API (name + email) and prefill form
    const loadProfile = async () => {
      try {
        const resp = await settingsService.getProfile();
        // API might return { data: { name, email } } or { name, email }
        const data = resp.data || resp;
        if (data.name) setName(data.name);
        if (data.email) setEmail(data.email);
      } catch (error) {
        console.error('Failed to load profile:', error);
      }
    };

    loadProfile();
  }, []);

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      await settingsService.updateProfile({ name, email });
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update profile');
    } finally {
      setSavingProfile(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      toast.error('Please fill all password fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirmation don't match");
      return;
    }

    setChangingPassword(true);
    try {
      await settingsService.changePassword({ currentPassword, newPassword });
      toast.success('Password changed successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error(error);
      toast.error('Failed to change password');
    } finally {
      setChangingPassword(false);
    }
  };

  return (
    <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 w-full">
      <h3 className="text-lg font-semibold mb-4">Profile Settings</h3>

      <div className="grid grid-cols-12 gap-6">
        <div className="lg:col-span-6 col-span-12">
          <form onSubmit={handleProfileSave} className="space-y-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Display Name" />
              </div>
              <TextInput
                id="name"
                type="text"
                placeholder="Your display name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control form-rounded-xl"
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Email" />
              </div>
              <TextInput
                id="email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control form-rounded-xl"
              />
            </div>

            <div className="flex gap-3">
              <Button color="primary" type="submit" disabled={savingProfile}>
                {savingProfile ? 'Saving...' : 'Save Profile'}
              </Button>
              <Button color="gray" type="button" onClick={() => { setName(''); setEmail(admin?.email || ''); }}>
                Reset
              </Button>
            </div>
          </form>
        </div>

        <div className="lg:col-span-6 col-span-12">
          <h4 className="text-md font-medium mb-3">Change Password</h4>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="currentPassword" value="Current Password" />
              </div>
              <TextInput
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="form-control form-rounded-xl"
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="newPassword" value="New Password" />
              </div>
              <TextInput
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="form-control form-rounded-xl"
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="confirmPassword" value="Confirm New Password" />
              </div>
              <TextInput
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-control form-rounded-xl"
              />
            </div>

            <div className="flex gap-3">
              <Button color="primary" type="submit" disabled={changingPassword}>
                {changingPassword ? 'Updating...' : 'Change Password'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
