import { Label } from '@mui/icons-material'
import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Switch, TextField, MenuItem, Stack, Paper } from '@mui/material'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import React, { useState, useMemo } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { addTransaction } from '../../store/slices/transactionSlice'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const AddTransaction = () => {
    const dispatch = useDispatch();
    const [checked, setChecked] = useState(true);
    const [transactionType, setTransactionType] = useState('expense');
    const [selectedCategory, setSelectedCategory] = useState("1");
    const { register, handleSubmit, control, setValue } = useForm();

    // Define categories with their styling information
    const categories = useMemo(() => [
        { value: "Grocery", label: "Grocery", pillClass: "pill-travel" },
        { value: "Food & Drinks", label: "Food & Drinks", pillClass: "pill-food" },
        { value: "Bills", label: "Bills", pillClass: "pill-office" },
        { value: "Shopping", label: "Shopping", pillClass: "pill-other" },
        { value: "Entertainment", label: "Entertainment", pillClass: "pill-travel" },
        { value: "Health", label: "Health", pillClass: "pill-office" },
        { value: "Travel", label: "Travel", pillClass: "pill-travel" },
        { value: "Others", label: "Others", pillClass: "pill-other" }
    ], []);

    // Function to handle category selection from pills
    const handleCategoryPillClick = (category) => {
        setSelectedCategory(category.value);
        setValue("category", category.value); // Update the form value
    };

    const submitHandler = async (data) => {
        try {
            const formData = new FormData();
            for (const key in data) {
                formData.append(key, data[key]);
            }

            const resultAction = await dispatch(addTransaction(formData));
            if (addTransaction.fulfilled.match(resultAction)) {
                toast.success('Transaction added successfully');
                document.getElementById('expense-form').reset();
            } else {
                throw new Error(resultAction.error.message);
            }
        } catch (error) {
            console.error('Error adding transaction:', error);
            toast.error(error.message || 'Error adding transaction');
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
                    <div className="user-profile">
                        <span>Welcome, Tejas</span>
                        <div className="user-avatar">TM</div>
                    </div>
                </div>
                
                <Paper className="form-container" elevation={0}>
                    <div className="form-header">
                        <h2>Transaction Details</h2>
                        <p>Complete the form below to add a new transaction record. All fields marked with an asterisk (*) are required.</p>
                    </div>
                    
                    <form id="expense-form" onSubmit={handleSubmit(submitHandler)}>
                        <Box sx={{ mb: 4 }}>
                            <FormControl fullWidth>
                                <FormLabel id="transaction-type-label" sx={{ mb: 2, color: '#475569', fontWeight: 500 }}>
                                    Transaction Type
                                </FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="transaction-type-label"
                                    value={transactionType}
                                    onChange={(e) => setTransactionType(e.target.value)}
                                    sx={{ justifyContent: 'space-around' }}
                                    {...register("tranType")}
                                >
                                    <FormControlLabel 
                                        value="expense" 
                                        control={<Radio />} 
                                        label="Expense"
                                        sx={{ 
                                            '& .MuiFormControlLabel-label': { 
                                                color: '#475569',
                                                fontWeight: transactionType === 'expense' ? 600 : 400
                                            }
                                        }}
                                    />
                                    <FormControlLabel 
                                        value="income" 
                                        control={<Radio />} 
                                        label="Income"
                                        sx={{ 
                                            '& .MuiFormControlLabel-label': { 
                                                color: '#475569',
                                                fontWeight: transactionType === 'income' ? 600 : 400
                                            }
                                        }}
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Box>

                        <div className="form-section">
                            <Stack spacing={3}>
                                <div className="form-group">
                                    <label htmlFor="expense-amount">{transactionType === 'expense' ? 'Amount spent' : 'Amount credited'} *</label>
                                    <div className="input-with-icon">
                                        <div className="input-icon">₹</div>
                                        <TextField
                                            type="number"
                                            id="expense-amount"
                                            placeholder="0.00"
                                            fullWidth
                                            InputProps={{
                                                inputProps: { min: 0 },
                                                sx: { paddingLeft: '2.5rem' }
                                            }}
                                            required
                                            {...register('amountSpent')}
                                        />
                                    </div>
                                </div>

                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                    <div className="form-group" style={{ flex: 1 }}>
                                        <label htmlFor="date-time">Date & Time</label>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DateTimePicker
                                                defaultValue={dayjs()}
                                                {...register("dateTime")}
                                                sx={{
                                                    width: '100%',
                                                    '& .MuiOutlinedInput-root': {
                                                        borderRadius: '0.5rem'
                                                    }
                                                }}
                                            />
                                        </LocalizationProvider>
                                    </div>

                                    <div className="form-group" style={{ flex: 1 }}>
                                        <label htmlFor="party">
                                            {transactionType === 'expense' ? 'Paid to' : 'Received from'} *
                                        </label>
                                        <TextField
                                            id="party"
                                            fullWidth
                                            required
                                            {...register("paidTo")}
                                        />
                                    </div>
                                </Stack>

                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                    <div className="form-group" style={{ flex: 1 }}>
                                        <label htmlFor="account">Account *</label>
                                        <TextField
                                            select
                                            id="account"
                                            fullWidth
                                            required
                                            defaultValue="1"
                                            {...register("account")}
                                        >
                                            <MenuItem value="1">Select Type</MenuItem>
                                            <MenuItem value="Cash">Cash</MenuItem>
                                            <MenuItem value="UPI">UPI</MenuItem>
                                            <MenuItem value="Netbanking">Netbanking</MenuItem>
                                            <MenuItem value="Cheque">Cheque</MenuItem>
                                        </TextField>
                                    </div>

                                    <div className="form-group" style={{ flex: 1 }}>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={checked}
                                                    onChange={(e) => setChecked(e.target.checked)}
                                                />
                                            }
                                            label={checked ? "Transaction (un-tick if Transfer)" : "Transfer (tick if Transaction)"}
                                        />
                                    </div>
                                </Stack>
                            </Stack>
                        </div>

                        <div className="form-section">
                            <div className="form-group">
                                <label htmlFor="category">Category *</label>
                                <Controller
                                    name="category"
                                    control={control}
                                    defaultValue="1"
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            select
                                            id="category"
                                            fullWidth
                                            required
                                            value={selectedCategory}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                setSelectedCategory(e.target.value);
                                            }}
                                        >
                                            <MenuItem value="1">Select Category</MenuItem>
                                            {categories.map((category) => (
                                                <MenuItem key={category.value} value={category.value}>
                                                    {category.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    )}
                                />
                                <div className="category-pills">
                                    {categories.map((category) => (
                                        <div
                                            key={category.value}
                                            className={`category-pill ${category.pillClass} ${
                                                selectedCategory === category.value ? 'active' : ''
                                            }`}
                                            onClick={() => handleCategoryPillClick(category)}
                                        >
                                            {category.label}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="form-section">
                            <Stack spacing={3}>
                                <div className="form-group">
                                    <label htmlFor="expense-description">Description *</label>
                                    <TextField
                                        id="expense-description"
                                        multiline
                                        rows={4}
                                        placeholder="Provide details about this expense..."
                                        fullWidth
                                        required
                                        {...register('notes')}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Upload Receipt</label>
                                    <label htmlFor="expense-receipt" className="file-upload">
                                        <i>📤</i>
                                        <p>Drag & drop your receipt here, or click to browse</p>
                                        <p><small>Supports JPG, PNG or PDF up to 10MB</small></p>
                                        <input
                                            type="file"
                                            id="expense-receipt"
                                            accept=".jpg, .jpeg, .png, .pdf"
                                            {...register('attachmentUrl')}
                                        />
                                    </label>
                                </div>
                            </Stack>
                        </div>

                        <div className="form-actions">
                            <button type="button" className="btn btn-outline">
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Submit Transaction
                            </button>
                        </div>
                    </form>
                </Paper>
            </div>
        </>
    )
}
