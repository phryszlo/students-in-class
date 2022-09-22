const React = require("react");
const DefaultLayout = require("./layouts/default");
class New extends React.Component {
  render() {
    const { student } = this.props;
    return (
      <DefaultLayout title={"Edit Student Page"}>
        <div>
          <h1>Edit {student.name}</h1>
          <form
            action={`/students/${student.id}?_method=PUT`}
            method="POST">
            Name: <input type="text" name="name" defaultValue={student.name} />
            <br />
            gpa: <input type="text" name="gpa" defaultValue={student.gpa} />
            <br />
            Eligible for Graduation
            {student.isPassing ? (
                <input type="checkbox" name="isPassing" defaultChecked />
              ) : (
                <input type="checkbox" name="isPassing" />
              )
            }
            <br />
            <input type="submit" name="" value="EDIT" />
          </form>
        </div>
      </DefaultLayout>
    );
  }
}

module.exports = New;