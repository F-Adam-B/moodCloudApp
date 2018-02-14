import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom'
import { ClipLoader } from 'react-spinners';

import * as actions from '../../actions';
import AlertMain from './AlertMain';

import './Dashboard-Teacher.css';

export class DashboardTeacher extends Component {
  componentDidMount() {
    this.props.dispatch(actions.toggleView('teacher'));
    this.props.dispatch(actions.fetchClassesByTeacher(this.props.userId));
    this.props.dispatch(actions.fetchMoodAlertsByTeacher(this.props.userId));
    this.props.dispatch(actions.fetchPanicAlertsByTeacher(this.props.userId))
  }
  
  render() {
    if(this.props.loading){
      return (
      <div className='loading'>
         <ClipLoader
          color={'#0D8FA7'}
          loading={this.props.loading} 
        />
      </div>)
    }

    let teacherDash;
    // Condition: if teacher-user has no class created
    if(this.props.hasCreatedClasses.length === 0){

      teacherDash = (
      <div className='no-class-teacher-container'>

        <div id="clouds">
          <div className="cloud x1"></div>
          <div className="cloud x2"></div>
          <div className="cloud x3"></div>
          <div className="cloud x4"></div>
          <div className="cloud x5"></div>
        </div>

        <div className="not-created">
          <p>You do not have classes created yet.</p>
          <Link to='/teacher/classes' style={{ textDecoration: 'none' }}><p className='get-started'>Let's get you started.</p></Link>
        </div>
      </div>
      )
    }
    // Condition: if teacher-user has class(es) enrolled
    else if (this.props.hasCreatedClasses){
      teacherDash = <AlertMain />
    }

    return(
      <div className='dashboard-teacher-container'>
        {teacherDash}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.auth.currentUser.id,
  hasCreatedClasses: state.classes.createdClasses,
  loading: state.classes.loading,
 })

export default connect(mapStateToProps)(DashboardTeacher);
