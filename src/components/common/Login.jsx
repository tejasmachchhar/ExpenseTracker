import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

export const Login = () => {
  const {register, handleSubmit} = useForm();
  const submitHandler = async (data) => {
    const res = await axios.post('/user/login', data);
    toast(res.data.message);
    console.log(res);
  }

  return (
    <div>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div>
          <section
            className="Toastify"
            aria-live="polite"
            aria-atomic="false"
            aria-relevant="additions text"
            aria-label="Notifications Alt+T"
          />
        </div>
        <ToastContainer></ToastContainer>
        <div className="card card-primary card-outline mb-4">
          <div className="card-header">
            <div className="card-title">Login</div>
          </div>
          <form onSubmit={handleSubmit(submitHandler)}>
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
                  name="email"
                  required={true}
                  {...register('email')}
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
                  name="password"
                  required={true}
                  {...register('password')}
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
            <div className="card-footer">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <Link to="/signup" data-discover="true">
                <button className="btn btn-primary" style={{ float: "right" }}>
                  SignUp
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
