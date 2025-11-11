import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { api } from 'src/services/api/api';
import StatsGrid from 'src/components/dashboard/StatsGrid';
import BlogCards from 'src/components/dashboard/BlogCards';
import DailyActivity from 'src/components/dashboard/DailyActivity';
import NewCustomers from 'src/components/dashboard/NewCustomers';
import ProductRevenue from 'src/components/dashboard/ProductRevenue';
import { RevenueForecast } from 'src/components/dashboard/RevenueForecast';
import TotalIncome from 'src/components/dashboard/TotalIncome';

interface DashboardStats {
  users: {
    total: number;
    newThisMonth: number;
    growth: number;
  };
  deposits: {
    total: number;
    thisMonth: number;
    growth: number;
  };
  ggr: {
    current: number;
    previousMonth: number;
    percentageChange: number;
    chartData: Array<{
      date: string;
      value: number;
    }>;
  };
  withdrawals: {
    current: number;
    previousMonth: number;
    percentageChange: number;
  };
}

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboardStats = async () => {
    try {
      const response = await api.get('/admin/dashboard/stats');
      setStats(response.data.data);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      toast.error('Failed to fetch dashboard statistics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50/30">
      {stats && <StatsGrid stats={stats} />}

      <div className="grid grid-cols-12 gap-6">
        <div className="lg:col-span-8 col-span-12">
          <RevenueForecast ggrData={stats?.ggr?.chartData || []} />
        </div>
        <div className="lg:col-span-4 col-span-12">
          <div className="grid grid-cols-1 gap-6">
            <NewCustomers />
            <TotalIncome />
          </div>
        </div>
        <div className="lg:col-span-8 col-span-12">
          <ProductRevenue />
        </div>
        <div className="lg:col-span-4 col-span-12">
          <DailyActivity />
        </div>
        <div className="col-span-12">
          <BlogCards />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
