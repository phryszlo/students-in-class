const React = require('react');
const DefaultLayout = require('./layouts/Default');

class Index extends React.Component {
  render() {
    const { students } = this.props;
    console.log(`students: ${students}`)
    return (
      <DefaultLayout title={"StudentDashboard"}>
        <ul>
          {students.map((student, index) => {
            return (
              <li key={index}>
                <a href={`/students/${student.id}`}>{student.name}</a>
                has a GPA of {student.gpa} <br />

                {student.isPassing
                  ? " and is eligible to graduate."
                  : " is not elibile to graduate."
                }

                {/* EDIT */}
                <a href={`/students/${student.id}/edit`}>Edit {student.name}</a>

                {/* DELETE */}
                <form 
                action={`/students/${student.id}?_method=DELETE`} 
                className="delete-form" 
                method="POST">
                  <input type="submit" value="delete" />
                </form>
              </li>
            );
          })}
        </ul>
      </DefaultLayout>
    )
  }
}

module.exports = Index;