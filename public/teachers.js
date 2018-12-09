class ManageTeachers extends React.Component {
  state = {};
  getTeacherList() {
    db.collection("teacherProfile").onSnapshot(function(querySnapshot) {
      console.log(querySnapshot);
      let teacherObject = [];
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        teacherObject.push(doc.data());
      });
      var listItem = teacherObject.map(object => (
        <TeacherItem
          key={object.userId}
          id={object.userId}
          teacherName={object.teacherName}
          teacherId={object.teacherId}
          accountStatus={object.accountStatus}
        />
      ));
      ReactDOM.render(
        <React.Fragment>{listItem}</React.Fragment>,
        document.querySelector("#teacherListContainer")
      );
    });
  }
  componentDidMount() {
    this.getTeacherList();
  }
  render() {
    return (
      <React.Fragment>
        <div className="row mt-5">
          <h1>Manage Teachers</h1>
        </div>
        <div className="row">
          <button
            type="button"
            className="btn btn-dark"
            data-toggle="modal"
            data-target="#addInstructorModal"
          >
            Register Instructor
          </button>
        </div>
        <div className="row">
          <div className="group-list w-100">
            <div className="list-group-item border-0">
              <div className="row">
                <div className="col-1" />
                <div className="col-1 font-weight-bold">ID</div>
                <div className="col font-weight-bold">Instructor Name</div>
                <div className="col font-weight-bold">Email</div>
                <div className="col font-weight-bold">Password</div>
                <div className="col-1 font-weight-bold">
                  <div className="d-flex">Status</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="group-list p-2 w-100" id="teacherListContainer" />
        </div>
        {/* add Instructor modal herer */}
        <Modal
          id={"addInstructorModal"}
          content={
            <InputInstructorModalContent
              id="addInstructorModal"
              context={this}
            />
          }
          modalTitle={"Add Instructor"}
        />
      </React.Fragment>
    );
  }
}

function alertHandler(alert,alertType) {
  return (
    <div class={`alert alert-${alertType?"primary":"danger"}`} role="alert">
      {alert}
    </div>
  );
}

class Modal extends React.Component {
  state = {
    data: { email: "test", instructorId: "11", instructorName: "name" }
  };
  render() {
    return (
      <div
        className="modal fade"
        id={this.props.id}
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {this.props.modalTitle}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            {/* modal Content */}
            {this.props.content}
          </div>
        </div>
      </div>
    );
  }
}

class InputInstructorModalContent extends React.Component {
  state = {
    email: "",
    userSchoolId: "",
    userName: "",
    userType: "teacher",
    alert: ""
  };

  isUserIdAvailable = (callback = () => {}) => {
    let sup = this;
    let instructorIdInput = document.querySelector("#instructorIdInput").value

    db.collection("users")
      .where("userSchoolId", "==", instructorIdInput)
      .onSnapshot
      (querySnapshot => {
        querySnapshot.forEach(data=>{
          console.log(data)
            sup.setState({
              alert: "ID Taken"
            });
        })
      })
  };
  saveInStructor = () => {
    let sup = this;
    let timeStamp = db.collection("tempCreateUsers").doc().id;
    db.collection("tempCreateUsers")
      .doc(sup.state.email)
      .set({ ...this.state, password: timeStamp })
      .then(() => {
        $("#" + this.props.id).modal("hide");
      });
  };

  render() {
    return (
      <React.Fragment>
        <div className="modal-body">
          <div className="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={text => {
                this.setState({
                  email: text.target.value
                });
              }}
              defaultValue={this.state.email}
            />
          </div>
          <div className="form-group">
            <label for="exampleInputEmail1">Instructor ID</label>
            <input
              type="text"
              className="form-control"
              id="instructorIdInput"
              aria-describedby="emailHelp"
              placeholder="Enter Instructor ID"
              onChange={text => {
                this.setState({
                  userSchoolId: text.target.value
                });
                this.isUserIdAvailable();
              }}
              defaultValue={this.state.teacherId}
            />
          </div>
          <div className="form-group">
            <label for="exampleInputEmail1">Instructor Name</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Instructor Name"
              onChange={text => {
                this.setState({
                  userName: text.target.value
                });
              }}
              defaultValue={this.state.teacherName}
            />
          </div>
        </div>
        {this.state.alert.trim() == "" ? "" : alertHandler(this.state.alert,false)}
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => this.isUserIdAvailable(this.saveInStructor)}
            className="btn btn-primary"
          >
            Save changes
          </button>
        </div>
      </React.Fragment>
    );
  }
}

