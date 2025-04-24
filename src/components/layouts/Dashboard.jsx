import React, { useEffect, useState } from 'react'
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions, fetchDashboardData, updateTransaction } from '../../store/slices/transactionSlice';
import { Fab } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export const Dashboard = () => {
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
                                            <td>{format(new Date(transaction.dateTime), 'MMM dd, yyyy HH:mm')}</td>
                                            <td>{transaction.notes}</td>
                                            <td>
                                                <span className={`category-badge ${
                                                    transaction.category 
                                                        ? `badge-${transaction.category.toLowerCase().replace(/\s+/g, '')}` 
                                                        : ''
                                                }`}>
                                                    {transaction.category || 'Uncategorized'}
                                                </span>
                                            </td>
                                            <td>₹{transaction.amountSpent}</td>
                                            <td className="action-buttons">
                                                <button 
                                                    className="action-btn view-btn"
                                                    onClick={() => handleView(transaction)}
                                                    title="View"
                                                >
                                                    👁️
                                                </button>
                                                <button 
                                                    className="action-btn edit-btn"
                                                    onClick={() => handleEdit(transaction)}
                                                    title="Edit"
                                                >
                                                    ✏️
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Transaction Modal */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="modal-close" onClick={() => setIsModalOpen(false)}>×</button>
                        <h2>{isEditing ? 'Edit Transaction' : 'View Transaction'}</h2>
                        
                        {isEditing ? (
                            <form onSubmit={handleUpdate} className="edit-form">
                                <div className="form-group">
                                    <label>Description</label>
                                    <input
                                        type="text"
                                        value={editForm.notes}
                                        onChange={(e) => setEditForm({...editForm, notes: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Category</label>
                                    <input
                                        type="text"
                                        value={editForm.category}
                                        onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Amount</label>
                                    <input
                                        type="number"
                                        value={editForm.amountSpent}
                                        onChange={(e) => setEditForm({...editForm, amountSpent: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Date & Time</label>
                                    <input
                                        type="datetime-local"
                                        value={editForm.dateTime.split('.')[0]}
                                        onChange={(e) => setEditForm({...editForm, dateTime: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Paid To / Received From</label>
                                    <input
                                        type="text"
                                        value={editForm.paidTo}
                                        onChange={(e) => setEditForm({...editForm, paidTo: e.target.value})}
                                    />
                                </div>
                                <button type="submit" className="update-btn">Update Transaction</button>
                            </form>
                        ) : (
                            <div className="transaction-details">
                                <div className="detail-row">
                                    <span className="label">Date & Time:</span>
                                    <span className="value">{format(new Date(selectedTransaction.dateTime), 'MMM dd, yyyy HH:mm')}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="label">Description:</span>
                                    <span className="value">{selectedTransaction.notes}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="label">Category:</span>
                                    <span className="value">
                                        <span className={`category-badge badge-${(selectedTransaction.category || '').toLowerCase()}`}>
                                            {selectedTransaction.category}
                                        </span>
                                    </span>
                                </div>
                                <div className="detail-row">
                                    <span className="label">Amount:</span>
                                    <span className="value">₹{selectedTransaction.amountSpent}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="label">{selectedTransaction.transactionType === 'income' ? 'Received From:' : 'Paid To:'}</span>
                                    <span className="value">{selectedTransaction.paidTo || 'Not specified'}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="label">Type:</span>
                                    <span className="value">{selectedTransaction.transactionType || 'expense'}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

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
