import React, { Component } from 'react';
import { connect } from 'react-redux';

import AddClass from './AddClass';
import ClassDetailTeacher from './ClassDetail-Teacher';
import  {toggleView } from '../../actions/views';

import './Classes-Teacher.css';

export class ClassesTeacher extends Component {
  componentDidMount() {
    this.props.dispatch(toggleView('teacher'));
  }

  render() {
    let createdClasses;
    // Condition: if teacher-user has class created
    // Mapping happens here
    createdClasses = (
    <div className='created-classes-container'>
      <h3>Current Term</h3>
      <ClassDetailTeacher/>
    </div>
    )

    return(
      <div className='classes-teacher-container'>
        {createdClasses}
        <AddClass />
      </div>
    )
  }
}

export default connect()(ClassesTeacher);