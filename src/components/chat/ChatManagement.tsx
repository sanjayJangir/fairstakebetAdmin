import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import Chart from 'react-apexcharts';
import { Badge } from '../ui/Badge';
import { chatService } from '../../services/api/chatService';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { ApexOptions } from 'apexcharts';

interface ChatStats {
  totalMessages: number;
  activeUsers: number;
  bannedUsers: number;
}

interface ChatHistoryPoint {
  timestamp: string;
  messageCount: number;
}

const ChatManagement = () => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatStats, setChatStats] = useState<ChatStats>({
    totalMessages: 0,
    activeUsers: 0,
    bannedUsers: 0,
  });
  const [chatHistory, setChatHistory] = useState<ChatHistoryPoint[]>([]);
  const navigate = useNavigate();
  const { isAuthenticated } = useAdmin();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth/login');
      return;
    }
    
    loadData();
  }, [isAuthenticated, navigate]);

  const loadData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchChatStats(),
        fetchChatHistory()
      ]);
    } catch (error) {
      console.error('Error loading chat data:', error);
      if (error instanceof Error && error.message === 'Unauthorized') {
        navigate('/auth/login');
      } else {
        toast.error('Failed to load chat data');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchChatStats = async () => {
    try {
      const stats = await chatService.getChatStats();
      setChatStats(stats);
    } catch (error) {
      throw error;
    }
  };

  const fetchChatHistory = async () => {
    try {
      const history = await chatService.getChatHistory();
      setChatHistory(history);
    } catch (error) {
      throw error;
    }
  };

  const chatActivityChart = {
    series: [
      {
        name: 'Messages',
        data: chatHistory.map((point) => point.messageCount),
      },
    ],
    options: {
      chart: {
        type: 'area', // Ensure this is a valid type
        height: 150,
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: true,
        },
      },
      xaxis: {
        type: 'datetime',
        categories: chatHistory.map((point) => point.timestamp),
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.3,
        },
      },
      colors: ['#6563FF'],
      tooltip: {
        theme: 'dark',
        x: {
          format: 'HH:mm',
        },
      },
      grid: {
        show: false,
      },
    } as ApexOptions, // Explicitly cast options to ApexOptions
  };

  const handleBanUser = async () => {
    if (!username.trim()) return;

    setLoading(true);
    try {
      await chatService.banUser(username);
      toast.success(`User ${username} has been banned from chat`);
      setUsername('');
      fetchChatStats(); // Refresh stats after ban
    } catch (error) {
      toast.error('Failed to ban user');
    } finally {
      setLoading(false);
    }
  };

  const calculateGrowthPercentage = () => {
    if (chatHistory.length < 2) return 0;
    const current = chatHistory[chatHistory.length - 1].messageCount;
    const previous = chatHistory[chatHistory.length - 2].messageCount;
    return previous === 0 ? 100 : ((current - previous) / previous) * 100;
  };

  const growthPercentage = calculateGrowthPercentage();

  return (
    <div className="p-4">
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Chat Ban Management Card */}
          <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full">
            <div className="flex items-center justify-between mb-4">
              <h5 className="card-title">Chat Restrictions</h5>
              <Badge color="error" className="px-2 py-1">
                {chatStats.bannedUsers} Users Banned
              </Badge>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex-grow">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username to restrict"
                  className="w-full px-4 py-2 rounded-md border dark:border-gray-700 dark:bg-gray-800"
                />
              </div>
              <button
                onClick={handleBanUser}
                disabled={loading || !username}
                className={`
                  bg-error hover:bg-error/80 text-white px-4 py-2 rounded-md 
                  flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed
                `}
              >
                <Icon icon="solar:user-block-linear" height={20} />
                {loading ? 'Banning...' : 'Restrict User'}
              </button>
            </div>
          </div>

          {/* Chat Activity Card */}
          <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full">
            <div className="flex items-center justify-between mb-4">
              <h5 className="card-title">Chat Activity</h5>
              <div className="flex items-center gap-2">
                <Icon icon="solar:users-group-rounded-linear" className="text-primary" height={24} />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {chatStats.activeUsers} Active Users
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-2xl font-semibold text-primary">
                  {chatStats.totalMessages}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Messages Today</p>
              </div>
              <Badge color={growthPercentage >= 0 ? 'success' : 'error'} className="px-2 py-1">
                {growthPercentage >= 0 ? '+' : ''}{growthPercentage.toFixed(1)}%
              </Badge>
            </div>

            <div className="-mx-6 -mb-6">
              <Chart
                options={chatActivityChart.options}
                series={chatActivityChart.series}
                type="area"
                height={150}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatManagement;

