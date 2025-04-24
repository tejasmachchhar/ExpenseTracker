import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardData } from '../../store/slices/transactionSlice';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export const Report = () => {
  const dispatch = useDispatch();
  const { dashboardData, status, error } = useSelector((state) => state.transactions);
  const [trendsData, setTrendsData] = useState([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState('last6Months');

  const calculateDateRange = (timeRange) => {
    const endDate = new Date();
    let startDate = new Date();

    switch (timeRange) {
      case 'last7Days':
        startDate.setDate(endDate.getDate() - 7);
        break;
      case 'last30Days':
        startDate.setDate(endDate.getDate() - 30);
        break;
      case 'last6Months':
        startDate.setMonth(endDate.getMonth() - 6);
        break;
      case 'lastYear':
        startDate.setFullYear(endDate.getFullYear() - 1);
        break;
      default:
        startDate.setMonth(endDate.getMonth() - 6);
    }

    return {
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0]
    };
  };

  useEffect(() => {
    const controller = new AbortController();
    let isSubscribed = true;
    
    const fetchData = async () => {
      try {
        const dateRange = calculateDateRange(selectedTimeRange);
        if (status === 'idle') {
          dispatch(fetchDashboardData());
        }

        try {
          const trendsResponse = await axios.get('/daily-trends', {
            params: {
              startDate: dateRange.startDate,
              endDate: dateRange.endDate
            },
            signal: controller.signal
          });
          if (isSubscribed && trendsResponse.data && trendsResponse.data.data) {
            setTrendsData(trendsResponse.data.data);
          }
        } catch (error) {
          if (!axios.isCancel(error)) {
            console.error('Trends fetch error:', error);
            toast.error('Failed to fetch trends data');
          }
        }
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error('Fetch error:', error);
          toast.error('An error occurred while fetching data');
        }
      }
    };

    fetchData();

    return () => {
      isSubscribed = false;
      controller.abort();
    };
  }, [selectedTimeRange, dispatch, status]);

  // Chart configurations
  const trendsChartData = {
    labels: trendsData?.length ? trendsData.map(item => item.date) : [],
    datasets: [
      {
        label: 'Income',
        data: trendsData?.length ? trendsData.map(item => item.income) : [],
        backgroundColor: '#2ecc71',
        borderColor: '#27ae60',
        borderWidth: 1
      },
      {
        label: 'Expense',
        data: trendsData?.length ? trendsData.map(item => item.expense) : [],
        backgroundColor: '#e74c3c',
        borderColor: '#c0392b',
        borderWidth: 1
      }
    ]
  };

  const trendsChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Daily Income vs Expense Trends'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount (₹)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Date'
        }
      }
    }
  };

  return (
    <div className="main-content">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Expense Report</h1>
          <div className="user-profile">
            <div className="user-avatar">TR</div>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-info">
              <h3>Total Income</h3>
              <p>₹{dashboardData.income?.total?.toFixed(2) || '0.00'}</p>
            </div>
            <div className="stat-icon icon-total">₹</div>
          </div>
          <div className="stat-card">
            <div className="stat-info">
              <h3>This Month</h3>
              <p>₹{dashboardData.income?.thisMonth?.toFixed(2) || '0.00'}</p>
            </div>
            <div className="stat-icon icon-month">M</div>
          </div>
          <div className="stat-card">
            <div className="stat-info">
              <h3>Average Monthly Income</h3>
              <p>₹{dashboardData.income?.monthlyAverage?.toFixed(2) || '0.00'}</p>
            </div>
            <div className="stat-icon icon-average">A</div>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="main-chart-container">
            <div className="chart-header">
              <h2>Daily Income vs Expense Trends</h2>
              <div className="chart-filter">
                <select
                  value={selectedTimeRange}
                  onChange={(e) => setSelectedTimeRange(e.target.value)}
                >
                  <option value="last7Days">Last 7 Days</option>
                  <option value="last30Days">Last 30 Days</option>
                  <option value="last6Months">Last 6 Months</option>
                  <option value="lastYear">Last Year</option>
                </select>
              </div>
            </div>
            <div className="chart-container">
              <Bar data={trendsChartData} options={trendsChartOptions} />
            </div>
          </div>

          <div className="categories-container">
            <h2>Expense by Category</h2>
            <div className="category-list">
              {dashboardData.expense?.categories?.map((category, index) => (
                <div className="category-item" key={`expense-${category.categoryName}-${index}`}>
                  <div className="category-info">
                    <div className={`category-icon icon-${String(category.categoryName).toLowerCase()}`}>
                      {String(category.categoryName).charAt(0).toUpperCase()}
                    </div>
                    <div className="category-name">
                      <h4>{category.categoryName}</h4>
                      <p>{((category.total / dashboardData.expense.total) * 100).toFixed(1)}% of total</p>
                    </div>
                  </div>
                  <div className="category-amount">₹{category.total.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}