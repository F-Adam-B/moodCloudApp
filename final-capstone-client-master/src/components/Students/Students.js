import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ClipLoader } from 'react-spinners';

import StudentListByClass from './StudentListByClass';
import StudentDetail from './StudentDetail';
import { toggleView } from '../../actions/views';
import { fetchStudents } from '../../actions/students';

import './Students.css';

export class Students extends Component {
  componentDidMount() {
    this.props.dispatch(toggleView('teacher'));
    this.props.dispatch(fetchStudents(this.props.userId));
  }

  render() {

    if(this.props.loading && this.props.studentList.length === 0){
      return(
        <div className='loading'>
          <ClipLoader
          color={'#0D8FA7'}
          loading={this.props.loading} 
        />
      </div>
      )
    }

    let listByClass;
    // Condition: if student-user has no class enrolled
    if(this.props.studentList.length === 0){
      listByClass = (
        <div className='no-student-container'> 

          <div id="clouds">
            <div className="cloud x1"></div>
            <div className="cloud x2"></div>
            <div className="cloud x3"></div>
            <div className="cloud x4"></div>
            <div className="cloud x5"></div>
          </div>

          <div className='no-student-list-container'>
            <p className='no-student'>You do not have any student enrolled in your classes.</p>
            <p className='instruction-to-search'>Tell them to search for your class by your last name.</p>
          </div>
        </div>
      )
    }
    
    // Condition: if teacher-user has students linked
    else if(this.props.studentList.length > 0){
      listByClass = (
        <div className='student-list-container'>
          <StudentListByClass />
          <StudentDetail />
        </div>
      )
    }
  
    return(
      <div className='students-container'>
        {listByClass}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.auth.currentUser ? state.auth.currentUser.id : 0,
  loading: state.yourStudents.loading,
  studentList: state.yourStudents.students,
})

export default connect(mapStateToProps)(Students);