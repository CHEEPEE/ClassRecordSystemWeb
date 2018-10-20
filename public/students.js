class ManageStudents extends React.Component {
    state = {};
    getTeacherList() {
      db.collection("studentProfile").onSnapshot(function(querySnapshot) {
        console.log(querySnapshot);
        let studentObject = [];
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          studentObject.push(doc.data());
        });
        var listItem = studentObject.map(object => (
          <StudentItem
            key={object.userId}
            id={object.userId}
            fName={object.fName}
            mName={object.mName}
            lName={object.lName}
            accountStatus={object.accoutStatus}
            departmentKey = {object.departmentKey}
            programKey = {object.programKey}
            yearLevelKey = {object.yearLevelKey}
            sectionKey = {object.sectionKey}
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
            <h1>Manage Students</h1>
          </div>
          <div className="row">
            <div className="group-list w-100">
              <div className="list-group-item border-0">
                <div className="row">
                  <div className="col font-weight-bold">Student Name</div>
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
  class StudentItem extends React.Component {
    state = {department:"",program:"",yearLevel:"",section:""};
    
    setStatus(){
      db.collection("studentProfile")
      .doc(this.props.id)
      .update("accoutStatus",this.props.accountStatus == "active"? "pending":"active");
    }

    getStudentDetails(){
      let sup = this;
      db.collection("department").doc(this.props.departmentKey).onSnapshot(function(doc) {
        console.log("Current data: ", doc.data());
        sup.setState({
          department:doc.data().department
        })

      });
        
      db.collection("program").doc(this.props.programKey).onSnapshot(function(doc){
        sup.setState({
          program:doc.data().program
        })
      });
      db.collection("yearlevel").doc(this.props.yearLevelKey).onSnapshot(function(doc){
        sup.setState({
          yearLevel:doc.data().yearLevel
        })
      });
      db.collection("section").doc(this.props.sectionKey).onSnapshot(function(doc){
        sup.setState({
          section:doc.data().section
        })
      });
    }
    componentDidMount(){
      this.getStudentDetails();
    }
    render() {
      return (
        <div className="list-group-item mt-1 border-0 bg-light">
          <div className="row">
            <div className="col">
            <div className  ="row">
              <h5>{this.props.fName} {this.props.mName} {this.props.lName}</h5>
            </div>
            <div className = "row">
              {this.state.department}> {this.state.program}> {this.state.yearLevel}> {this.props.sectionKey}
            </div>
            </div>
            <div className="col"><button onClick ={this.setStatus.bind(this)} type="button" className={"btn text-white btn-"+(this.props.accountStatus=="active"?"success":"warning")}>{this.props.accountStatus}</button></div>
          </div>
        </div>
      );
    }
  }
  