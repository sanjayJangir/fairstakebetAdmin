
import  { useEffect, useState } from 'react';
import { Progress } from "flowbite-react";
import { Icon } from "@iconify/react";
import { api } from 'src/services/api/api';

const MONTHLY_GOAL = 1000; // 1,000 users per month goal

const NewCustomers = () => {
  const [monthlyProgress, setMonthlyProgress] = useState<number>(0);
  const [newUsers, setNewUsers] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMonthlyStats = async () => {
      try {
        const response = await api.get('/admin/dashboard/stats');
        const usersThisMonth = response.data.data.users.newThisMonth;
        setNewUsers(usersThisMonth);
        
        // Calculate percentage (cap at 100%)
        const percentage = Math.min((usersThisMonth / MONTHLY_GOAL) * 100, 100);
        setMonthlyProgress(Math.round(percentage));
      } catch (error) {
        console.error('Error fetching monthly stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlyStats();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-8"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
          <div className="h-2 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-lightsecondary text-secondary p-3 rounded-md">
          <Icon icon="solar:users-group-rounded-outline" height={24} />
        </div>
        <p className="text-lg text-dark font-semibold">Registered Users</p>
      </div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-dark">Monthly Goal ({MONTHLY_GOAL} users)</p>
        <p className="text-sm text-dark">{monthlyProgress}%</p>
      </div>
      <Progress progress={monthlyProgress} color="secondary" />
      <p className="text-sm text-gray-500 mt-2">
        {newUsers} new users this month
      </p>
    </div>
  );
};

export default NewCustomers;
