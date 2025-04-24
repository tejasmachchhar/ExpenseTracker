import React from 'react';
import { format, isValid } from 'date-fns';
import '../../assets/css/TransactionTable.css';

export const TransactionTable = ({ 
    transactions, 
    isLoading, 
    onView, 
    onEdit, 
    onDelete, 
    showDelete = false,
    showPaidTo = false,
    showType = false,
    currentPage,
    totalPages,
    onPageChange,
    showPagination = false,
}) => {
    // console.log('TransactionTable',  transactions, isLoading, onView, onEdit, onDelete, showDelete, showPaidTo, showType, currentPage, totalPages, onPageChange, showPagination)
    return (
        <div className="transaction-table-container">
            <table className="transaction-table">
                <thead>
                    <tr>
                        <th>Date & Time</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Amount</th>
                        {showPaidTo && <th>Paid To/From</th>}
                        {showType && <th>Type</th>}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <tr>
                            <td colSpan={showPaidTo && showType ? "7" : showPaidTo || showType ? "6" : "5"} 
                                style={{ textAlign: 'center' }}>
                                Loading...
                            </td>
                        </tr>
                    ) : transactions?.map((transaction) => (
                        <tr key={transaction._id || transaction.id}>
                            <td>
                                {(() => {
                                    const date = new Date(transaction.dateTime);
                                    return isValid(date) 
                                        ? format(date, 'MMM dd, yyyy HH:mm')
                                        : 'Invalid Date';
                                })()}
                            </td>
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
                            {showPaidTo && <td>{transaction.paidTo || '-'}</td>}
                            {showType && <td>{transaction.transactionType || 'expense'}</td>}
                            <td className="action-buttons">
                                <button 
                                    className="action-btn view-btn"
                                    onClick={() => onView?.(transaction)}
                                    title="View"
                                >
                                    👁️
                                </button>
                                <button 
                                    className="action-btn edit-btn"
                                    onClick={() => onEdit?.(transaction)}
                                    title="Edit"
                                >
                                    ✏️
                                </button>
                                {showDelete && (
                                    <button 
                                        className="action-btn delete-btn"
                                        onClick={() => onDelete?.(transaction._id)}
                                        title="Delete"
                                    >
                                        🗑️
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showPagination && totalPages > 1 && (
                <div className="pagination">
                    <button
                        onClick={() => onPageChange?.(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="pagination-btn"
                    >
                        Previous
                    </button>
                    <span className="page-info">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => onPageChange?.(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="pagination-btn"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};