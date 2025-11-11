import React from 'react';
import { FaUsers, FaMoneyBillWave, FaChartLine, FaMoneyCheck } from 'react-icons/fa';
import StatsCard from './StatsCard';
import { formatNumber, formatCurrency } from '../../utils/formatters';

interface StatsGridProps {
  stats?: {
    ggr?: {
      current: number;
      percentageChange: number;
    };
    users?: {
      total: number;
      growth: number;
    };
    deposits?: {
      total: number;
      growth: number;
    };
    withdrawals?: {
      current: number;
      percentageChange: number;
    };
  };
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  if (!stats) {
    return (
      <div className="bg-white rounded-[10px] shadow-[0_2px_12px_rgba(0,0,0,0.08)] mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <div className="p-6 animate-pulse">Loading...</div>
          <div className="p-6 animate-pulse">Loading...</div>
          <div className="p-6 animate-pulse">Loading...</div>
          <div className="p-6 animate-pulse">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[10px] shadow-[0_2px_12px_rgba(0,0,0,0.08)] mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          icon={FaChartLine}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-500"
          title="GGR"
          value={`$${formatNumber(stats.ggr?.current || 0)}`}
          percentageChange={stats.ggr?.percentageChange}
          comparisonText="vs last month"
        />
        
        <StatsCard
          icon={FaUsers}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-500"
          title="Registered Users"
          value={formatNumber(stats.users?.total || 0)}
          percentageChange={stats.users?.growth}
          comparisonText="this month"
        />
        
        <StatsCard
          icon={FaMoneyBillWave}
          iconBgColor="bg-green-100"
          iconColor="text-green-500"
          title="Total Deposits"
          value={`$${formatCurrency(stats.deposits?.total || 0)}`}
          percentageChange={stats.deposits?.growth}
          comparisonText="this month"
        />
        
        <StatsCard
          icon={FaMoneyCheck}
          iconBgColor="bg-red-50"
          iconColor="text-red-500"
          title="Total Withdrawals"
          value={`$${formatNumber(stats.withdrawals?.current || 0)}`}
          percentageChange={stats.withdrawals?.percentageChange}
          comparisonText="vs last month"
        />
      </div>
    </div>
  );
};

export default StatsGrid;
