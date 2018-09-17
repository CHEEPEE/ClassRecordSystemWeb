let global_timeStamp = firebase.firestore.FieldValue.serverTimestamp();
class ManageDepartment extends React.Component {
  state = {};

  getDepartment() {
    db.collection("department").onSnapshot(function(querySnapshot) {
      console.log(querySnapshot);
      let departmentObj = [];
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        departmentObj.push(doc.data());
      });
      var listItem = departmentObj.map(object => (
        <DepartmentItem
          key={object.key}
          id={object.key}
          department={object.department}
        />
      ));
      ReactDOM.render(
        <React.Fragment>{listItem}</React.Fragment>,
        document.querySelector("#departmentItemsContainer")
      );
    });
  }
  saveDepartment() {
    let department = $("#inputDepartment").val();
    let pushKey = db.collection("department").doc().id;

    db.collection("department")
      .doc(pushKey)
      .set({
        department: department,
        key: pushKey,
        timeStamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(function() {
        $("#addDepartmentModal").modal("hide");
        $("#inputDepartment").val("");
      });
  }

  componentDidMount() {
    this.getDepartment();
  }

  render() {
    return (
      <React.Fragment>
        <div className="row mt-5 ml-3">
          <h1>Manage Department</h1>
        </div>
        <div className="row ml-3 mt-2">
          <div className="col">
            <div className="row">
              <button
                type="button"
                data-toggle="modal"
                data-target="#addDepartmentModal"
                className="btn btn-dark"
              >
                Add Department
              </button>
            </div>
          </div>
        </div>
        <div className="row ml-1 mt-3">
          <div className="col">
            <div className="list-group" id="departmentItemsContainer" />
          </div>
          <div className="col" id="manageDepartmentContainer" />
        </div>
        <div
          className="modal fade"
          id="addDepartmentModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalCenterTitle">
                  Modal title
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
                <div className="row p-3">
                  <h3>Add Department</h3>
                </div>
                <div className="row p-3">
                  <div class="form-group w-100">
                    <label for="exampleInputEmail1">Department</label>
                    <input
                      type="text"
                      class="form-control"
                      id="inputDepartment"
                      placeholder="Enter Department"
                    />
                  </div>
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
                <button
                  type="button"
                  onClick={this.saveDepartment.bind(this)}
                  className="btn btn-primary"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

class DepartmentItem extends React.Component {
  state = {};

  updateDepartment() {
    let sup = this;
    let updateDepartment = $("#updatDepartment" + this.props.id).val();
    db.collection("department")
      .doc(this.props.id)
      .update({
        department: updateDepartment
      })
      .then(function() {
        $("#updateDepartmentModal" + sup.props.id).modal("hide");
      });
  }
  manageDepartmentItem() {
    ReactDOM.render(
      <ManageDepartmentItem
        key={this.props.id}
        department={this.props.department}
        id={this.props.id}
      />,
      document.querySelector("#manageDepartmentContainer")
    );
  }
  render() {
    return (
      <React.Fragment>
        <div className="list-group-item border-0 p-3 shadow-sm mt-1 list-group-item-action">
          <div className="row">
            <div className="col">{this.props.department}</div>
            <div className="col d-flex flex-row-reverse ">
              <button type="button" class="btn btn-danger btn-sm">
                delete
              </button>
              <button
                type="button"
                data-toggle="modal"
                data-target={"#updateDepartmentModal" + this.props.id}
                class="btn mr-2 btn-primary btn-sm"
              >
                Update
              </button>
              <button
                type="button"
                onClick={this.manageDepartmentItem.bind(this)}
                class="btn mr-2 btn-success btn-sm"
              >
                Manage
              </button>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id={"updateDepartmentModal" + this.props.id}
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalCenterTitle">
                  Modal title
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
                <div className="row p-3">
                  <h3>Update Department</h3>
                </div>
                <div className="row p-3">
                  <div class="form-group w-100">
                    <label for="exampleInputEmail1">Department</label>
                    <input
                      type="text"
                      defaultValue={this.props.department}
                      class="form-control"
                      id={"updatDepartment" + this.props.id}
                      placeholder="Enter Department"
                    />
                  </div>
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
                <button
                  type="button"
                  onClick={this.updateDepartment.bind(this)}
                  className="btn btn-primary"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

class ManageDepartmentItem extends React.Component {
  state = {};
  render() {
    return (
      <div className="container-fluid p-2">
        <div className="row shadow p-2">
          <div className="col-12">
            <h5>{this.props.department}</h5>
          </div>
          <div className="col-12" id="programsContainer">
            <Programs key={this.props.id} id={this.props.id} />
          </div>
        </div>
      </div>
    );
  }
}

class Programs extends React.Component {
  state = {
    tgProgram: "d-none"
  };
  togleAddProgram() {
    this.setState({
      tgProgram: this.state.tgProgram == "d-none" ? " " : "d-none"
    });
  }
  saveProgram() {
    let program = $("#addProgram" + this.props.id).val();
    let key = db.collection("program").doc().id;
    let sup = this;
    db.collection("program")
      .doc(key)
      .set({
        department: sup.props.id,
        program: program,
        key: key,
        timeStamp: global_timeStamp
      })
      .then(function() {
        $("#addProgram" + sup.props.id).val("");
        sup.togleAddProgram();
      });
  }

  getPrograms() {
    let sup = this;
    db.collection("program")
      .where("department", "==", this.props.id)
      .onSnapshot(function(querySnapshot) {
        console.log(querySnapshot);
        let dataObject = [];
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          dataObject.push(doc.data());
        });
        var listItem = dataObject.map(object => (
          <ProgramsItem
            key={object.key}
            id={object.key}
            program={object.program}
            department={object.department}
          />
        ));
        ReactDOM.render(
          <React.Fragment>{listItem}</React.Fragment>,
          document.querySelector("#programsContainer" + sup.props.id)
        );
      });
  }
  componentDidMount() {
    this.getPrograms();
  }

  render() {
    return (
      <React.Fragment>
        <div className="row p-2">
          <button
            type="button"
            data-toggle="modal"
            data-target="#addProgram"
            className="btn btn-dark"
            onClick={this.togleAddProgram.bind(this)}
          >
            Add Program
          </button>
        </div>
        <div className={"row " + this.state.tgProgram}>
          <div className="col">
            <div className="form-group w-100">
              <input
                type="text"
                class="form-control w-100"
                id={"addProgram" + this.props.id}
                aria-describedby="emailHelp"
                placeholder="Enter Program Name"
              />
            </div>
          </div>
          <div className="col-auto">
            <button
              type="button"
              onClick={this.saveProgram.bind(this)}
              className="btn mr-2 btn-success"
            >
              Add
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={this.togleAddProgram.bind(this)}
            >
              Close
            </button>
          </div>
        </div>
        <div className="row">
          <div
            className="group-list pr-3 pt-2 pb-3 w-100"
            id={"programsContainer" + this.props.id}
          />
        </div>
      </React.Fragment>
    );
  }
}

class ProgramsItem extends React.Component {
  state = {};
  updateProgram(){
    var program = prompt("Update Program Name", this.props.program);

    if (program != null) {
       db.collection("program").doc(this.props.id).update({
           program:program
       }).then(function(){
           alert("Update Successfully");
       });
    }
  }
  deleteProgram(){
    if(confirm("Delete "+this.props.program)){
        db.collection("program").doc(this.props.id).delete();
    }
  }
  render() {
    return (
      <React.Fragment>
        <div className="list-group-item ml-2 mt-2 p-2 border-0 shadow-sm list-group-item-action">
          <div className="row">
            <div className="col">
            {this.props.program}
            </div>
            <div className="col-auto">
              <button
                type="button"
                onClick = {this.updateProgram.bind(this)}
                className="btn mr-2 btn-success"
              >
                Update
              </button>
              <button
                type="button"
                onClick = {this.deleteProgram.bind(this)}
                className="btn mr-2 btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}