class TeacherItem extends React.Component {
  state = {
    extendView: "d-none",
    profile: "",
    passwordPlaceholder: "********************",
    showPassword: false
  };
  setStatus() {
    db.collection("teacherProfile")
      .doc(this.props.id)
      .update(
        "accountStatus",
        this.props.accountStatus == "active" ? "pending" : "active"
      );
  }
  getPassword = () => {
    let sup = this;
    db.collection("tempCreateUsers")
      .doc(sup.state.profile.email)
      .onSnapshot(snapshot => {
        sup.setState({
          password: snapshot.data().password
        });
      });
  };
  setToActive() {
    db.collection("teacherProfile")
      .doc(this.props.id)
      .update("accountStatus", "active");
  }
  setToPending() {
    db.collection("teacherProfile")
      .doc(this.props.id)
      .update("accountStatus", "pending");
  }
  setToBlock() {
    db.collection("teacherProfile")
      .doc(this.props.id)
      .update("accountStatus", "block");
  }

  getTeacherUserDetails() {
    let sup = this;
    db.collection("users")
      .doc(this.props.id)
      .onSnapshot(function(doc) {
        sup.setState({
          profile: doc.data()
        });
        sup.getPassword();
      });
  }
  togleExtend() {
    this.setState({
      extendView: this.state.extendView == "d-none" ? "visible" : "d-none"
    });
  }
  getSubjectList() {
    let sup = this;
    db.collection("class")
      .where("userId", "==", this.props.id)
      .onSnapshot(function(querySnapshot) {
        let object = [];
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          object.push(doc.data());
          // console.log(doc.data());
        });
        var listItem = object.map(object => (
          <TeacherSubjectItem
            key={object.classKey}
            classKey={object.classKey}
            name={object.name}
            description={object.description}
            sched={object.sched}
          />
        ));
        ReactDOM.render(
          <React.Fragment>{listItem}</React.Fragment>,
          document.querySelector("#teachersSubjectListContainer" + sup.props.id)
        );
      });
  }
  copyToClipboard = () => {
    let copyText = document.getElementById("tempPassword");

    /* Select the text field */
    copyText.select();

    /* Copy the text inside the text field */
    document.execCommand("copy");

    /* Alert the copied text */
    alert("Copied the Password: " + copyText.value);
  };
  componentDidMount() {
    this.getSubjectList();
    this.getTeacherUserDetails();
  }
  render() {
    return (
      <div className="list-group-item mt-1 border-0 bg-light">
        <div className="row d-flex align-items-center pl-2">
          <div className="col-1">
            <div className="row h-100 d-flex align-items-center">
              <div className="col d-flex align-items-center">
                <i
                  class="ml-2 material-icons text-muted"
                  onClick={this.togleExtend.bind(this)}
                >
                  arrow_drop_down_circle
                </i>
              </div>
            </div>
          </div>

          <div className="col-1">
            <div className="row">
              <small className="text-primary">{this.props.teacherId}</small>
            </div>
          </div>
          <div className="col">
            <div className="row font-weight-bold">{this.props.teacherName}</div>
          </div>
          <div className="col">
            <div className="row">{this.state.profile.email}</div>
          </div>
          <div className="col">
            <div className="row h-100 d-flex align-items-center">
              <div className="col h-100 d-flex align-items-center">
                <input
                  type={this.state.showPassword ? "text" : "password"}
                  defaultValue={this.state.password}
                  class="form-control form-control-sm border-0 font-weight-bold text-muted"
                  id="tempPassword"
                  placeholder="Enter email"
                />
                {/* <small className = "font-weight-bold">
                  {" "}
                  {!this.state.showPassword
                    ? this.state.passwordPlaceholder
                    : this.state.password}{" "}
                </small> */}
              </div>
              <div className="col-auto">
                <i
                  onClick={() => {
                    this.setState({ showPassword: !this.state.showPassword });
                  }}
                  class="material-icons small-icn text-muted"
                >
                  {this.state.showPassword ? "visibility" : "visibility_off"}
                </i>
                {this.state.showPassword ? (
                  <i
                    class="ml-2 small-icn material-icons text-muted"
                    onClick={() => {
                      this.setState({ showPassword: !this.state.showPassword });
                      this.copyToClipboard();
                    }}
                  >
                    file_copy
                  </i>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>

          <div className="col-1">
            <div className="d-flex flex-row-reverse pr-3">
              <div class="dropdown">
                <button
                  className={
                    "btn dropdown-toggle btn-sm  btn-" +
                    (this.props.accountStatus == "active"
                      ? "success"
                      : this.props.accountStatus == "pending"
                      ? "warning"
                      : "dark")
                  }
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {this.props.accountStatus}
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <a
                    className="dropdown-item"
                    onClick={this.setToActive.bind(this)}
                    href="#"
                  >
                    Active
                  </a>
                  <a
                    className="dropdown-item"
                    onClick={this.setToPending.bind(this)}
                    href="#"
                  >
                    Pending
                  </a>
                  <a
                    className="dropdown-item"
                    onClick={this.setToBlock.bind(this)}
                    href="#"
                  >
                    Block
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={"row " + this.state.extendView}>
          <div className="col-12">
            <div className="row">
              <div className="col">
                <h5>Teacher's subjects</h5>
              </div>
            </div>
            <div className="row">
              <div
                className="group-list w-100"
                id={"teachersSubjectListContainer" + this.props.id}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class TeacherSubjectItem extends React.Component {
  state = {};
  addToList() {
    let sup = this;
    let studentName = $("#addToListStudents" + this.props.classKey).val();
    let key = db.collection("subjectStudentList").doc().id;
    if (studentName != null) {
      db.collection("subjectStudentList")
        .doc(key)
        .set({
          classKey: sup.props.classKey,
          key: key,
          studentName: studentName
        })
        .then(function() {
          $("#addToListStudents" + sup.props.classKey).val("");
        });
    }
  }
  getstudentList() {
    let sup = this;
    db.collection("subjectStudentList")
      .where("classKey", "==", sup.props.classKey)
      .onSnapshot(function(querySnapshot) {
        let object = [];
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          object.push(doc.data());
          // console.log(doc.data());
        });
        var listItem = object.map(object => (
          <StudentListOnTeacherSubjectItem
            key={object.key}
            name={object.studentName}
            classKey={object.classKey}
          />
        ));
        ReactDOM.render(
          <React.Fragment>{listItem}</React.Fragment>,
          document.querySelector("#studentListForSubjects" + sup.props.classKey)
        );
      });
  }
  componentDidMount() {
    this.getstudentList();
  }
  render() {
    return (
      <div className="list-group-item mt-1 border-0 bg-light">
        <div className="row">
          <div className="col ml-3 text-info">{this.props.name}</div>
          <div className="col">
            <div
              data-toggle="modal"
              data-target={"#viewList" + this.props.classKey}
              className="btn btn-dark"
            >
              List
            </div>
          </div>
        </div>
        {/* registerTeacherModal */}
        <div
          className="modal fade"
          id={"viewList" + this.props.classKey}
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  {this.props.name} student List
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-9">
                    <div class="form-group">
                      <input
                        type="email"
                        class="form-control"
                        id={"addToListStudents" + this.props.classKey}
                        aria-describedby="emailHelp"
                        placeholder="Enter Student Name"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div
                      onClick={this.addToList.bind(this)}
                      className="btn btn-dark"
                    >
                      Add to List
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div
                    className="group-list w-100"
                    id={"studentListForSubjects" + this.props.classKey}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
class StudentListOnTeacherSubjectItem extends React.Component {
  state = {};
  render() {
    return (
      <div className="list-group-item mt-1 border-0 bg-light">
        <div className="row">
          <div className="col ml-3 text-info">
            <h5>{this.props.name}/</h5>
          </div>
          <div className="col-auto">
            <button type="button" class="btn btn-danger">
              Remove List
            </button>
          </div>
        </div>
        <div classKey="row" />
      </div>
    );
  }
}
