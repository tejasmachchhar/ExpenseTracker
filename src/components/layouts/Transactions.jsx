import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { format } from 'date-fns';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const fetchTransactions = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/userExpenses', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTransactions(response.data);
        } catch (error) {
            toast.error('Error fetching transactions. Please try again later.');
            console.error('Error fetching transactions:', error);
        }
    }
    useEffect(() => {
        fetchTransactions();
    }, []); // Empty dependency array ensures this runs only once when the component mounts

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
                            {/* <th>Status</th> */}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // transactions.length > 0 ?
                            transactions?.data?.map((transaction, index) => {
                                return (
                                    // console.log("Tr: "+ transaction.dateTime),
                                    <tr key={transaction._id || index}>
                                        <td>{format(new Date(transaction.dateTime), 'MMM dd, yyyy')}</td>
                                        <td>{transaction.notes}</td>
                                        <td>
                                            <span className={`category-badge badge-travel`}>{transaction.category}</span>
                                        </td>
                                        <td>₹{transaction.amountSpent}</td>
                                        {/* <td>
                                                <span className={`status-badge status-${transaction.status.toLowerCase()}`}>{transaction.status}</span>
                                            </td> */}
                                        <td className="action-buttons">
                                            <button className="action-btn">👁️</button>
                                            <button className="action-btn">✏️</button>
                                        </td>
                                    </tr>
                                )
                            })
                            // :
                            // <tr>
                            //     <td colSpan="5" style={{ textAlign: 'center' }}>No transactions available</td>
                            // </tr>
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}
