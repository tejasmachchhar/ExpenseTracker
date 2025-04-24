import React from 'react';
import { format } from 'date-fns';
import './TransactionModal.css';

export const TransactionModal = ({
    isOpen,
    onClose,
    transaction,
    isEditing,
    editForm,
    onEditChange,
    onUpdate,
    expenseCategories,
    incomeCategories
}) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>×</button>
                <h2>{isEditing ? 'Edit Transaction' : 'View Transaction'}</h2>
                
                <div className="modal-scroll-container">
                    {isEditing ? (
                        <form onSubmit={onUpdate} className="form-container">
                            <div className="form-group">
                                <label>Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={editForm.notes}
                                    onChange={(e) => onEditChange({...editForm, notes: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <select
                                    className="form-control"
                                    value={editForm.category}
                                    onChange={(e) => onEditChange({...editForm, category: e.target.value})}
                                    required
                                >
                                    <option value="">Select a category</option>
                                    <optgroup label="Expense Categories">
                                        {expenseCategories?.map((category) => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </optgroup>
                                    <optgroup label="Income Categories">
                                        {incomeCategories?.map((category) => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </optgroup>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Amount</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={editForm.amountSpent}
                                    onChange={(e) => onEditChange({...editForm, amountSpent: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Date & Time</label>
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    value={editForm.dateTime}
                                    onChange={(e) => onEditChange({...editForm, dateTime: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Paid To / Received From</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={editForm.paidTo}
                                    onChange={(e) => onEditChange({...editForm, paidTo: e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label>Transaction Type</label>
                                <select
                                    className="form-control"
                                    value={editForm.transactionType}
                                    onChange={(e) => onEditChange({...editForm, transactionType: e.target.value})}
                                    required
                                >
                                    <option value="expense">Expense</option>
                                    <option value="income">Income</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary">Update Transaction</button>
                        </form>
                    ) : (
                        <div className="transaction-details">
                            <div className="detail-row">
                                <span className="label">Date & Time:</span>
                                <span className="value">{format(new Date(transaction.dateTime), 'MMM dd, yyyy HH:mm')}</span>
                            </div>
                            <div className="detail-row">
                                <span className="label">Description:</span>
                                <span className="value">{transaction.notes}</span>
                            </div>
                            <div className="detail-row">
                                <span className="label">Category:</span>
                                <span className="value">
                                    <span className={`category-badge ${
                                        transaction.category 
                                            ? `badge-${transaction.category.toLowerCase().replace(/\s+/g, '')}` 
                                            : ''
                                    }`}>
                                        {transaction.category || 'Uncategorized'}
                                    </span>
                                </span>
                            </div>
                            <div className="detail-row">
                                <span className="label">Amount:</span>
                                <span className="value">₹{transaction.amountSpent}</span>
                            </div>
                            <div className="detail-row">
                                <span className="label">{transaction.transactionType === 'income' ? 'Received From:' : 'Paid To:'}</span>
                                <span className="value">{transaction.paidTo || 'Not specified'}</span>
                            </div>
                            <div className="detail-row">
                                <span className="label">Type:</span>
                                <span className="value">{transaction.transactionType || 'expense'}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};