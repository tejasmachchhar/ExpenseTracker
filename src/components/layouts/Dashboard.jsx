import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { format } from 'date-fns';

export const Dashboard = () => {
    const [transactions, setTransactions] = useState([]);
    const fetchTransactions = async () => {
        try {
            console.log('Fetching transactions...');
            const response = await axios.get('/expenses');
            setTransactions(response.data);
            console.log('Transactions fetched:', response.data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    }
    useEffect(() => {
        fetchTransactions();
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
                            <span>Welcome, Tejas </span>
                            <div className="user-avatar">TM</div>
                        </div>
                    </div>
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-info">
                                <h3>Total Expenses</h3>
                                <p>₹12,450</p>
                            </div>
                            <div className="stat-icon icon-total">₹</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-info">
                                <h3>This Month</h3>
                                <p>₹2,840</p>
                            </div>
                            <div className="stat-icon icon-month">M</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-info">
                                <h3>Average Monthly</h3>
                                <p>₹2,075</p>
                            </div>
                            <div className="stat-icon icon-average">A</div>
                        </div>
                    </div>
                    <div className="dashboard-content">
                        <div className="main-chart-container">
                            <div className="chart-header">
                                <h2>Expense Trends</h2>
                                <div className="chart-filter">
                                    <select>
                                        <option>Last 6 Months</option>
                                        <option>Last Year</option>
                                        <option>This Year</option>
                                        <option>Custom Range</option>
                                    </select>
                                </div>
                            </div>
                            <div className="chart-container">
                                <canvas id="expense-trend-chart" />
                            </div>
                        </div>
                        <div className="categories-container">
                            <h2>Expense by Category</h2>
                            <div className="category-list">
                                <div className="category-item">
                                    <div className="category-info">
                                        <div className="category-icon icon-travel">T</div>
                                        <div className="category-name">
                                            <h4>Travel</h4>
                                            <p>25% of total</p>
                                        </div>
                                    </div>
                                    <div className="category-amount">₹3,112.50</div>
                                </div>
                                <div className="category-item">
                                    <div className="category-info">
                                        <div className="category-icon icon-food">F</div>
                                        <div className="category-name">
                                            <h4>Food &amp; Dining</h4>
                                            <p>32% of total</p>
                                        </div>
                                    </div>
                                    <div className="category-amount">₹3,984.00</div>
                                </div>
                                <div className="category-item">
                                    <div className="category-info">
                                        <div className="category-icon icon-office">O</div>
                                        <div className="category-name">
                                            <h4>Office Supplies</h4>
                                            <p>18% of total</p>
                                        </div>
                                    </div>
                                    <div className="category-amount">₹2,241.00</div>
                                </div>
                                <div className="category-item">
                                    <div className="category-info">
                                        <div className="category-icon icon-other">X</div>
                                        <div className="category-name">
                                            <h4>Other</h4>
                                            <p>25% of total</p>
                                        </div>
                                    </div>
                                    <div className="category-amount">₹3,112.50</div>
                                </div>
                            </div>
                        </div>
                        <div className="recent-transactions">
                            <div className="section-header">
                                <h2>Recent Transactions</h2>
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
                                    {
                                    // transactions.length > 0 ?
                                        transactions?.data?.map((transaction) => {
                                            return (
                                                // console.log("Tr: "+ transaction.dateTime),
                                                <tr key={transaction.id}>
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
                </div>
            </div>
            {/* <parameter name="language" /> */}
        </>
    )
}
