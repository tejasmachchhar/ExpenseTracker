import React, { useEffect, useState } from 'react'
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions, fetchDashboardData, updateTransaction } from '../../store/slices/transactionSlice';
import { Fab } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { TransactionTable } from '../common/TransactionTable';
import { TransactionModal } from '../common/TransactionModal';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import '../../assets/css/components.css';
import { ToastContainer } from 'react-toastify';

ChartJS.register(ArcElement, Tooltip, Legend);

export const Dashboard = () => {
    const { expenseCategories, incomeCategories } = useSelector((state) => state.categories);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { transactions, dashboardData, userData, status, error } = useSelector((state) => state.transactions);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        notes: '',
        category: '',
        amountSpent: '',
        dateTime: '',
        paidTo: '',
        transactionType: ''
    });

    useEffect(() => {
        dispatch(fetchTransactions());
        dispatch(fetchDashboardData());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            toast.error('Error fetching data. Please try again later.');
        }
    }, [error]);

    const handleEdit = (transaction) => {
        const formattedDateTime = transaction.dateTime ? new Date(transaction.dateTime).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16);

        setSelectedTransaction(transaction);
        setEditForm({
            notes: transaction.notes || '',
            category: transaction.category || '',
            amountSpent: transaction.amountSpent || '',
            dateTime: formattedDateTime,
            paidTo: transaction.paidTo || '',
            transactionType: transaction.transactionType || 'expense'
        });
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const handleView = (transaction) => {
        setSelectedTransaction(transaction);
        setIsEditing(false);
        setIsModalOpen(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await dispatch(updateTransaction({
                id: selectedTransaction._id,
                formData: editForm
            })).unwrap();
            setIsModalOpen(false);
            toast.success('Transaction updated successfully');
            // Refresh data after update
            dispatch(fetchTransactions());
            dispatch(fetchDashboardData());
        } catch (err) {
            toast.error('Failed to update transaction');
        }
    };

    // Get last 10 transactions
    const recentTransactions = transactions?.data?.slice(0, 10) || [];

    const getChartData = () => {
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

    const chartOptions = {
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
        <>
            <ToastContainer position="top-right" autoClose={3000} />
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Expense Dashboard</title>
            <div className="main-content">
                <div className="page-container">
                    <div className="dashboard-header">
                        <h1>Expense Dashboard</h1>
                        <div className="user-profile">
                            <span>Welcome, {userData.firstName}</span>
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
                                <Link to="/user/transactions" className="view-all-link">View All</Link>
                            </div>
                            <TransactionTable
                                transactions={recentTransactions}
                                isLoading={status === 'loading'}
                                onView={handleView}
                                onEdit={handleEdit}
                                showDelete={false}
                            />
                        </div>
                        <div className="chart-section">
                            <div className="chart-container">
                                <Pie data={getChartData()} options={chartOptions} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <TransactionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                transaction={selectedTransaction}
                isEditing={isEditing}
                editForm={editForm}
                onEditChange={setEditForm}
                onUpdate={handleUpdate}
                expenseCategories={expenseCategories}
                incomeCategories={incomeCategories}
            />

            <Fab
                color="primary"
                aria-label="add"
                onClick={() => {
                    window.dispatchEvent(new CustomEvent('sidebarTabChange', { detail: 'addTransaction' }));
                    navigate('/user/addtransaction');
                }}
                sx={{
                    position: 'fixed',
                    bottom: 55,
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
