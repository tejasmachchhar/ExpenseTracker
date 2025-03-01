import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


export const Signup = () => {
  const { register, handleSubmit } = useForm();
  let submitHandler; 
  try {
    submitHandler = async function(data) {
      data.roleId = "67c138b76acafdcf94ed4b2b"
      const res = await axios.post('/user', data);
      toast(res.data.message);
      console.log(res);
    }
  } catch (err) {
    console.log(err)
  }

return (
  <div style={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
    <div><ToastContainer></ToastContainer></div>
    <div className="card card-info card-outline mb-4"
      style={{ maxWidth: "700px" }}>
      {/*begin::Header*/}
      <div className="card-header">
        <div className="card-title">Sign Up</div>
      </div>
      {/*end::Header*/}
      {/*begin::Form*/}
      <form className="needs-validation" noValidate="" onSubmit={handleSubmit(submitHandler)}>
        {/*begin::Body*/}
        <div className="card-body">
          {/*begin::Row*/}
          <div className="row g-3">
            {/*begin::Col*/}
            <div className="col-md-6">
              <label htmlFor="validationCustom01" className="form-label">
                First name*
              </label>
              <input
                type="text"
                className="form-control"
                id="validationCustom01"
                defaultValue="Mark"
                required={true}
                {...register("firstName")}
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
                {...register("lastName")}
              />
              <div className="valid-feedback">Looks good!</div>
            </div>
            {/*end::Col*/}

            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                required={true}
                {...register("email")}
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>

            {/*begin::Col*/}
            <div className="col-md-6">
              <label htmlFor="validationCustomUsername" className="form-label">
                Username*
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
                  required={true}
                  {...register("username")}
                />
                <div className="invalid-feedback">Please choose a username.</div>
              </div>
            </div>
            {/*end::Col*/}
            {/*begin::Col*/}
            <div className="col-md-6">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password*
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                required={true}
                {...register("password")}
              />
              <div className="invalid-feedback">Please provide a valid password.</div>
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
                  required={true}
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
            SignUp
          </button>
          <Link to="/login">
            <button className="btn btn-info" style={{ float: "right" }}>
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
