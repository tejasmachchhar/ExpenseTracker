import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction } from '../../store/slices/transactionSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/css/components.css';
import '../../assets/css/AddTransaction.css';
import { ToastContainer } from 'react-toastify';


export const AddTransaction = () => {
    const dispatch = useDispatch();
    const { expenseCategories, incomeCategories } = useSelector((state) => state.categories);
    const { userData } = useSelector((state) => state.transactions);
    const [formData, setFormData] = useState({
        tranType: 'expense',
        amountSpent: '',
        dateTime: new Date().toISOString().slice(0, 16),
        paidTo: '',
        account: '1',
        category: '',
        notes: '',
        attachmentUrl: null
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resultAction = await dispatch(addTransaction(formData));
            if (addTransaction.fulfilled.match(resultAction)) {
                toast.success('Transaction added successfully');
                setFormData({
                    tranType: 'expense',
                    amountSpent: '',
                    dateTime: new Date().toISOString().slice(0, 16),
                    paidTo: '',
                    account: '1',
                    category: '',
                    notes: '',
                    attachmentUrl: null
                });
            } else {
                throw new Error(resultAction.error.message);
            }
        } catch (error) {
            console.error('Error adding transaction:', error);
            toast.error(error.message || 'Error adding transaction');
        }
    };

    return (
        <div className="main-content">
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="page-container">
                <div className="dashboard-header">
                    <h1>Add New Transaction</h1>
                    <div className="user-profile">
                        <span>Welcome, {userData?.firstName}</span>
                        <div className="user-avatar">{`${userData?.firstName?.[0]}${userData?.lastName?.[0]}`}</div>
                    </div>
                </div>

                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Transaction Type</label>
                            <div className="radio-group">
                                <div className="radio-item">
                                    <input
                                        type="radio"
                                        id="expense"
                                        name="tranType"
                                        value="expense"
                                        checked={formData.tranType === 'expense'}
                                        onChange={(e) => setFormData({ ...formData, tranType: e.target.value })}
                                    />
                                    <label htmlFor="expense">Expense</label>
                                </div>
                                <div className="radio-item">
                                    <input
                                        type="radio"
                                        id="income"
                                        name="tranType"
                                        value="income"
                                        checked={formData.tranType === 'income'}
                                        onChange={(e) => setFormData({ ...formData, tranType: e.target.value })}
                                    />
                                    <label htmlFor="income">Income</label>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="amountSpent">{formData.tranType === 'expense' ? 'Amount spent' : 'Amount credited'} *</label>
                            <div className="input-with-icon">
                                <span className="currency-symbol">₹</span>
                                <input
                                    type="number"
                                    id="amountSpent"
                                    className="form-control"
                                    placeholder="0.00"
                                    value={formData.amountSpent}
                                    onChange={(e) => setFormData({ ...formData, amountSpent: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="dateTime">Date & Time *</label>
                            <input
                                type="datetime-local"
                                id="dateTime"
                                className="form-control"
                                value={formData.dateTime}
                                onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="paidTo">{formData.tranType === 'expense' ? 'Paid to' : 'Received from'} *</label>
                            <input
                                type="text"
                                id="paidTo"
                                className="form-control"
                                value={formData.paidTo}
                                onChange={(e) => setFormData({ ...formData, paidTo: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="account">Payment Method *</label>
                            <select
                                id="account"
                                className="form-control"
                                value={formData.account}
                                onChange={(e) => setFormData({ ...formData, account: e.target.value })}
                                required
                            >
                                <option value="1">Select Method</option>
                                <option value="Cash">Cash</option>
                                <option value="UPI">UPI</option>
                                <option value="Netbanking">Netbanking</option>
                                <option value="Cheque">Cheque</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Category *</label>
                            <select
                                className="form-control"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                required
                            >
                                <option value="">Select a category</option>
                                <optgroup label="Expense Categories">
                                    {expenseCategories.map((category) => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </optgroup>
                                <optgroup label="Income Categories">
                                    {incomeCategories.map((category) => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </optgroup>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="notes">Description *</label>
                            <textarea
                                id="notes"
                                className="form-control"
                                rows="4"
                                placeholder="Provide details about this transaction..."
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Upload Receipt</label>
                            <div className="file-upload">
                                <input
                                    type="file"
                                    className="form-control"
                                    accept=".jpg, .jpeg, .png, .pdf"
                                    onChange={(e) => setFormData({ ...formData, attachmentUrl: e.target.files[0] })}
                                />
                                <p>Drag & drop your receipt here, or click to browse</p>
                                <p><small>Supports JPG, PNG or PDF up to 10MB</small></p>
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="button" className="btn btn-outline" onClick={() => setFormData({
                                tranType: 'expense',
                                amountSpent: '',
                                dateTime: new Date().toISOString().slice(0, 16),
                                paidTo: '',
                                account: '1',
                                category: '',
                                notes: '',
                                attachmentUrl: null
                            })}>
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Submit Transaction
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
