import React from 'react'

export const AddTransaction = () => {
    return (
        <div>
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
                        {/* begin::Transaction Category */}
                        <div id='transactionCategory' className='form-group'
                            style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="transactionCategory"
                                    id="expense"
                                    defaultValue="expense"
                                    defaultChecked="true"
                                />
                                <label className="form-check-label" htmlFor="gridRadios1">
                                    {" "}
                                    Expense{" "}
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="transactionCategory"
                                    id="income"
                                    defaultValue="income"
                                />
                                <label className="form-check-label" htmlFor="gridRadios2">
                                    {" "}
                                    Income{" "}
                                </label>
                            </div>
                            {/* <div className="form-check disabled">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="gridRadios"
                                    id="gridRadios3"
                                    defaultValue="option3"
                                    disabled=""
                                />
                                <label className="form-check-label" htmlFor="gridRadios3">
                                    Third disabled radio
                                </label>
                            </div> */}
                        </div>
                        {/* end::Transaction Category */}

                        {/* begin::Transaction Data */}

                        <div className="form-group">
                            <label htmlFor="datetimepicker1"
                                className='form-label'>
                                Date & Time
                            </label>
                            <div className='input-group datetimepicker'
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
                            </div>
                        </div>

                        <div className='form-group'>
                            <label htmlFor="party" className='form-label'>
                                Party Name
                            </label>
                            <input type="text" id='party' className='form-control' required />
                        </div>

                        <div className='form-group'>
                            <label htmlFor="type" className='form-label'>
                                Type
                            </label>
                            <select className='form-select' id='type'>
                                <option value='1'>Select Type</option>
                                <option value='2'>Cash</option>
                                <option value='3'>UPI</option>
                                <option value='4'>Netbanking</option>
                                <option value='5'>Cheque</option>
                            </select>
                            <div className="mb-3 form-switch">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="transactionCheck"
                                    defaultChecked="true"
                                />
                                <label className="form-check-label" htmlFor="transactionCheck">
                                    Transaction (un-tick if Transfer)
                                </label>
                            </div>
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
    )
}
