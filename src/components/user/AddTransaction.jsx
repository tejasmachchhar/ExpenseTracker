import { Label } from '@mui/icons-material'
import { FormControl, FormControlLabel, FormLabel, Input, Radio, RadioGroup, Switch } from '@mui/material'
import { fontGrid } from '@mui/material/styles/cssUtils'
import { DateTimePicker, LocalizationProvider, MobileDateTimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import axios from 'axios'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const AddTransaction = () => {
    const [checked, setChecked] = useState(true);
    const [transactionType, setTransactionType] = useState('expense');

    const [category, setCategory] = useState("");
    const { register, handleSubmit } = useForm();
    const submitHandler = async (data) => {
        try {
            const token = localStorage.getItem('token');

            // Create a FormData object
            const formData = new FormData();

            // Append all form fields to FormData
            formData.append('tranType', transactionType);
            formData.append('isTransfer', checked);
            formData.append('amountSpent', data.amountSpent);
            formData.append('dateTime', data.dateTime);
            formData.append('paidTo', data.paidTo);
            formData.append('account', data.account);
            formData.append('category', data.category);
            formData.append('notes', data.notes);

            // Append the file (if any)
            if (data.attachmentUrl && data.attachmentUrl[0]) {
                formData.append('attachmentUrl', data.attachmentUrl[0]);
            }

            // Send the FormData to the backend
            const res = await axios.post('/expense', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('Transaction added successfully!');
            console.log('Transaction added:', res.data);

            // Clear form data
            setTransactionType('expense');
            setChecked(true);
            setCategory('');
            document.getElementById('expense-form').reset();
        } catch (error) {
            console.error('Error adding transaction:', error);
        }
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="main-content">
                <div className="page-header">
                    <h1>Add New Transaction</h1>
                    <div className="user-profile"><span>Welcome,
                        Tejas</span>
                        <div className="user-avatar">TM</div>
                    </div>
                </div>
                <div className="form-container">
                    <div className="form-header">
                        <h2>Transaction Details</h2>
                        <p>Complete the form below to add a new transaction record. All fields marked with an asterisk (*) are
                            required.</p>
                    </div>
                    <form id="expense-form" style={{ width: '-webkit-fill-available' }}
                        onSubmit={handleSubmit(submitHandler)}>
                        <FormControl style={{ textAlign: 'center', width: '-webkit-fill-available' }}>
                            <FormLabel id="demo-radio-buttons-group-label">Transaction Type</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-radio-buttons-group-label"
                                value={transactionType}
                                name="radio-buttons-group"
                                onChange={(e) => {
                                    const selectedValue = e.target.value;
                                    setTransactionType(selectedValue);
                                    console.log("Selected Transaction Type:", selectedValue);
                                }}
                                style={{ display: 'flex', justifyContent: 'space-around' }}
                                {...register("tranType", {
                                    onChange: (e) => {
                                        setTransactionType(e.target.value);
                                    },
                                })}
                            >
                                <FormControlLabel value="expense" control={<Radio />} label="Expense" />
                                <FormControlLabel value="income" control={<Radio />} label="Income" />
                            </RadioGroup>
                        </FormControl>
                        <div className="form-section">
                            <h3 className="form-section-title"></h3>
                            <div className="form-row"
                                style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}
                            >
                                <div className="form-group">
                                    <label htmlFor="expense-amount">{transactionType === 'expense' ? 'Amount spent' : 'Amount credited'} *</label>
                                    <div className="input-with-icon">
                                        <div className="input-icon">₹</div>
                                        <input type="number" id="expense-amount" className="form-control"
                                            placeholder={0.00} min={0} required
                                            {...register('amountSpent')} />
                                    </div>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="party" className='form-label'>Date & Time
                                    </label>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <MobileDateTimePicker
                                            onChange={(newValue) => {
                                                console.log(newValue);
                                            }}
                                            {...register("dateTime")}
                                            // label="Date & Time"
                                            defaultValue={dayjs()}
                                            views={['day', 'month', 'year', 'hours', 'minutes', 'seconds']}

                                        />
                                    </LocalizationProvider>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="party" className='form-label'>
                                        {transactionType === 'expense' ? 'Paid to' : 'Received from'} *
                                    </label>
                                    <input type="text" id='party' className='form-control' required
                                        {...register("paidTo")}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-section">
                            <h3 className="form-section-title"></h3>
                            <div className="form-row">
                                <div className='form-group'>
                                    <label htmlFor="type" className='form-label'>
                                        Account *
                                    </label>
                                    <select
                                        {...register("account")}
                                        className='form-control' id='type' required>
                                        <option value='1'>Select Type</option>
                                        <option value='Cash'>Cash</option>
                                        <option value='UPI'>UPI</option>
                                        <option value='Netbanking'>Netbanking</option>
                                        <option value='Cheque'>Cheque</option>
                                    </select>
                                </div>
                                <div className='form-group'>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                // {...register("isTransfer")}
                                                checked={checked}
                                                onChange={(e) => setChecked(e.target.checked)} />}
                                        label={checked ? "Transaction (un-tick if Transfer)" : "Transfer (tick if Transaction)"}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-section">
                            <h3 className="form-section-title"></h3>
                            <div className="form-group">
                                <label htmlFor="category">Expense Category *</label>
                                <select id="category" className="form-control" required
                                    {...register("category")}>
                                    <option value='1'>Select Category</option>
                                    <option value='Grocery'>Grocery</option>
                                    <option value='Shopping'>Shopping</option>
                                    <option value='Food & Drinks'>Food &amp; Drinks</option>
                                    <option value='Fuel'>Fuel</option>
                                    <option value='Bills'>Bills</option>
                                    <option value='EMI'>EMI</option>
                                    <option value='Entertainment'>Entertainment</option>
                                    <option value='Health'>Health</option>
                                    <option value='Rent'>Rent</option>
                                    <option value='Investment'>Investment</option>
                                    <option value='Transfer'>Transfer</option>
                                    <option value='Travel'>Travel</option>
                                    <option value='Salary'>Salary</option>
                                    <option value='Others'>Others</option>
                                </select>
                                <div className="category-pills">
                                    <div className="category-pill pill-travel">Grocery</div>
                                    <div className="category-pill pill-food active">Food &amp; Dining</div>
                                    <div className="category-pill pill-office">Bills</div>
                                    <div className="category-pill pill-other">Other</div>
                                </div>
                            </div>
                        </div>

                        <div className="form-section">
                            <h3 className="form-section-title"></h3>
                            <div className="form-group">
                                <label htmlFor="expense-description">Description *</label>
                                <textarea id="expense-description" className="form-control" rows={4} placeholder="Provide details about this expense..." required defaultValue={""}
                                    {...register('notes')} />
                            </div>
                            <div className="form-group"><label>Upload Receipt</label><label htmlFor="expense-receipt" className="file-upload"><i>📤</i>
                                <p>Drag &amp; drop your receipt here,
                                    or click to browse</p>
                                <p><small>Supports JPG,
                                    PNG or PDF up to 10MB</small></p>
                                <input type="file" id="expense-receipt" accept=".jpg, .jpeg, .png, .pdf" {...register('attachmentUrl')} />
                            </label></div>
                        </div>
                        <div className="form-actions">
                            <div className="action-group">
                                <button type="button" className="btn btn-outline">Cancel</button>
                            </div>
                            <div className="action-group">
                                <button type="button" className="btn btn-outline">Save as
                                    Draft</button>
                                <button type="submit" className="btn btn-primary">Submit Expense</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
