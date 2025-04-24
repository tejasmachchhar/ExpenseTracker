import React, { useEffect } from 'react'
import { format } from 'date-fns';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions } from '../../store/slices/transactionSlice';
import 'react-toastify/dist/ReactToastify.css';

export const Transactions = () => {
    const dispatch = useDispatch();
    const { transactions, status, error } = useSelector((state) => state.transactions);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchTransactions());
        }

        if (error) {
            toast.error('Error fetching transactions. Please try again later.');
        }
    }, [dispatch, status, error]);

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
                    <a href="#">View All</a>
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
                                    <span style={{ color: 'black' }} className={`category-badge badge-${(transaction.category || '').toLowerCase()}`}>
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
    )
}
