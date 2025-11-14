import { useEffect, useState } from 'react';
import { Modal, Button, TextInput, Label } from 'flowbite-react';
import { userService } from '../../services/api/userService';
import { toast } from 'sonner';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    userId: string | null;
    currentBalance?: number;
    onAdded?: (amount: number) => void;
}

const AddAmountModal = ({ isOpen, onClose, userId, currentBalance = 0, onAdded }: Props) => {
    const [amount, setAmount] = useState<string>('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            setAmount('');
            setLoading(false);
        }
    }, [isOpen]);

    const handleSubmit = async () => {
        if (!userId) return;
        const parsed = parseFloat(amount);
        if (isNaN(parsed) || parsed <= 0) {
            toast.error('Please enter a valid amount greater than 0');
            return;
        }

        setLoading(true);
        try {
            await userService.addBalance(userId, parsed);
            toast.success('Amount added successfully');
            onAdded?.(parsed);
            onClose();
        } catch (error) {
            console.error(error);
            toast.error('Failed to add amount');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={isOpen} size="md" onClose={onClose}>
            <Modal.Header>Add Amount</Modal.Header>
            <Modal.Body>
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="current-balance">Current Balance</Label>
                        <div id="current-balance" className="mt-1 text-lg font-medium">
                            $ {Number(currentBalance).toFixed(2)}
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="amount">Amount</Label>
                        <TextInput
                            id="amount"
                            type="number"
                            min={0}
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter amount to add"
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button color="gray" onClick={onClose} disabled={loading}>
                    Cancel
                </Button>
                <Button onClick={handleSubmit} disabled={loading}>
                    {loading ? 'Adding...' : 'Add Amount'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddAmountModal;
