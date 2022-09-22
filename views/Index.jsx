const React = require('react');
const DefaultLayout = require('./layouts/Default');

class Index extends React.Component {
  render() {
    const { students } = this.props;
    console.log(`students: ${students}`)
    return (
      <DefaultLayout title={"StudentDashboard"}>
        <nav>
          <a href={'/students/new'}>Add New Student</a>
        </nav>
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


// const React = require("react");
// const DefaultLayout = require("./layouts/Default");

// class Index extends React.Component {
//   render() {
//     const { students } = this.props;
//     console.log(students);
//     return (
//       <DefaultLayout title={"StudentDashboard"}>
//         <ul>
//           {students.map((student, i) => {
//             return (
//               <li key={i}>
//                 {/* eachStudent */}
//                 <a href={`/students/${student.id}`}> {student.name} </a> has a
//                 GPA of {student.gpa} <br />
//                 {student.isPassing
//                   ? "And is Eligible to Graduate"
//                   : "And is NOT Eligible to Graduate"}
//                 {/* Student Name is ___ and is/isnt eligible 2 graduate */}
//                 {/* ===========EDIT */}
//                 <a href={`students/${student._id}/edit`}> Edit Student</a>
//                 {/* ======Delete */}
//                 <form
//                   action={`/students/${student._id}?_method=DELETE`}
//                   method="POST"
//                 >
//                   <input type="submit" value="DELETE" />
//                 </form>
//               </li>
//             );
//           })}
//         </ul>
//       </DefaultLayout>
//     );
//   }
// }
// module.exports = Index