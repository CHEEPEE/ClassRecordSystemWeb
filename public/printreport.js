class PrintReportContainer extends React.Component {
  render() {
    return (
      <div className="row bg-white" style={{ margin: 50 }}>
        <div className="col">
          <div className="row">
            <div className="col">
              <center>
                <h1>{"Office Of Registrar".toUpperCase()}</h1>
                <h5 className = "text-primary">registrar@antiquespride.edu.ph</h5>
                <h5>GRADESHEET</h5>
              </center>
            </div>
          </div>
          <div className = "row">
            <div className = "col">
                Subject :
            </div>
          </div>
          <div className = "row">
            <div className = "col">
                Title :
            </div>
          </div>
          <div className = "row">
            <div className = "col">
                Units :
            </div>
          </div>
          <div className = "row">
            <div className = "col">
                Instructor :
            </div>
          </div>
          <div className = "row">
            <div className = "col">
                School Year :
            </div>
          </div>
          <div className = "row mt-5">
          
          </div>
          <div className = "row">
            <div className = "col">
                ID Number
            </div>
            <div className = "col">
                Name Of Student
            </div>
            <div className = "col">
                Final Grade
            </div>
            <div className = "col">
                Completetion
            </div>
            <div className = "col">
                Credit
            </div>
          </div>
          <div className = "row">
            {/* student list Container */}
          </div>

          <div className = "row">
          <div className = "col">
          fist section
          </div>
          <div className = "col">
          second section
          </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<PrintReportContainer />, document.querySelector("#app"));
