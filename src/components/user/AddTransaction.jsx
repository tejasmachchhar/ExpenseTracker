import { Label } from '@mui/icons-material'
import { FormControl, FormControlLabel, FormLabel, Input, Radio, RadioGroup, Switch } from '@mui/material'
import { fontGrid } from '@mui/material/styles/cssUtils'
import { DateTimePicker, LocalizationProvider, MobileDateTimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import React, { useState } from 'react'

export const AddTransaction = () => {
    const [checked, setChecked] = useState(true);
    const [transactionType, setTransactionType] = useState('expense');

    const [category, setCategory] = useState("");


    return (
        <>
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
                    <form id="expense-form" style={{ width: '-webkit-fill-available' }}>
                        <FormControl style={{ textAlign: 'center', width: '-webkit-fill-available' }}>
                            <FormLabel id="demo-radio-buttons-group-label">Transaction Type</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="expense"
                                name="radio-buttons-group"
                                onChange={(e) => setTransactionType(e.target.value)}
                                style={{ display: 'flex', justifyContent: 'space-around' }}
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
                                    <label htmlFor="expense-amount">{...transactionType === 'expense' ? 'Amount spent' : 'Amount credited'} *</label>
                                    <div className="input-with-icon">
                                        <div className="input-icon">₹</div>
                                        <input type="number" id="expense-amount" className="form-control"
                                            placeholder={0.00} step="50" min={0} required />
                                    </div>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="party" className='form-label'>Date & Time
                                    </label>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <MobileDateTimePicker
                                            // label="Date & Time"
                                            defaultValue={dayjs()}
                                            views={['day', 'month', 'year', 'hours', 'minutes', 'seconds']}
                                        />
                                    </LocalizationProvider>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="party" className='form-label'>
                                        {...transactionType === 'expense' ? 'Paid to' : 'Received from'} *
                                    </label>
                                    <input type="text" id='party' className='form-control' required />
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
                                    <select className='form-control' id='type' required>
                                        <option value='1'>Select Type</option>
                                        <option value='2'>Cash</option>
                                        <option value='3'>UPI</option>
                                        <option value='4'>Netbanking</option>
                                        <option value='5'>Cheque</option>
                                    </select>
                                </div>
                                <div className='form-group'>
                                    <FormControlLabel
                                        control={<Switch
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
                                <select id="category" className="form-control" required>
                                    <option value='1'>Select Category</option>
                                    <option value='2'>Grocery</option>
                                    <option value='3'>Shopping</option>
                                    <option value='4'>Food &amp; Drinks</option>
                                    <option value='5'>Fuel</option>
                                    <option value='6'>Bills</option>
                                    <option value='7'>EMI</option>
                                    <option value='8'>Entertainment</option>
                                    <option value='9'>Health</option>
                                    <option value='10'>Rent</option>
                                    <option value='11'>Investment</option>
                                    <option value='12'>Transfer</option>
                                    <option value='13'>Travel</option>
                                    <option value='14'>Salary</option>
                                    <option value='15'>Others</option>
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
                            <div className="form-group"><label htmlFor="expense-description">Description *</label><textarea id="expense-description" className="form-control" rows={4} placeholder="Provide details about this expense..." required defaultValue={""} />
                            </div>
                            <div className="form-group"><label>Upload Receipt</label><label htmlFor="expense-receipt" className="file-upload"><i>📤</i>
                                <p>Drag &amp; drop your receipt here,
                                    or click to browse</p>
                                <p><small>Supports JPG,
                                    PNG or PDF up to 10MB</small></p><input type="file" id="expense-receipt" accept=".jpg, .jpeg, .png, .pdf" />
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
