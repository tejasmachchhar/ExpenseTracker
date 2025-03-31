import React from 'react'

export const AddExpenseAI = () => {
    return (
        <div>
            <div className="expense-form-container add-expense-container">
                <h2>Add New Expense</h2>
                <form className='add-expense-items'>
                    <div className="form-group">
                        <label htmlFor="expense-title">Expense Title</label>
                        <input
                            type="text"
                            id="expense-title"
                            className="form-control"
                            placeholder="Enter expense title"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="expense-amount">Amount ($)</label>
                        <input
                            type="number"
                            id="expense-amount"
                            className="form-control"
                            placeholder="Enter amount"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="expense-date">Date</label>
                        <input type="date" id="expense-date" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="expense-category">Category</label>
                        <select id="expense-category" className="form-control">
                            <option value="">Select category</option>
                            <option value="travel">Travel</option>
                            <option value="food">Food &amp; Dining</option>
                            <option value="office">Office Supplies</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="expense-notes">Notes</label>
                        <textarea
                            id="expense-notes"
                            className="form-control"
                            rows={3}
                            placeholder="Add notes about this expense"
                            defaultValue={""}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="expense-receipt">Attach Receipt</label>
                        <input type="file" id="expense-receipt" className="form-control" />
                    </div>
                    <button type="submit" className="btn">
                        Submit Expense
                    </button>
                </form>
            </div>
            <div className='main-content'>
                <div className="card card-primary card-outline mb-4">
                    {/*begin::Header*/}
                    <div className="card-header">
                        <div className="card-title">New Transaction</div>
                    </div>
                    {/*end::Header*/}
                    {/*begin::Form*/}
                    <form>
                        {/*begin::Body*/}
                        <div className="card-body">
                            <FormControl>
                                <FormLabel id="demo-radio-buttons-group-label">Transaction Type</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="expense"
                                    name="radio-buttons-group"
                                    onChange={(e) => setTransactionType(e.target.value)}
                                >
                                    <FormControlLabel value="expense" control={<Radio />} label="Expense" />
                                    <FormControlLabel value="income" control={<Radio />} label="Income" />
                                </RadioGroup>
                            </FormControl>
                            {/* begin::Transaction Category */}
                            {/* <div id='transactionType' className='form-group'
                            style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="transactionType"
                                    id="expense"
                                    defaultValue="expense"
                                    defaultChecked="true"
                                    onClick={(e) => {
                                        setTransactionType(e.target.id)
                                        // console.log(e.target.id)
                                    }}
                                />
                                <label className="form-check-label" htmlFor="expense">
                                    {" "}
                                    Expense{" "}
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="transactionType"
                                    id="income"
                                    defaultValue="income"
                                    onClick={(e) => {
                                        setTransactionType(e.target.id)
                                        // console.log(e.target.id)
                                    }}
                                />
                                <label className="form-check-label" htmlFor="income">
                                    {" "}
                                    Income{" "}
                                </label>
                            </div>
                        </div> */}
                            {/* end::Transaction Category */}

                            {/* begin::Transaction Data */}

                            <div className="form-group">
                                <label htmlFor="datetimepicker1"
                                    className='form-label'>
                                    Date & Time
                                </label>
                                <div>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <MobileDateTimePicker
                                            label="Date & Time"
                                            defaultValue={dayjs()}
                                            views={['day', 'month', 'year', 'hours', 'minutes', 'seconds']}
                                        />
                                    </LocalizationProvider>
                                </div>
                                {/* <div className='input-group datetimepicker'
                                id='datetimepicker1'
                                data-td-target-input='nearest'
                                data-td-target-toggle='nearest'>
                                <input type="text"
                                    className='form-control'
                                    id='datetimepicker1Input'
                                    data-td-toggle='#datetimepicker1'
                                    required />
                                <span className='input-group-text'
                                    data-td-target='#datetimepicker1'
                                    data-td-taggle='datetimepicker'>
                                    <span className='fas fa-calendar'></span>
                                </span>
                            </div> */}
                            </div>

                            <div className='form-group'>
                                <label htmlFor="party" className='form-label'>
                                    {...transactionType === 'expense' ? 'Send to' : 'Received from'}
                                </label>
                                <input type="text" id='party' className='form-control' required />
                            </div>

                            <div className='form-group'>
                                <label htmlFor="type" className='form-label'>
                                    Payment Type
                                </label>
                                <select className='form-select' id='type'>
                                    <option value='1'>Select Type</option>
                                    <option value='2'>Cash</option>
                                    <option value='3'>UPI</option>
                                    <option value='4'>Netbanking</option>
                                    <option value='5'>Cheque</option>
                                </select>
                                <FormControlLabel
                                    control={<Switch
                                        checked={checked}
                                        onChange={(e) => setChecked(e.target.checked)} />}
                                    label={checked ? "Transaction (un-tick if Transfer)" : "Transfer (tick if Transaction)"}
                                />
                                {/* <div className="mb-3 form-switch">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="transactionCheck"
                                    defaultChecked="true"
                                />
                                <label className="form-check-label" htmlFor="transactionCheck">
                                    Transaction (un-tick if Transfer)
                                </label>
                            </div> */}
                            </div>
                            <div>
                                <label htmlFor="category" className='form-label'>
                                    Category
                                </label>
                                <select className='form-select' id='category'>
                                    <option value='1'>Select Category</option>
                                    <option value='2'>Grocery</option>
                                    <option value='3'>Shopping</option>
                                    <option value='4'>Food & Drinks</option>
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
                            </div>

                            <div className="input-group mb-3"
                                style={{ marginTop: '1rem' }}>
                                <label htmlFor="amount" className='input-group-text'>Amount</label>
                                <span className="input-group-text">₹</span>
                                <input
                                    id='amount'
                                    type="text"
                                    className="form-control"
                                    aria-label="Amount (to the nearest rupee)"
                                    required
                                />
                                <span className="input-group-text">.00</span>
                            </div>
                            {/* begin::Notes */}
                            <div className="form-group">
                                <label htmlFor="validationCustom01" className="form-label">
                                    Notes
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="validationCustom01"
                                />
                                <div className="valid-feedback">Looks good!</div>
                            </div>
                            {/* end::Notes */}
                            {/* begin::Upload */}

                            <div className='form-group'>
                                <label htmlFor="inputGroupFile02">
                                    Attach reciept or bill</label>
                                <div className="input-group mb-3">
                                    <input type="file" className="form-control" id="inputGroupFile02" />
                                    <label className="input-group-text" htmlFor="inputGroupFile02">
                                        Upload
                                    </label>
                                </div>
                            </div>
                            {/* end::Upload */}
                        </div>
                        {/*end::Body*/}
                        {/*begin::Footer*/}
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                        {/*end::Footer*/}
                    </form>
                    {/*end::Form*/}
                </div>

            </div>

        </div>
    )
}
