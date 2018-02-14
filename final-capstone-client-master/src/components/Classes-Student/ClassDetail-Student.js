import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


import { fetchClassesByStudent } from '../../actions/classes';
import { deleteClassByStudent } from '../../actions/classes';

import './ClassDetail-Student.css';

export class ClassDetailStudent extends Component {
  componentDidMount(){
    this.props.dispatch(fetchClassesByStudent(this.props.userId))
  }
  
  handleRemoveClass = classID => {
    const data = {classID, studentID: this.props.userId };
    this.props.dispatch(deleteClassByStudent(data));
  }

  render() {

    
    if(this.props.enrolledClasses.length === 0){
      
      if(this.props.loading){
        return(
          <div className='loading'>
            <ClipLoader
              color={'#0D8FA7'}
              loading={this.props.loading} 
            />
          </div>
        )
      }  
      return(
        <div>
          <p className='not-enrolled-caption'><em>You're not enrolled in any classes.</em></p>
        </div>
      )
    }

    let classList;

    classList = this.props.enrolledClasses.map((item, index) => {
      let classPeriod;
      if(item.classPeriod.length > 0){
        classPeriod = <p className='course-period-2'><span className='label'>period </span> {item.classPeriod}</p>
      }

      return (
        <li key={index} className='enrolled-course'>
          <p className='course-name-container'><span className='class-name label'>Class </span>{item.className}</p>
          {classPeriod}
          <p className='class-teacher'><span className='instructor label'>Teacher </span>{item.teacher.firstName} {item.teacher.lastName}</p>
          <button className="delete-enrolled-button" onClick={()=>this.handleRemoveClass(item._id)}>Remove</button>
        </li>
      )
    }
  );

    return(
      <div className='class-detail-student-container'>
        <ul>
        <ReactCSSTransitionGroup
          transitionName="collapse"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {classList}
        </ReactCSSTransitionGroup>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.classes.loading,
  userId: state.auth.currentUser ? state.auth.currentUser.id : 0,
  enrolledClasses: state.classes.enrolledClasses,
})

export default connect(mapStateToProps)(ClassDetailStudent);