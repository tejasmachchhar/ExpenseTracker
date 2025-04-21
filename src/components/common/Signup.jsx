import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

export const Signup = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const submitHandler = async (data) => {
    try {
      data.roleId = "67c138b76acafdcf94ed4b2b";
      const res = await axios.post('/user', data);
      console.log(res);
      navigate("/login");
      toast(res.data.message);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        // console.log(err.response)
        const errorMessage = err.response?.data?.message || err.message || "Something went wrong";
        const errorError = err.response?.data?.error || "Something went wrong";
        if(errorError.toLowerCase().includes("duplicate key error collection")) {
          if(errorError.toLowerCase().includes("username")) {
            toast.error("Username already exists");
            return;
          }else if(errorError.toLowerCase().includes("email")) {
            toast.error("Email already exists");
            return;
          }
        } 
        toast.error(errorMessage);
        return;
      } else {
        const errorMessage = err.response.data.message || err.message || "Something went wrong";
        toast.error(errorMessage);
      }
      console.log(err)
    }
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
                  placeholder="Guddu"
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
                  placeholder="Mishra"
                  required=""
                  {...register("lastName")}
                />
                <div className="valid-feedback">Looks good!</div>
              </div>
              {/*end::Col*/}

              <div className="col-md-6 mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="youremail@xyz.com"
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
                    placeholder="GudduMishra"
                    // required={true}
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
