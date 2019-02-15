class Dashbaord extends React.Component {
    state = {
      user: firebase.auth().currentUser
    };
  
    renderTeachers() {
      const mainContainer = document.querySelector("#mainContainer");
      ReactDOM.render(
          <ManageTeachers/>,mainContainer
      )
    }
    renderStudents(){
      const mainContainer = document.querySelector("#mainContainer");
      ReactDOM.render(
          <ManageStudents/>,mainContainer
      )
    }
  
    renderDashBoard() {
      
    }
    renderDepartment(){
      const mainContainer = document.querySelector("#mainContainer");
      ReactDOM.render(
          <ManageDepartment/>,mainContainer
      )
    }
    componentDidMount() {
      this.renderDepartment();
    }
    
    logout() {
      logout();
    }
    render() {
      return (
        <React.Fragment>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow fixed-top">
            <a className="navbar-brand" href="#">
            Mobile grading system
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
  
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto" />
              <form className="form-inline my-2 my-lg-0">
                <div className="dropdown">
                  <a
                    className="btn btn-none text-white pr-3 dropdown-toggle"
                    href="#"
                    role="button"
                    id="userEmail"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {firebase.auth().currentUser.email}
                  </a>
  
                  <div
                    className="dropdown-menu dropdown-menu-right"
                    aria-labelledby="dropdownMenuLink"
                  >
                    <a
                      className="dropdown-item"
                      onClick={this.logout.bind(this)}
                      href="#"
                    >
                      Log out
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </nav>
          <div className="row w-100 bg-white h-100">
            <div className = "col-2">
            </div>
            <div className="col-2 position-fixed h-100 pt-5">
              <div
                className="list-group bg-dark pt-5 h-100"
                id="list-tab"
                role="tablist"
              >
                <h3 className="p-2 text-white">CONTROL PANEL</h3>
                {/* <a
                  className="list-group-item border-0 text-muted bg-transparent rounded-0 list-group-item-action"
                  data-toggle="list"
                  role="tab"
                >
                  Dashboard
                </a> */}
                <a
                  className="list-group-item bg-transparent text-muted border-0 rounded-0 list-group-item-action active"
                  data-toggle="list"
                  role="tab"
                  onClick = {this.renderDepartment.bind(this)}
                 
                >
                  MANAGE COLLEGE
                </a>
                <a
                  className="list-group-item bg-transparent text-muted border-0 rounded-0 list-group-item-action"
                  data-toggle="list"
                  role="tab"
                  onClick = {this.renderTeachers.bind(this)}
                >
                  MANAGE FACULTY
                </a>
                {/* <a
                  className="list-group-item bg-transparent text-muted border-0 rounded-0 list-group-item-action"
                  data-toggle="list"
                  role="tab"
                  onClick ={this.renderStudents.bind(this)}
                >
                  Student Management
                </a> */}
                {/* <a
                  className="list-group-item bg-transparent text-muted border-0 rounded-0 list-group-item-action"
                  data-toggle="list"
                  role="tab"
                 
                >
                Management
                </a> */}
              </div>
            </div>
         
            <div className="col-10 pt-5" id="mainContainer">
             
            </div>
          </div>
        </React.Fragment>
      );
    }
  }


