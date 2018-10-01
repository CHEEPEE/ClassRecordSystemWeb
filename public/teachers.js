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
          <div className="group-list w-100">
            <div className="list-group-item border-0">
              <div className="row">
                <div className="col font-weight-bold">Teacher Name</div>
                <div className="col font-weight-bold">Account Status</div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="group-list w-100" id="teacherListContainer" />
        </div>
      </React.Fragment>
    );
  }
}

class TeacherItem extends React.Component {
  state = {};
  setStatus(){
    db.collection("teacherProfile")
    .doc(this.props.id)
    .update("accountStatus",this.props.accountStatus == "active"? "pending":"active");
  }
  render() {
    return (
      <div className="list-group-item mt-1 border-0 bg-light">
        <div className="row">
          <div className="col">{this.props.teacherName}</div>
          <div className="col"><button onClick ={this.setStatus.bind(this)} type="button" className={"btn text-white btn-"+(this.props.accountStatus=="active"?"success":"warning")}>{this.props.accountStatus}</button></div>
        </div>
      </div>
    );
  }
}
