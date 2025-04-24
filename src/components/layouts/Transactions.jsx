import React, { useEffect, useState } from 'react'
import { format } from 'date-fns';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions, deleteTransaction, updateTransaction, fetchDashboardData } from '../../store/slices/transactionSlice';
import 'react-toastify/dist/ReactToastify.css';

export const Transactions = () => {
    const dispatch = useDispatch();
    const { transactions, status, error } = useSelector((state) => state.transactions);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [editForm, setEditForm] = useState({
        notes: '',
        category: '',
        amountSpent: '',
        dateTime: '',
        paidTo: '',
        transactionType: ''
    });

    // Function to fetch all data
    const refreshData = async () => {
        setIsRefreshing(true);
        try {
            await dispatch(fetchTransactions()).unwrap();
            await dispatch(fetchDashboardData()).unwrap();
        } catch (error) {
            toast.error('Failed to refresh data');
        } finally {
            setIsRefreshing(false);
        }
    };

    useEffect(() => {
        refreshData();
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            toast.error('Error fetching transactions. Please try again later.');
        }
    }, [error]);

    const handleView = (transaction) => {
        setSelectedTransaction(transaction);
        setIsEditing(false);
        setIsModalOpen(true);
    };

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

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this transaction?')) {
            try {
                await dispatch(deleteTransaction(id)).unwrap();
                toast.success('Transaction deleted successfully');
                refreshData(); // Refresh data after deletion
            } catch (err) {
                toast.error('Failed to delete transaction');
            }
        }
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
            refreshData(); // Refresh data after update
        } catch (err) {
            toast.error('Failed to update transaction');
        }
    };

    return (
        <div className="main-content">
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="dashboard-header">
                <h1>Transactions</h1>
                <div className="user-profile">
                    <span>Welcome, Tejas </span>
                    <div className="user-avatar">TM</div>
                </div>
            </div>

            <div className="recent-transactions">
                <div className="section-header">
                    <h2>Your Transactions</h2>
                    <button 
                        onClick={refreshData} 
                        className={`refresh-btn ${isRefreshing ? 'refreshing' : ''}`}
                        disabled={isRefreshing}
                    >
                        <svg 
                            className="refresh-icon" 
                            width="16" 
                            height="16" 
                            viewBox="0 0 16 16"
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path 
                                d="M13.65 2.35A7.958 7.958 0 0 0 8 0a8 8 0 1 0 8 8h-2a6 6 0 1 1-1.35-3.65l1 1V2.35z" 
                                fill="currentColor"
                            />
                        </svg>
                        {isRefreshing ? 'Refreshing...' : 'Refresh'}
                    </button>
                </div>
                <table className="transaction-table">
                    <thead>
                        <tr>
                            <th>Date & Time</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Amount</th>
                            <th>Paid To/From</th>
                            <th>Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {status === 'loading' ? (
                            <tr>
                                <td colSpan="7" style={{ textAlign: 'center' }}>Loading...</td>
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
                                <td>{transaction.paidTo || '-'}</td>
                                <td>{transaction.transactionType || 'expense'}</td>
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
                                    <button 
                                        className="action-btn delete-btn"
                                        onClick={() => handleDelete(transaction._id)}
                                        title="Delete"
                                    >
                                        🗑️
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
                                        value={editForm.dateTime}
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
                                <div className="form-group">
                                    <label>Transaction Type</label>
                                    <select
                                        value={editForm.transactionType}
                                        onChange={(e) => setEditForm({...editForm, transactionType: e.target.value})}
                                        required
                                    >
                                        <option value="expense">Expense</option>
                                        <option value="income">Income</option>
                                    </select>
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
                                        <span className={`category-badge ${
                                            selectedTransaction.category 
                                                ? `badge-${selectedTransaction.category.toLowerCase().replace(/\s+/g, '')}` 
                                                : ''
                                        }`}>
                                            {selectedTransaction.category || 'Uncategorized'}
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
        </div>
    );
}
