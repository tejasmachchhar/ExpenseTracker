import React from 'react'

export const Login = () => {
  return (
    <div>
      <div className="card card-primary card-outline mb-4" style={{display: 'flex', justifyContent: 'center'}}>
        {/*begin::Header*/}
        <div className="card-header">
          <div className="card-title">Quick Example</div>
        </div>
        {/*end::Header*/}
        {/*begin::Form*/}
        <form>
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
              />
            </div>
            <div className="input-group mb-3">
              <input type="file" className="form-control" id="inputGroupFile02" />
              <label className="input-group-text" htmlFor="inputGroupFile02">
                Upload
              </label>
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Check me out
              </label>
            </div>
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
