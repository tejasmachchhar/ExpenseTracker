import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
    const [transactions, setTransactions] = useState([]);
    const [username, setUsername] = useState({
        firstName: localStorage.getItem('username') || '',
        lastName: localStorage.getItem('surname') || ' '
    });
    const [dashboardData, setDashboardData] = useState({
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

    const fetchUserData = async () => {
        try {
            const firstName = localStorage.getItem('username') || '';
            const lastName = localStorage.getItem('surname') || ' ';
            setUsername({
                firstName: firstName,
                lastName: lastName
            });
            // const token = localStorage.getItem('token');
            // const response = await axios.get('/user', {
            //     headers: { Authorization: `Bearer ${token}` },
            // });
            // console.log('User data fetched:', response.data);
            // Handle user data if needed
        } catch (error) {
            toast.error('Error fetching user data. Please try again later.');
            console.error('Error fetching user data:', error);
        }
    };

    const fetchDashboardData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/dashboard', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setDashboardData(response.data.data);
            console.log('Dashboard data fetched:', response.data.data);
        } catch (error) {
            toast.error('Error fetching dashboard data. Please try again later.');
            console.error('Error fetching dashboard data:', error);
        }
    };

    const fetchTransactions = async () => {
        try {
            console.log('Fetching transactions...');
            const token = localStorage.getItem('token');
            const response = await axios.get('/userExpenses', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTransactions(response.data);
            console.log('Transactions fetched:', response.data);
        } catch (error) {
            toast.error('Error fetching transactions. Please try again later.');
            console.error('Error fetching transactions:', error);
        }
    }

    useEffect(() => {
        fetchTransactions();
        fetchDashboardData();
        fetchUserData();
    }, []); // Empty dependency array ensures this runs only once when the component mounts
    return (
        <>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Expense Dashboard</title>
            <div className="main-content">
                <div className="dashboard-container">
                    <div className="dashboard-header">
                        <h1>Expense Dashboard</h1>
                        <div className="user-profile">
                            <span>Welcome, {username.firstName} </span>
                            <div className="user-avatar">{`${username.firstName[0]}${username.lastName[0]}`}</div>
                        </div>
                    </div>
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-info">
                                <h3>Total Expenses</h3>
                                <p>₹{dashboardData.expense.total.toFixed(2)}</p>
                            </div>
                            <div className="stat-icon icon-total">₹</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-info">
                                <h3>This Month Expense</h3>
                                <p>₹{dashboardData.expense.thisMonth.toFixed(2)}</p>
                            </div>
                            <div className="stat-icon icon-month">M</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-info">
                                <h3>Average Monthly Expenses</h3>
                                <p>₹{dashboardData.expense.monthlyAverage.toFixed(2)}</p>
                            </div>
                            <div className="stat-icon icon-average">A</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-info">
                                <h3>This Month Income</h3>
                                <p>₹{dashboardData.income.thisMonth.toFixed(2)}</p>
                            </div>
                            <div className="stat-icon icon-month">M</div>
                        </div>
                    </div>
                    <div className="dashboard-content">
                        <div className="recent-transactions">
                            <div className="section-header">
                                <h2>Recent Transactions</h2>
                                <Link to = "/user/transactions" className="view-all-link">
                                    <a>View All</a>
                                </Link>
                            </div>
                            <table className="transaction-table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Description</th>
                                        <th>Category</th>
                                        <th>Amount</th>
                                        {/* <th>Status</th> */}
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Mar 15, 2025</td>
                                        <td>Client meeting lunch</td>
                                        <td>
                                            <span className="category-badge badge-food">Food</span>
                                        </td>
                                        <td>₹85.50</td>
                                        {/* <td>
                                            <span className="status-badge status-approved">Approved</span>
                                        </td> */}
                                        <td className="action-buttons">
                                            <button className="action-btn">👁️</button>
                                            <button className="action-btn">✏️</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Mar 12, 2025</td>
                                        <td>Office supplies</td>
                                        <td>
                                            <span className="category-badge badge-office">Office</span>
                                        </td>
                                        <td>₹123.75</td>
                                        {/* <td>
                                            <span className="status-badge status-approved">Approved</span>
                                        </td> */}
                                        <td className="action-buttons">
                                            <button className="action-btn">👁️</button>
                                            <button className="action-btn">✏️</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Mar 10, 2025</td>
                                        <td>Flight to Boston</td>
                                        <td>
                                            <span className="category-badge badge-travel">Travel</span>
                                        </td>
                                        <td>₹425.00</td>
                                        {/* <td>
                                            <span className="status-badge status-pending">Pending</span>
                                        </td> */}
                                        <td className="action-buttons">
                                            <button className="action-btn">👁️</button>
                                            <button className="action-btn">✏️</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Mar 8, 2025</td>
                                        <td>Software subscription</td>
                                        <td>
                                            <span className="category-badge badge-other">Other</span>
                                        </td>
                                        <td>₹49.99</td>
                                        {/* <td>
                                            <span className="status-badge status-rejected">Rejected</span>
                                        </td> */}
                                        <td className="action-buttons">
                                            <button className="action-btn">👁️</button>
                                            <button className="action-btn">✏️</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Mar 5, 2025</td>
                                        <td>Team dinner</td>
                                        <td>
                                            <span className="category-badge badge-food">Food</span>
                                        </td>
                                        <td>₹215.30</td>
                                        {/* <td>
                                            <span className="status-badge status-approved">Approved</span>
                                        </td> */}
                                        <td className="action-buttons">
                                            <button className="action-btn">👁️</button>
                                            <button className="action-btn">✏️</button>
                                        </td>
                                    </tr>
                                    {transactions?.data?.map((transaction) => (
                                        <tr key={transaction._id || transaction.id}>
                                            <td>{format(new Date(transaction.dateTime), 'MMM dd, yyyy')}</td>
                                            <td>{transaction.notes}</td>
                                            <td>
                                                <span className={`category-badge badge-${(transaction.category || '').toLowerCase()}`}>
                                                    {transaction.category}
                                                </span>
                                            </td>
                                            <td>₹{transaction.amountSpent}</td>
                                            <td className="action-buttons">
                                                <button className="action-btn">👁️</button>
                                                <button className="action-btn">✏️</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {/* <parameter name="language" /> */}
        </>
    )
}
