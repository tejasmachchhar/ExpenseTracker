import React, { useEffect } from 'react'
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions, fetchDashboardData } from '../../store/slices/transactionSlice';
import { Fab } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { transactions, dashboardData, userData, status, error } = useSelector((state) => state.transactions);
    
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchTransactions());
            dispatch(fetchDashboardData());
        }

        if (error) {
            toast.error('Error fetching data. Please try again later.');
        }
    }, [dispatch, status, error]);

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
                            <span>Welcome, {userData.firstName} </span>
                            <div className="user-avatar">{`${userData.firstName[0]}${userData.lastName[0]}`}</div>
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
                                <Link to="/user/transactions" className="view-all-link">
                                    <div>View All</div>
                                </Link>
                            </div>
                            <table className="transaction-table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Description</th>
                                        <th>Category</th>
                                        <th>Amount</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {status === 'loading' ? (
                                        <tr>
                                            <td colSpan="5" style={{ textAlign: 'center' }}>Loading...</td>
                                        </tr>
                                    ) : transactions?.data?.map((transaction) => (
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
            <Fab 
                color="primary" 
                aria-label="add"
                onClick={() => {
                    window.dispatchEvent(new CustomEvent('sidebarTabChange', { detail: 'addTransaction' }));
                    navigate('/user/addtransaction');
                }}
                sx={{
                    position: 'fixed',
                    bottom: 30,
                    right: 30,
                    '&:hover': {
                        backgroundColor: '#2980b9'
                    }
                }}
            >
                <AddCircleIcon />
            </Fab>
        </>
    )
}
