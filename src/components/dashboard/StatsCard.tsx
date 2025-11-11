import React from 'react';
import { IconType } from 'react-icons';
import { getPercentageClass } from '../../utils/formatters';

interface StatsCardProps {
  icon: IconType;
  iconBgColor: string;
  iconColor: string;
  title: string;
  value: string;
  percentageChange?: number;
  comparisonText?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  icon: Icon,
  iconBgColor,
  iconColor,
  title,
  value,
  percentageChange,
  comparisonText
}) => {
  return (
    <div className="p-6 flex items-center gap-4 border-b md:border-b lg:border-b-0 lg:border-r border-gray-100">
      <div className={`${iconBgColor} p-4 rounded-lg`}>
        <Icon className={`${iconColor} text-2xl`} />
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-xl font-bold text-gray-800">{value}</p>
        {typeof percentageChange === 'number' && (
          <p className={`text-xs ${getPercentageClass(percentageChange)} mt-1`}>
            {percentageChange.toFixed(1)}% {comparisonText}
          </p>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
