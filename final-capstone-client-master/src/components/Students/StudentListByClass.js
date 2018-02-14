import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchStudentDetail, toggleInitialMoodSearch } from '../../actions/students';

import './StudentListByClass.css';

export class StudentListByClass extends Component {
  handleStudentDetail = (studentID) => {
    this.props.dispatch(fetchStudentDetail(studentID));
    this.props.dispatch(toggleInitialMoodSearch(true));
  }
  
  render() {
        
    let result, objectArray;
    result = this.props.studentList.map((course, index) => {
      let noStudent, classPeriod;
      if(course.students.length === 0 ){
        noStudent = <p><em>There are no enrolled student in this class.</em></p>
      }
      if(course.classPeriod.length > 0){
        classPeriod = <p className='course-period'><span className='label'>period </span> {course.classPeriod}</p>
      }
      objectArray = course.students;
      objectArray.sort(function(a, b) {
        let textA = a.lastName;
        let textB = b.lastName;
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    })

      return (
      <li className='class-name-2' key={index}>
        <div className='course-name-period'>
          <p className='course-name'><span className='label'>class </span> {course.className}</p>
          {classPeriod}
        </div>
        {noStudent}
        <ul className='students-ul'>
          {objectArray.map((student, index2) =>
            <li key={index2} className='student-name-2' onClick={()=>this.handleStudentDetail(student._id)}>
              <p className='pupil-name'>{student.lastName}, {student.firstName}</p>
            </li>
            )}
        </ul>
      </li>)
    })
      
          

  
    return(
      <div className='student-list-by-class-container'>
        <h3>Your Enrolled Students</h3>
        <ul className='student-list-ul'>
          {result}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.auth.currentUser ? state.auth.currentUser.id : 0,
  studentList: state.yourStudents.students,
});

export default connect(mapStateToProps)(StudentListByClass);