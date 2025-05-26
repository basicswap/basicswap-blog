'use client';

import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface ChartWrapperProps {
  type: 'bar' | 'line' | 'pie';
  data?: any;
  options?: any;
  dataType?: 'static' | 'bitcoin-transactions';
}

const ChartWrapper: React.FC<ChartWrapperProps> = ({ type, data, options, dataType = 'static' }) => {
  const [chartData, setChartData] = useState(data);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (dataType === 'bitcoin-transactions') {
      setLoading(true);
      setError(null);

      const fetchCryptoData = async () => {
        try {
          const bitcoinResponse = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30&interval=daily');
          const moneroResponse = await fetch('https://api.coingecko.com/api/v3/coins/monero/market_chart?vs_currency=usd&days=30&interval=daily');
          const litecoinResponse = await fetch('https://api.coingecko.com/api/v3/coins/litecoin/market_chart?vs_currency=usd&days=30&interval=daily');
          const tetherResponse = await fetch('https://api.coingecko.com/api/v3/coins/tether/market_chart?vs_currency=usd&days=30&interval=daily');

          if (!bitcoinResponse.ok || !moneroResponse.ok || !litecoinResponse.ok || !tetherResponse.ok) {
            throw new Error('One or more crypto data API requests failed.');
          }

          const bitcoinData = await bitcoinResponse.json();
          const moneroData = await moneroResponse.json();
          const litecoinData = await litecoinResponse.json();
          const tetherData = await tetherResponse.json();

          const labels = bitcoinData.total_volumes.map((item: [number, number]) => new Date(item[0]).toLocaleDateString());

          const datasets = [
            {
              label: 'Bitcoin Daily Volume (USD)',
              data: bitcoinData.total_volumes.map((item: [number, number]) => item[1]),
              borderColor: 'rgb(255, 205, 86)',
              backgroundColor: 'rgb(255, 205, 86)',
              tension: 0.1,
            },
            {
              label: 'Monero Daily Volume (USD)',
              data: moneroData.total_volumes.map((item: [number, number]) => item[1]),
              borderColor: 'rgb(255, 159, 64)',
              backgroundColor: 'rgb(255, 159, 64)',
              tension: 0.1,
            },
            {
              label: 'Litecoin Daily Volume (USD)',
              data: litecoinData.total_volumes.map((item: [number, number]) => item[1]),
              borderColor: 'rgb(54, 162, 235)',
              backgroundColor: 'rgb(54, 162, 235)',
              tension: 0.1,
            },
            {
              label: 'Tether (USDT) Daily Volume (USD)',
              data: tetherData.total_volumes.map((item: [number, number]) => item[1]),
              borderColor: 'rgb(0, 0, 0)',
              backgroundColor: 'rgba(0, 0, 0)',
              tension: 0.1,
            },
          ];

          setChartData({ labels, datasets });
          setLoading(false);

        } catch (err: any) {
          console.error("Error fetching crypto data:", err);
          setError(`Failed to load crypto transaction data. You may be rate limited by the API. Please check your internet connection or browser console for CORS errors. Error: ${err.message}`);
          setLoading(false);
        }
      };

      fetchCryptoData();

    } else {
      setChartData(data);
    }
  }, [dataType, data]);

  const defaultOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: dataType === 'bitcoin-transactions' ? 'Crypto Daily Volume (USD)' : 'Chart Title',
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        callbacks: {
          title: function(context: any) {
            return `Date: ${context[0].label}`;
          },
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US').format(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    hover: {
      mode: 'index' as const,
      intersect: false,
    },
  };

  const ChartComponent = type === 'line' ? Line : Bar;

  if (loading) {
    return <div className="my-8 p-4 bg-gray-50 rounded-lg shadow-inner border border-gray-200">Loading chart data...</div>;
  }

  if (error) {
    return <div className="my-8 p-4 bg-red-100 text-red-800 rounded-lg shadow-inner border border-red-400">Error: {error}</div>;
  }

  if (!chartData) {
    return <div className="my-8 p-4 bg-gray-50 rounded-lg shadow-inner border border-gray-200">No chart data available.</div>;
  }

  return (
    <div className="my-8 p-4 bg-gray-50 rounded-lg shadow-inner border border-gray-200">
      <ChartComponent data={chartData} options={options || defaultOptions} />
    </div>
  );
};

export default ChartWrapper;
