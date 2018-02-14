import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { enrollClass } from '../../actions/classes';

import './ClassesResult.css';

export class ClassesResult extends Component {
  handleEnrollClass = (classID) => {
    let studentID = this.props.student.id;
    const data = {classID, studentID}
    this.props.dispatch(enrollClass(data))
  }
  
  render() {
    if (this.props.loading) {
      return (
        <div className='loading'>
          <ClipLoader
            color={'#0D8FA7'}
            loading={this.props.loading} 
          />
        </div>
      )
    };

    let classList, resultHeader;

    classList = this.props.result.map((item, index) => {
      let classPeriod;
      if(item.classPeriod.length > 0){
        classPeriod = <p className='course-period-2'><span className='label'>period </span> {item.classPeriod}</p>
      }
      return (
        <li key={index} className='available-course'>
          <p className='class-name-container'><span className='class-name label'>Class </span>{item.className}</p>
          {classPeriod}
          <p className='class-teacher'><span className='instructor label'>Teacher </span> {item.teacher.firstName} {item.teacher.lastName}</p>
          <button className='add-class-button' onClick={()=>this.handleEnrollClass(item._id)}>ADD</button>
        </li>
      )
    }
    
  );

  if(this.props.result.length === 0 && this.props.initialSearch){
    resultHeader = (
      <p className='no-matching-result'><em>No Matching Result</em></p>
    )
  }
  else if(this.props.result.length > 0){
    resultHeader = (
      <h3>Search Result</h3>
    )
  }

    return(
      <div className='classes-result-container'>
        <ul className='classes-result-ul'>
        <ReactCSSTransitionGroup
          transitionName="collapse"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {resultHeader}
          {classList}
        </ReactCSSTransitionGroup>
        </ul>
      </div>
    )
  }
};

const mapStateToProps = state => ({
  loading: state.classes.loading,
  initialSearch: state.classes.initialSearch,
  result: state.classes.searchedClasses,
  student: state.auth.currentUser
});

export default connect(mapStateToProps)(ClassesResult);