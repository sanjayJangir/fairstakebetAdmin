// Import necessary libraries and components
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts'; // Import the ApexCharts library
import { ApexOptions } from 'apexcharts'; // Import ApexOptions type

// Define the interface for the game win data
interface GameWin {
  game: string;
  winAmount: number;
  lossAmount: number;
  timestamp: string;
}

// Define the ProductRevenue component
const ProductRevenue = () => {
  const [chartData, setChartData] = useState<GameWin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for wins and losses
    const mockData: GameWin[] = [
      { game: 'Crash', winAmount: 500, lossAmount: 300, timestamp: '2025-04-20T10:00:00Z' },
      { game: 'Dice', winAmount: 700, lossAmount: 400, timestamp: '2025-04-21T10:00:00Z' },
      { game: 'Mines', winAmount: 600, lossAmount: 200, timestamp: '2025-04-22T10:00:00Z' },
      { game: 'Plinko', winAmount: 800, lossAmount: 500, timestamp: '2025-04-23T10:00:00Z' },
      { game: 'HiLo', winAmount: 900, lossAmount: 600, timestamp: '2025-04-24T10:00:00Z' },
    ];

    // Simulate loading delay
    setTimeout(() => {
      setChartData(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="rounded-lg shadow-md bg-white pt-6 px-0 relative w-full break-words">
        <div className="px-6">
          <h5 className="card-title mb-6">Wins and Losses</h5>
        </div>
        <div className="animate-pulse p-4">
          <div className="h-10 w-full bg-gray-200 rounded-md"></div>
        </div>
      </div>
    );
  }

  const series = [
    {
      name: 'Wins',
      data: chartData.map((data) => data.winAmount),
    },
    {
      name: 'Losses',
      data: chartData.map((data) => data.lossAmount),
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: 'line', // Explicitly set the type to a valid ApexCharts type
      height: 350,
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: chartData.map((data) => new Date(data.timestamp).toLocaleDateString()),
      title: {
        text: 'Date',
      },
    },
    yaxis: {
      title: {
        text: 'Amount ($)',
      },
    },
    stroke: {
      curve: 'smooth',
    },
    colors: ['#28a745', '#dc3545'], // Green for wins, red for losses
    tooltip: {
      theme: 'dark',
    },
    legend: {
      position: 'top',
    },
  };

  return (
    <div className="rounded-lg shadow-md bg-white pt-6 px-0 relative w-full break-words">
      <div className="px-6">
        <h5 className="card-title mb-6">Wins and Losses</h5>
      </div>
      <ReactApexChart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default ProductRevenue;
