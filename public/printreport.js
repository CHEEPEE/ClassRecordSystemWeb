class PrintReportContainer extends React.Component {
  state = { class: {}, teacherProfile: {} };
  getParam = () => {
    var urlParams = new URLSearchParams(window.location.search);
    //console.log(urlParams.get('eventid'));

    var classId = urlParams.get("classId");
    if (classId != null) {
      this.getStudents(classId);
      // console.log(event_id);a
      db.collection("class")
        .doc(classId)
        .get()
        .then(doc => {
          this.setState({ class: { ...doc.data() } });
          console.log(this.state.class);
          this.getInstructor(doc.data().userId);
        });
    } else {
      console.log("The Nun");
    }
  };
  getInstructor = instructorId => {
    db.collection("teacherProfile")
      .doc(instructorId)
      .get()
      .then(doc => {
        console.log(doc.data());

        this.setState({ teacherProfile: { ...doc.data() } });
      });
  };

  getStudents = classId => {
    db.collection("studentClasses")
      .where("classCode", "==", classId)
      .get()
      .then(docs => {
        let object = [];
        docs.forEach(doc => {
          console.log(doc.data());
        });

        docs.forEach(doc => object.push(doc.data()));
        let studentListItem = object.map(doc => (
          <StudentItemListReport {...doc} />
        ));
        ReactDOM.render(
          <React.Fragment>{studentListItem}</React.Fragment>,
          document.querySelector("#studentListContainer")
        );
      });
  };
  print = () => {
    window.print();
  };
  componentDidMount() {
    this.getParam();
  }
  render() {
    const {
      state: {
        class: { name, description, sched, schoolYear, semester },
        teacherProfile: { teacherName }
      }
    } = this;
    return (
      <div
        className="row bg-white"
        style={{
          marginTop: 50,
          alignSelf: "center",
          marginLeft: "12%",
          marginRight: "12%"
        }}
      >
        <div className="col">
          <div className="row">
            <div className="col">
              <center>
                <h1>{"Office Of Registrar".toUpperCase()}</h1>
                <h5 className="text-primary">registrar@antiquespride.edu.ph</h5>
                <h5>GRADESHEET</h5>
              </center>
            </div>
          </div>
          <div className="row">
            <div className="col-2">Subject :</div>
            <div className="col">{name}</div>
          </div>
          <div className="row">
            <div className="col-2">Title :</div>
            <div className="col">{description}</div>
          </div>
          <div className="row">
            <div className="col-2">Units :</div>
            <div className="col">{0}</div>
          </div>
          <div className="row">
            <div className="col-2">Instructor :</div>
            <div className="col">{teacherName}</div>
          </div>
          <div className="row">
            <div className="col-2 s">School Year :</div>
            <div className="col">{name}</div>
          </div>
          <div className="row mt-5" />
          <div className="row">
            <div className="col">ID Number</div>
            <div className="col">Name Of Student</div>
            <div className="col">Final Grade</div>
            <div className="col">Completetion</div>
            <div className="col">Credit</div>
          </div>
          <div id="studentListContainer" className="mt-5">
            {/* student list Container */}
          </div>

          <div className="row" style={{ marginTop: 200 }}>
            <div className="col">
              <center>
                <div class="form-group w-75">
                  <input
                    type="email"
                    class="form-control border-0"
                    style={{ textTransform: "uppercase", textAlign: "center" }}
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                  />
                  <hr />
                  <small id="emailHelp" class="form-text text-muted">
                    DEAN
                  </small>
                </div>
              </center>
            </div>
            <div className="col">
              <center>
                <div class="form-group border-0 w-75">
                  <input
                    type="email"
                    class="form-control border-0"
                    style={{ textTransform: "uppercase", textAlign: "center" }}
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                  />
                  <hr />
                  <small id="emailHelp" class="form-text text-muted">
                    REGISTRAR
                  </small>
                </div>
              </center>
            </div>
          </div>
          <div className="row" style={{ marginTop: 100 }}>
            <div className="col">
              Note: Instructor should sign below the last entry
            </div>
          </div>
          <div className="row">
            <div className="col" />
          </div>
          <button
            onClick={() => {
              this.print();
            }}
            type="button"
            class="btn btn-primary d-print-none"
            style={{ marginTop: 50 }}
          >
            Print
          </button>
        </div>
      </div>
    );
  }
}

class StudentItemListReport extends React.Component {
  state = { finalGrade: 0 };
  getStudentFinalGrade = (classCode, userId) => {
    console.log(classCode, userId);
    db.collection("termGrade")
      .where("classCode", "==", classCode)
      .where("usereId", "==", userId)
      .get()
      .then(docs => {
        let grade = 0;
        let docLength = 0;
        docs.forEach(doc => {
          grade += doc.data().grade;
          docLength++;
        });
        let finalGrade = docLength == 2 ? grade / 2 : "No Grade Yet";
        this.setState({ finalGrade: finalGrade });
      });
  };
  componentDidMount() {
    let { studentId, fName, lName, classCode, studentUserId } = this.props;
    this.getStudentFinalGrade(classCode, studentUserId);
  }
  render() {
    let { studentId, fName, lName } = this.props;
    return (
      <div className="row">
        <div className="col">{studentId}</div>
        <div className="col">{fName + " " + lName}</div>
        <div className="col">{this.state.finalGrade}</div>
        <div className="col">Completetion</div>
        <div className="col">Credit</div>
      </div>
    );
  }
}

ReactDOM.render(<PrintReportContainer />, document.querySelector("#app"));
