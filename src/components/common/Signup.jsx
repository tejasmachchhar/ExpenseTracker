import React from 'react'
import { Link } from 'react-router-dom'

export const Signup = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div className="card card-info card-outline mb-4"
        style={{
          height: "100vh",
          width: "75%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {/*begin::Header*/}
        <div className="card-header">
          <div className="card-title">Form Validation</div>
        </div>
        {/*end::Header*/}
        {/*begin::Form*/}
        <form className="needs-validation" noValidate="">
          {/*begin::Body*/}
          <div className="card-body">
            {/*begin::Row*/}
            <div className="row g-3">
              {/*begin::Col*/}
              <div className="col-md-6">
                <label htmlFor="validationCustom01" className="form-label">
                  First name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="validationCustom01"
                  defaultValue="Mark"
                  required=""
                />
                <div className="valid-feedback">Looks good!</div>
              </div>
              {/*end::Col*/}
              {/*begin::Col*/}
              <div className="col-md-6">
                <label htmlFor="validationCustom02" className="form-label">
                  Last name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="validationCustom02"
                  defaultValue="Otto"
                  required=""
                />
                <div className="valid-feedback">Looks good!</div>
              </div>
              {/*end::Col*/}
              {/*begin::Col*/}
              <div className="col-md-6">
                <label htmlFor="validationCustomUsername" className="form-label">
                  Username
                </label>
                <div className="input-group has-validation">
                  <span className="input-group-text" id="inputGroupPrepend">
                    @
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustomUsername"
                    aria-describedby="inputGroupPrepend"
                    required=""
                  />
                  <div className="invalid-feedback">Please choose a username.</div>
                </div>
              </div>
              {/*end::Col*/}
              {/*begin::Col*/}
              <div className="col-md-6">
                <label htmlFor="validationCustom03" className="form-label">
                  City
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="validationCustom03"
                  required=""
                />
                <div className="invalid-feedback">Please provide a valid city.</div>
              </div>
              {/*end::Col*/}
              {/*begin::Col*/}
              <div className="col-md-6">
                <label htmlFor="validationCustom04" className="form-label">
                  State
                </label>
                <select className="form-select" id="validationCustom04" required="">
                  <option selected="" disabled="" value="">
                    Choose...
                  </option>
                  <option>...</option>
                </select>
                <div className="invalid-feedback">Please select a valid state.</div>
              </div>
              {/*end::Col*/}
              {/*begin::Col*/}
              <div className="col-md-6">
                <label htmlFor="validationCustom05" className="form-label">
                  Zip
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="validationCustom05"
                  required=""
                />
                <div className="invalid-feedback">Please provide a valid zip.</div>
              </div>
              {/*end::Col*/}
              {/*begin::Col*/}
              <div className="col-12">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultValue=""
                    id="invalidCheck"
                    required=""
                  />
                  <label className="form-check-label" htmlFor="invalidCheck">
                    Agree to terms and conditions
                  </label>
                  <div className="invalid-feedback">
                    You must agree before submitting.
                  </div>
                </div>
              </div>
              {/*end::Col*/}
            </div>
            {/*end::Row*/}
          </div>
          {/*end::Body*/}
          {/*begin::Footer*/}
          <div className="card-footer">
            <button className="btn btn-info" type="submit">
              Submit form
            </button>
            <Link to="/login" data-discover="true">
              <button className="btn btn-primary" style={{ float: "right" }}>
                Login
              </button>
            </Link>

          </div>
          {/*end::Footer*/}
        </form>
        {/*end::Form*/}
        {/*begin::JavaScript*/}
        {/*end::JavaScript*/}
      </div>

    </div>
  )
}
