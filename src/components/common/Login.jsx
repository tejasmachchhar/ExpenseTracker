import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


export const Login = () => {
  const { register, handleSubmit } = useForm();
  // let submitHandler
  // try {
  const submitHandler = async (data) => {
    try {
      const res = await axios.post("/user/login", data);
      localStorage.setItem("id", res.data.data._id);
      localStorage.setItem("role", res.data.data.roleId.role);
      toast(res.data.message);
      console.log(res);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data?.message || err.message || "Something went wrong";
        toast.error(errorMessage);
        return;
      } else {
        const errorMessage = err.response.data.message || err.message || "Something went wrong";
        toast.error(errorMessage);
      }
    }
  }

  return (
    <div style={{
      height: "100vh", width: "100vw",
      display: "flex", justifyContent: "center",
      alignItems: "center"
    }}>
      <div><ToastContainer /></div>
      <div className="card card-primary card-outline mb-4">
        {/*begin::Header*/}
        <div className="card-header">
          <div className="card-title">Login</div>
        </div>
        {/*end::Header*/}
        {/*begin::Form*/}
        <form onSubmit={handleSubmit(submitHandler)}>
          {/*begin::Body*/}
          <div className="card-body">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                {...register("email")}
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                {...register("password")}
              />
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Remember Me
              </label>
            </div>
          </div>
          {/*end::Body*/}
          {/*begin::Footer*/}
          <div className="card-footer">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            <Link to="/signup">
              <button className="btn btn-primary" style={{ float: "right" }}>
                SignUp
              </button>
            </Link>
          </div>
          {/*end::Footer*/}
        </form>
        {/*end::Form*/}
      </div>
    </div>
  )
}
