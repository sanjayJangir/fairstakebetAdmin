import { useState, useEffect } from 'react';
import { Table, Dropdown, Select } from 'flowbite-react';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { Icon } from '@iconify/react';
import { formatDistanceToNow } from 'date-fns';
import { userService } from '../../services/api/userService';
import { toast } from 'sonner';
import UserDetailsModal from './UserDetailsModal';
import EditUserModal from '../modals/EditUserModal';
import AddAmountModal from '../modals/AddAmountModal';

interface User {
    _id: string;
    username: string;
    email: string;
    current_level: string;
    is_verified: boolean;
    balance: number;
    status: 'active' | 'disabled' | 'pending';
    createdAt: string;
}

const UsersTable = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedForAdd, setSelectedForAdd] = useState<string | null>(null);

    const formatDate = (date: string) => {
        return formatDistanceToNow(new Date(date), { addSuffix: true });
    };

    const fetchUsers = async (page: number) => {
        try {
            const response = await userService.getUsers(page);
            setUsers(response.data.users);
            setTotalPages(response.data.totalPages);
            setCurrentPage(response.data.currentPage);
        } catch (error) {
            toast.error('Failed to fetch users');
        }
    };

    const handleStatusUpdate = async (userId: string, currentStatus: 'pending' | 'active' | 'disabled') => {
        try {
            const newStatus = currentStatus === 'active' ? 'disabled' : 'active';
            await userService.updateUserStatus(userId, newStatus);
            setUsers(users.map(user => 
                user._id === userId 
                    ? { ...user, status: newStatus }
                    : user
            ));
            toast.success(`User ${newStatus} successfully`);
        } catch (error) {
            toast.error('Failed to update user status');
        }
    };

    const handleChangeStatus = async (userId: string, newStatus: 'pending' | 'active' | 'disabled') => {
        try {
            await userService.updateUserStatus(userId, newStatus);
            setUsers(prev => prev.map(u => u._id === userId ? { ...u, status: newStatus } : u));
            toast.success(`User status set to ${newStatus}`);
        } catch (error) {
            console.error(error);
            toast.error('Failed to update user status');
        }
    };

    const handleViewDetails = (userId: string) => {
        setSelectedUser(userId);
        setIsDetailsModalOpen(true);
    };

    const handleEditUser = (userId: string) => {
        setSelectedUser(userId);
        setIsEditModalOpen(true);
    };

    const openAddModal = (userId: string) => {
        setSelectedForAdd(userId);
        setIsAddModalOpen(true);
    };

    const handleAmountAdded = (amount: number) => {
        // update local users state after a successful add
        setUsers(prev => prev.map(u =>
            u._id === selectedForAdd
                ? { ...u, balance: Number(u.balance) + Number(amount) }
                : u
        ));
    };

    useEffect(() => {
        fetchUsers(currentPage);
    }, [currentPage]);

    return (
        <>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Users</h2>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Manage and monitor user accounts
                    </p>
                </div>
                
                <div className="p-6">
                    <div className="overflow-x-auto">
                        <Table hoverable>
                            <Table.Head>
                                <Table.HeadCell>Username</Table.HeadCell>
                                <Table.HeadCell>Email</Table.HeadCell>
                                <Table.HeadCell>Level</Table.HeadCell>
                                <Table.HeadCell>Balance</Table.HeadCell>
                                <Table.HeadCell>Status</Table.HeadCell>
                                <Table.HeadCell>Joined</Table.HeadCell>
                                <Table.HeadCell>Actions</Table.HeadCell>
                            </Table.Head>
                            <Table.Body>
                                {users.map((user) => (
                                    <Table.Row key={user._id}>
                                        <Table.Cell>{user.username}</Table.Cell>
                                        <Table.Cell>{user.email}</Table.Cell>
                                        <Table.Cell>{user.current_level}</Table.Cell>
                                        <Table.Cell>
                                            <div className="flex items-center gap-3">
                                                <span>$ {typeof user.balance === 'number' ? user.balance.toFixed(2) : user.balance}</span>
                                                <button
                                                    onClick={() => openAddModal(user._id)}
                                                    className="text-xs px-2 py-1 bg-blue-600 text-white rounded"
                                                >
                                                    Add
                                                </button>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Select
                                                value={user.status}
                                                onChange={(e) => handleChangeStatus(user._id, e.target.value as 'pending' | 'active' | 'disabled')}
                                                className="w-auto text-sm"
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="active">Active</option>
                                                <option value="disabled">Disabled</option>
                                            </Select>
                                        </Table.Cell>
                                        <Table.Cell>{formatDate(user.createdAt)}</Table.Cell>
                                        <Table.Cell>
                                            <Dropdown
                                                label=""
                                                dismissOnClick={false}
                                                renderTrigger={() => (
                                                    <button aria-label="Actions" title="Actions" className="p-2 hover:bg-gray-100 rounded-full">
                                                        <HiOutlineDotsVertical className="h-5 w-5" />
                                                    </button>
                                                )}
                                            >
                                                <Dropdown.Item
                                                    onClick={() => handleViewDetails(user._id)}
                                                    className="flex items-center gap-2"
                                                >
                                                    <Icon icon="solar:eye-outline" className="h-4 w-4" />
                                                    View Details
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    onClick={() => handleEditUser(user._id)}
                                                    className="flex items-center gap-2"
                                                >
                                                    <Icon icon="solar:pen-outline" className="h-4 w-4" />
                                                    Edit User
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    onClick={() => handleStatusUpdate(user._id, user.status)}
                                                    className="flex items-center gap-2"
                                                >
                                                    <Icon 
                                                        icon={user.status === 'active' ? 'solar:user-block-outline' : 'solar:user-check-outline'} 
                                                        className="h-4 w-4" 
                                                    />
                                                    {user.status === 'active' ? 'Disable' : 'Enable'} User
                                                </Dropdown.Item>
                                            </Dropdown>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>

                    {totalPages > 1 && (
                        <div className="flex justify-center mt-6">
                            {/* Add your pagination component here */}
                        </div>
                    )}
                </div>
            </div>

            <UserDetailsModal 
                isOpen={isDetailsModalOpen} 
                onClose={() => setIsDetailsModalOpen(false)} 
                userId={selectedUser} 
            />

            <EditUserModal 
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                userId={selectedUser}
                onSaved={() => fetchUsers(currentPage)}
            />

            <AddAmountModal
                isOpen={isAddModalOpen}
                onClose={() => { setIsAddModalOpen(false); setSelectedForAdd(null); }}
                userId={selectedForAdd}
                currentBalance={users.find(u => u._id === selectedForAdd)?.balance || 0}
                onAdded={handleAmountAdded}
            />
        </>
    );
};

export default UsersTable;
