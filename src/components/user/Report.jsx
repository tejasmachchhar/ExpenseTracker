import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export const Report = () => {
  const [expenseData, setExpenseData] = useState([]);
  const [categoryData, setCategoryData] = useState({});

  const fetchReportData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/expenses/report', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenseData(response.data.expenses);
      setCategoryData(response.data.categorySummary);
    } catch (error) {
      console.error('Error fetching report data:', error);
    }
  };

  useEffect(() => {
    fetchReportData();
  }, []);

  const barChartData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        label: 'Expenses by Category',
        data: Object.values(categoryData),
        backgroundColor: [
          '#3498db',
          '#e74c3c',
          '#2ecc71',
          '#9b59b6',
          '#f39c12',
          '#1abc9c',
        ],
      },
    ],
  };

  const pieChartData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        data: Object.values(categoryData),
        backgroundColor: [
          '#3498db',
          '#e74c3c',
          '#2ecc71',
          '#9b59b6',
          '#f39c12',
          '#1abc9c',
        ],
      },
    ],
  };

  return (
    <div className="main-content">
      <h1>Expense Reports</h1>
      <div className="chart-container">
        <h2>Expenses by Category</h2>
        <Bar data={barChartData} />
      </div>
      <div className="chart-container">
        <h2>Category Distribution</h2>
        <Pie data={pieChartData} />
      </div>
    </div>
  );
};