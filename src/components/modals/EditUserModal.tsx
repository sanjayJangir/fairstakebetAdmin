import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import { userService } from '../../services/api/userService';

interface UserData {
    user_id: string;
    username: string;
    email: string;
    profileImg: string;
    current_level: string;
    next_level: string;
    level: number;
    referral_code: string;
    emailIsVerified: boolean;
    emailIsLinked: boolean;
    profileIsHidden: boolean;
    is_verified: boolean;
    status: 'active' | 'disabled';
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    userId: string | null;
}

const EditUserModal = ({ isOpen, onClose, userId }: Props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        if (userId && isOpen) {
            fetchUserData();
        }
    }, [userId, isOpen]);

    const fetchUserData = async () => {
        setIsLoading(true);
        try {
            const details = await userService.getUserDetails(userId!);
            setUserData(details);
        } catch (error) {
            console.error('Failed to fetch user details:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Implement your update logic here
            await userService.updateUser(userId!, userData!);
            onClose();
        } catch (error) {
            console.error('Failed to update user:', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setUserData(prev => ({
            ...prev!,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
                <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={onClose} />
                
                <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Edit User</h2>
                        <button 
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                        >
                            <Icon icon="solar:close-circle-outline" className="h-6 w-6" />
                        </button>
                    </div>

                    {isLoading ? (
                        <div className="flex items-center justify-center h-96">
                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            {/* Content */}
                            <div className="p-6 space-y-6 max-h-[calc(100vh-250px)] overflow-y-auto">
                                <div className="grid grid-cols-2 gap-6">
                                    {/* Basic Information */}
                                    <div className="col-span-2">
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Basic Information</h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Username
                                                </label>
                                                <input 
                                                    type="text"
                                                    name="username"
                                                    value={userData?.username || ''}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Email
                                                </label>
                                                <input 
                                                    type="email"
                                                    name="email"
                                                    value={userData?.email || ''}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Level Information */}
                                    <div className="col-span-2">
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Level Information</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Current Level
                                                </label>
                                                <input 
                                                    type="text"
                                                    name="current_level"
                                                    value={userData?.current_level || ''}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Next Level
                                                </label>
                                                <input 
                                                    type="text"
                                                    name="next_level"
                                                    value={userData?.next_level || ''}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Level Number
                                                </label>
                                                <input 
                                                    type="number"
                                                    name="level"
                                                    value={userData?.level || 0}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Referral Code
                                                </label>
                                                <input 
                                                    type="text"
                                                    name="referral_code"
                                                    value={userData?.referral_code || ''}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Status and Verification */}
                                    <div className="col-span-2">
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Status & Verification</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="flex items-center space-x-3">
                                                <input 
                                                    type="checkbox"
                                                    name="emailIsVerified"
                                                    checked={userData?.emailIsVerified || false}
                                                    onChange={handleInputChange}
                                                    className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                                                />
                                                <label className="text-sm text-gray-700 dark:text-gray-300">
                                                    Email Verified
                                                </label>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <input 
                                                    type="checkbox"
                                                    name="emailIsLinked"
                                                    checked={userData?.emailIsLinked || false}
                                                    onChange={handleInputChange}
                                                    className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                                                />
                                                <label className="text-sm text-gray-700 dark:text-gray-300">
                                                    Email Linked
                                                </label>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <input 
                                                    type="checkbox"
                                                    name="profileIsHidden"
                                                    checked={userData?.profileIsHidden || false}
                                                    onChange={handleInputChange}
                                                    className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                                                />
                                                <label className="text-sm text-gray-700 dark:text-gray-300">
                                                    Profile Hidden
                                                </label>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <input 
                                                    type="checkbox"
                                                    name="is_verified"
                                                    checked={userData?.is_verified || false}
                                                    onChange={handleInputChange}
                                                    className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                                                />
                                                <label className="text-sm text-gray-700 dark:text-gray-300">
                                                    Is Verified
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
                                <button 
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditUserModal;
