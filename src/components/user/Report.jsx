import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export const Report = () => {
  const [reportData, setReportData] = useState({
    income: {
      total: 0,
      thisMonth: 0,
      monthlyAverage: 0
    },
    expense: {
      total: 0,
      thisMonth: 0,
      monthlyAverage: 0
    },
    categoryWiseTotal: []
  });
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
        startDate.setMonth(endDate.getMonth() - 6); // default to last 6 months
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
        console.log('Fetching trends with date range:', dateRange);
        
        try {
          const reportResponse = await axios.get('/dashboard', {
            params: { timeRange: selectedTimeRange },
            signal: controller.signal
          });
          if (isSubscribed) {
            setReportData(reportResponse.data.data);
          }
        } catch (error) {
          if (!axios.isCancel(error)) {
            console.error('Dashboard fetch error:', error);
            toast.error('Failed to fetch dashboard data');
          }
        }

        try {
          const trendsResponse = await axios.get('/daily-trends', {
            params: {
              startDate: dateRange.startDate,
              endDate: dateRange.endDate
            },
            signal: controller.signal
          });
          console.log('startDate:', dateRange.startDate, 'endDate:', dateRange.endDate);
          if (isSubscribed) {
            console.log('Received trends data:', trendsResponse.data);
            if (trendsResponse.data && trendsResponse.data.data) {
              setTrendsData(trendsResponse.data.data);
            } else {
              console.error('Invalid trends data format:', trendsResponse.data);
              toast.error('Invalid trends data format received');
            }
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
  }, [selectedTimeRange]);

  const barChartData = {
    labels: reportData.categoryWiseTotal?.map(cat => cat.category) || [],
    datasets: [
      {
        label: 'Expenses by Category',
        data: reportData.categoryWiseTotal?.map(cat => cat.total) || [],
        backgroundColor: [
          '#3498db', // blue
          '#e74c3c', // red
          '#2ecc71', // green
          '#9b59b6', // purple
          '#f39c12', // orange
          '#1abc9c', // turquoise
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Expense Distribution by Category',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount (₹)',
        },
      },
    },
  };

  // Update trendsChartData to handle empty or invalid data
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
              <p>₹{reportData.income?.total?.toFixed(2) || '0.00'}</p>
            </div>
            <div className="stat-icon icon-total">₹</div>
          </div>
          <div className="stat-card">
            <div className="stat-info">
              <h3>This Month</h3>
              <p>₹{reportData.income?.thisMonth?.toFixed(2) || '0.00'}</p>
            </div>
            <div className="stat-icon icon-month">M</div>
          </div>
          <div className="stat-card">
            <div className="stat-info">
              <h3>Monthly Average</h3>
              <p>₹{reportData.income?.monthlyAverage?.toFixed(2) || '0.00'}</p>
            </div>
            <div className="stat-icon icon-average">A</div>
          </div>
          <div className="stat-card">
            <div className="stat-info">
              <h3>Total Expenses</h3>
              <p>₹{reportData.expense.total.toFixed(2)}</p>
            </div>
            <div className="stat-icon icon-total">₹</div>
          </div>
          <div className="stat-card">
            <div className="stat-info">
              <h3>This Month Expense</h3>
              <p>₹{reportData.expense.thisMonth.toFixed(2)}</p>
            </div>
            <div className="stat-icon icon-month">M</div>
          </div>
          <div className="stat-card">
            <div className="stat-info">
              <h3>Average Monthly Expenses</h3>
              <p>₹{reportData.expense.monthlyAverage.toFixed(2)}</p>
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
              {reportData.expense.categories?.map((category, index) => {
                const categoryName = category.categoryName;
                return (
                  <div className="category-item" key={`expense-${categoryName}-${index}`}>
                    <div className="category-info">
                      <div className={`category-icon icon-${String(categoryName).toLowerCase()}`}>
                        {String(categoryName).charAt(0).toUpperCase()}
                      </div>
                      <div className="category-name">
                        <h4>{categoryName}</h4>
                        <p>{((category.total / reportData.expense.total) * 100).toFixed(1)}% of total</p>
                      </div>
                    </div>
                    <div className="category-amount">₹{category.total.toFixed(2)}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="dashboard-content">
          {/* <div className="main-chart-container">
            <div className="chart-header">
              <h2>Income Trends</h2>
              <div className="chart-filter">
                <select
                  value={selectedTimeRange}
                  onChange={(e) => setSelectedTimeRange(e.target.value)}
                >
                  <option value="last6Months">Last 6 Months</option>
                  <option value="lastYear">Last Year</option>
                  <option value="thisYear">This Year</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>
            </div>
            <div className="chart-container">
              <Bar data={barChartData} options={chartOptions} />
            </div>
          </div> */}

          <div className="categories-container">
            <h2>Income by Category</h2>
            <div className="category-list">
              {reportData.income.categories?.map((category, index) => (
                <div className="category-item" key={`income-${category.categoryName}-${index}`}>
                  <div className="category-info">
                    <div className={`category-icon icon-${String(category.categoryName).toLowerCase()}`}>
                      {String(category.categoryName).charAt(0).toUpperCase()}
                    </div>
                    <div className="category-name">
                      <h4>{category.categoryName}</h4>
                      <p>{((category.total / reportData.income.total) * 100).toFixed(1)}% of total</p>
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
};