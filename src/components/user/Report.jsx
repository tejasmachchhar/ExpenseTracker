import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardData } from '../../store/slices/transactionSlice';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import '../../../src/assets/css/components.css';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export const Report = () => {
    const dispatch = useDispatch();
    const { dashboardData, userData, status, error } = useSelector((state) => state.transactions);
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
        const fetchData = async () => {
            try {
                const { startDate, endDate } = calculateDateRange(selectedTimeRange);
                const response = await axios.get(`/daily-trends?startDate=${startDate}&endDate=${endDate}`);
                setTrendsData(response.data.data);
            } catch (error) {
                toast.error('Failed to fetch trends data');
            }
        };

        if (status !== 'loading') {
            fetchData();
        }
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

    const getCategoryPieData = () => {
        const categories = dashboardData.expense?.categories || [];
        return {
            labels: categories.map(cat => cat.categoryName),
            datasets: [{
                data: categories.map(cat => cat.total),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                    '#E7E9ED',
                    '#2ecc71',
                    '#e74c3c',
                    '#3498db',
                    '#f1c40f'
                ],
                borderWidth: 1
            }]
        };
    };

    const pieChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    boxWidth: 15,
                    padding: 15,
                    font: {
                        size: 12
                    }
                }
            },
            title: {
                display: true,
                text: 'Expenses by Category',
                font: {
                    size: 16,
                    weight: 'bold'
                }
            }
        }
    };

    return (
        <div className="main-content">
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="page-container">
                <div className="dashboard-header">
                    <h1>Expense Report</h1>
                    <div className="user-profile">
                        <span>Welcome, {userData?.firstName}</span>
                        <div className="user-avatar">{`${userData?.firstName?.[0]}${userData?.lastName?.[0]}`}</div>
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

                <div className="chart-section mt-4">
                    <div className="chart-container" style={{ height: '400px' }}>
                        <Pie data={getCategoryPieData()} options={pieChartOptions} />
                    </div>
                </div>

                <div className="chart-section">
                    <div className="chart-header">
                        <h2>Daily Income vs Expense Trends</h2>
                        <div className="chart-filter">
                            <select
                                className="form-control"
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

                <div className="categories-section">
                    <h2>Expense by Category</h2>
                    <div className="stats-grid">
                        {dashboardData.expense?.categories?.map((category, index) => (
                            <div className="stat-card" key={`expense-${category.categoryName}-${index}`}>
                                <div className="stat-info">
                                    <h3>{category.categoryName}</h3>
                                    <p>₹{category.total.toFixed(2)}</p>
                                    <small>{((category.total / dashboardData.expense.total) * 100).toFixed(1)}% of total</small>
                                </div>
                                <div className={`stat-icon icon-${String(category.categoryName).toLowerCase()}`}>
                                    {String(category.categoryName).charAt(0).toUpperCase()}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}