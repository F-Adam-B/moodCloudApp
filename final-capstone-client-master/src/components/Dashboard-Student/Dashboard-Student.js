import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom'
import { ClipLoader } from 'react-spinners';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { toggleView, toggleModal } from '../../actions/views';

import Modal from './Modal';
import MoodView from './MoodView';
import PanicButton from './PanicButton';
import { fetchClassesByStudent } from '../../actions/classes';

import './Dashboard-Student.css';

export class DashboardStudent extends Component {
  componentDidMount() {
    this.props.dispatch(toggleView('student'));
    this.props.dispatch(fetchClassesByStudent(this.props.userId));
  }

  handleToggle = () => {
    this.props.dispatch(toggleModal(!this.props.navigationModal));
  }

  render() {

    if(this.props.loading){
      return (
        <div className='loading'>
          <ClipLoader
            color={'#0D8FA7'}
            loading={this.props.loading} 
          />
        </div>
      )
    }

    let studentDash, navigationModal;
    // Condition: if student-user has no class enrolled
    if(this.props.hasEnrolledClasses.length === 0){
      studentDash = (
      <div className='no-class-student-container'>

        <div className="not-enrolled">
          <p>You're not enrolled in any classes.</p>
          <Link to='/student/classes' style={{ textDecoration: 'none' }}><p className='get-started'>Let's get you started.</p></Link>
        </div>
      </div>
      )
    }

    // Condition: if student-user has class(es) enrolled
    else if(this.props.hasEnrolledClasses){
      
      studentDash = (
      <div className='student-with-classes-dashboard'>
        <div className='enrolled'>
          <p>Hello there, {this.props.firstName}.</p>
          <p className='user-first-name'>How are you feeling right now?</p>
        
          <MoodView />
          <PanicButton />
    
          <button className="question-button" onClick={()=>{this.handleToggle()}}>
            <div id='cloud'><i className="fa fa-question-circle" aria-hidden="true"> </i> Navigation</div>
          </button>

        </div>
      </div>
      )
    }

    if(this.props.navigationModal){
      navigationModal = (
          <Modal />
      )
    }

    return(
      <div className='dashboard-student-container'>
        
        <div id="clouds">
          <div className="cloud x1"></div>
          <div className="cloud x2"></div>
          <div className="cloud x3"></div>
          <div className="cloud x4"></div>
          <div className="cloud x5"></div>
        </div>

        {studentDash}

        <ReactCSSTransitionGroup
          transitionName="collapse2"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {navigationModal}
        </ReactCSSTransitionGroup>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.auth.currentUser ? state.auth.currentUser.id : 0,
  firstName: state.auth.currentUser.firstName,
  hasEnrolledClasses: state.classes.enrolledClasses,
  navigationModal: state.view.modalToggle,
  loading: state.classes.loading,
  authLoading: state.auth.loading,
  alertID: state.alert.userPanic[0] ? state.alert.userPanic[0]._id : 0,
  alertActive: state.alert.panicToggled,
})

export default connect(mapStateToProps)(DashboardStudent);
