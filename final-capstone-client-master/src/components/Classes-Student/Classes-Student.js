import React, { Component } from 'react';
import { connect } from 'react-redux';

import ClassDetailStudent from './ClassDetail-Student';
import SearchClass from './SearchClass';
import { toggleView } from '../../actions/views';

import './Classes-Student.css';

export class ClassesStudent extends Component {
  componentDidMount() {
    this.props.dispatch(toggleView('student'));
  }

  render() {
    let enrolledClasses;
    // Condition: if student-user has class enrolled
    enrolledClasses = (
    <div className='enrolled-classes-container'>
      <h3>Enrolled Classes</h3>
      <ClassDetailStudent/>
    </div>
    )

    return(
      <div className='classes-student-container'>
        {enrolledClasses}
        <SearchClass />
      </div>
    )
  }
}

export default connect()(ClassesStudent);