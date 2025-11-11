
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
  ChartData
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface RevenueForecastProps {
  ggrData: {
    date: string;
    value: number;
  }[];
}

export const RevenueForecast: React.FC<RevenueForecastProps> = ({ ggrData }) => {
  const data: ChartData<'line'> = {
    labels: ggrData.map(item => {
      const date = new Date(item.date);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }),
    datasets: [
      {
        label: 'GGR',
        data: ggrData.map(item => item.value),
        fill: true,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      }
    ]
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Daily GGR (Last 30 Days)',
        color: '#374151',
        font: {
          size: 16,
          weight: 'bold',
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return `$${value.toLocaleString()}`;
          }
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index',
    }
  };

  return (
    <div className="bg-white p-6 rounded-[10px] shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
      <Line data={data} options={options} />
    </div>
  );
};
