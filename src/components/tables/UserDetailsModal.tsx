import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { userService } from '../../services/api/userService';
import { Badge } from 'flowbite-react';
interface UserDetails {
    // Profile Model Data
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
    created_at: string;
    
    // Public Model Data
    total_chats: number;
    
    // Games Models Data
    total_bets: number;
    games_breakdown: {
        crash_bets: number;
        dice_bets: number;
        mines_bets: number;
        // Add other game types
    };
    
    // CCPayment Models Data
    total_deposits: number;
    total_withdrawals: number;
    
    // Dollar Wallet Model
    current_balance: number;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    userId: string | null;
}

const UserDetailsModal = ({ isOpen, onClose, userId }: Props) => {
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (userId && isOpen) {
            fetchUserDetails(userId);
        }
    }, [userId, isOpen]);

    const fetchUserDetails = async (id: string) => {
        setIsLoading(true);
        try {
            const details = await userService.getUserDetails(id);
            setUserDetails(details);
        } catch (error) {
            console.error('Failed to fetch user details:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
                <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={onClose} />
                
                <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">User Details</h2>
                        <button 
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                        >
                            <Icon icon="solar:close-circle-outline" className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        {isLoading ? (
                            <div className="flex items-center justify-center h-96">
                                <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
                            </div>
                        ) : userDetails && (
                            <div className="space-y-8">
                                {/* Profile Header with Edit Button */}
                                <div className="relative flex items-center gap-4 bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl">
                                    {/* <img 
                                        src={userDetails.profileImg} 
                                        alt={userDetails.username}
                                        className="h-24 w-24 rounded-full object-cover border-4 border-white dark:border-gray-600"
                                    /> */}
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-semibold">{userDetails.username}</h3>
                                        <p className="text-gray-500 dark:text-gray-400">{userDetails.email}</p>
                                        <div className="flex gap-2 mt-2">
                                            <Badge color={userDetails.status === 'active' ? 'success' : 'danger'}>
                                                {userDetails.status}
                                            </Badge>
                                            <Badge color={userDetails.is_verified ? 'success' : 'warning'}>
                                                {userDetails.is_verified ? 'Verified' : 'Unverified'}
                                            </Badge>
                                        </div>
                                    </div>
                                    <button 
                                        className="absolute top-4 right-4 p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full group transition-all duration-200"
                                        title="Edit User"
                                    >
                                        <Icon 
                                            icon="solar:pen-bold" 
                                            className="h-5 w-5 group-hover:text-primary transition-colors"
                                        />
                                        <span className="absolute right-full mr-2 whitespace-nowrap bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                            Edit User
                                        </span>
                                    </button>
                                </div>

                                {/* Key Statistics */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <StatCard 
                                        icon="solar:user-id-bold" 
                                        label="User ID" 
                                        value={userDetails.user_id}
                                        variant="primary" 
                                    />
                                    <StatCard 
                                        icon="solar:chat-square-bold" 
                                        label="Total Chats" 
                                        value={userDetails.total_chats}
                                        variant="info" 
                                    />
                                    <StatCard 
                                        icon="solar:gamepad-bold" 
                                        label="Total Bets" 
                                        value={userDetails.total_bets}
                                        variant="warning" 
                                    />
                                    <StatCard 
                                        icon="solar:arrow-down-bold" 
                                        label="Total Deposits" 
                                        value={`$${userDetails.total_deposits.toFixed(2)}`}
                                        variant="success" 
                                    />
                                    <StatCard 
                                        icon="solar:arrow-up-bold" 
                                        label="Total Withdrawals" 
                                        value={`$${userDetails.total_withdrawals.toFixed(2)}`}
                                        variant="danger" 
                                    />
                                    <StatCard 
                                        icon="solar:wallet-bold" 
                                        label="Current Balance" 
                                        value={`$${userDetails.current_balance.toFixed(2)}`}
                                        variant="primary" 
                                    />
                                </div>

                                {/* Games Breakdown */}
                                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                                    <h4 className="text-lg font-semibold mb-4">Games Breakdown</h4>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {Object.entries(userDetails.games_breakdown).map(([game, count]) => (
                                            <DetailItem 
                                                key={game}
                                                label={game.split('_').map(word => 
                                                    word.charAt(0).toUpperCase() + word.slice(1)
                                                ).join(' ')}
                                                value={count.toString()}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Profile Details */}
                                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                                    <h4 className="text-lg font-semibold mb-4">Profile Information</h4>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        <DetailItem label="Current Level" value={userDetails.current_level} />
                                        <DetailItem label="Next Level" value={userDetails.next_level} />
                                        <DetailItem label="Level Number" value={userDetails.current_level} />
                                        <DetailItem label="Referral Code" value={userDetails.referral_code} />
                                        <DetailItem label="Email Verified" value={userDetails.emailIsVerified ? 'Yes' : 'No'} />
                                        <DetailItem label="Email Linked" value={userDetails.emailIsLinked ? 'Yes' : 'No'} />
                                        <DetailItem label="Profile Hidden" value={userDetails.profileIsHidden ? 'Yes' : 'No'} />
                                        <DetailItem 
                                            label="Joined" 
                                            value={new Date(userDetails.created_at).toLocaleDateString()} 
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

interface StatCardProps {
    icon: string;
    label: string;
    value: string | number;
    variant: 'primary' | 'success' | 'warning' | 'danger' | 'info';
}

const StatCard = ({ icon, label, value, variant }: StatCardProps) => {
    const variantClasses = {
        primary: 'text-primary',
        success: 'text-green-500',
        warning: 'text-yellow-500',
        danger: 'text-red-500',
        info: 'text-blue-500'
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
            <div className="flex items-center gap-3">
                <Icon icon={icon} className={`h-6 w-6 ${variantClasses[variant]}`} />
                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
                    <p className="text-lg font-semibold">{value}</p>
                </div>
            </div>
        </div>
    );
};

const DetailItem = ({ label, value }: { label: string; value: string }) => (
    <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
        <p className="font-medium">{value}</p>
    </div>
);

export default UserDetailsModal;
