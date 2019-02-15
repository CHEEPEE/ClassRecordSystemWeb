class Login extends React.Component {
  state = {};
  login() {
    login();
  }
  render() {
    return (
      <React.Fragment>
        <div className="row h-75 d-flex align-items-center justify-content-center">
          <div className="col-12 align-center" style = {{display:"flex",justifyContent:"center"}}>
            <div className="w-25">
              <div className="row pl-5 pr-5 pb-2">
                <div className="col p-2">
                  <img className="w-100" src="assets/images/ualogo.jpg" />
                </div>
                <div className="col p-2">
                  <img className="w-100" src="assets/images/ccslogo.png" />
                </div>
              </div>

              <div className="row mb-2">
                <div className="col text-center">
                  <h2>University Of Antique</h2>
                  <h5>College Of Computer Studies</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="w-25 bg-white p-5 shadow">
            <div className="row">
              <h3>Login User</h3>
            </div>
            <div className="row">
              <div class="form-group w-100">
                <label for="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
              </div>
            </div>
            <div className="row">
              <div class="form-group w-100">
                <label for="exampleInputEmail1">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  aria-describedby="emailHelp"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="row">
              <button
                type="button"
                onClick={this.login.bind(this)}
                class="btn btn-dark w-100"
              >
                Login
              </button>
            </div>
            <div className="row mt-3">
              <small>
                Forgot Password?{" "}
                <a className="text-info" href="#">
                  Reset Password
                </a>
              </small>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
