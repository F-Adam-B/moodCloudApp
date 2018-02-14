import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {clearAuthToken} from '../local-storage';

import * as actions from '../actions';

import './Nav.css';

export class Nav extends Component {

  handleChangeView = (selectedView) => {
    this.props.dispatch(actions.toggleView(selectedView));
  }
  
  logOut() {
    if(this.props.alertID){
      let data = {alertID: this.props.alertID, active: false}
      this.props.dispatch(actions.toggleAlertOff(data));
    }
    this.props.dispatch(actions.clearAuth());
    this.props.dispatch(actions.clearClassesStore());
    this.props.dispatch(actions.updateMoodCaption(''));
    this.props.dispatch(actions.toggleModal(false));
    this.props.dispatch(actions.fetchPanicAlertsSuccess([]));
    this.props.dispatch(actions.fetchMoodAlertsSuccess([]));
    this.props.dispatch(actions.toggleAlertButton(false));
    this.props.dispatch(actions.setStudent(''));
    this.props.dispatch(actions.clearhistory());
    clearAuthToken();
  }

  render() {
    let landingPageTabs, featuresTabs1, featuresTabs2, studentTabs, teacherTabs, logoutTab;
    
    if(this.props.currentView === 'landing-page'){
      landingPageTabs = (
        <div className="nav-button right">
          <button className="nav-bttn features"><Link id='features' to="/features" className="nav-bttn">Features</Link></button>
          <button className="nav-bttn signup"><Link to="/signup" className="nav-bttn">Signup</Link></button>
          <button className="nav-bttn login"><Link to="/login" className="nav-bttn">Login</Link></button>
        </div>
      )
    }

    if(this.props.currentView === 'signup'){
      landingPageTabs = (
        <div className="nav-button right">
          <button className="nav-bttn features"><Link id='features' to="/features" className="nav-bttn">Features</Link></button>
          <button className="nav-bttn signup active-nav-button"><Link to="/signup" className="nav-bttn nav-bttn-selected">Signup</Link></button>
          <button className="nav-bttn login"><Link to="/login" className="nav-bttn">Login</Link></button>
        </div>
      )
    }

    if(this.props.currentView === 'login'){
      landingPageTabs = (
        <div className="nav-button right">
          <button className="nav-bttn features"><Link id='features' to="/features" className="nav-bttn">Features</Link></button>
          <button className="nav-bttn signup"><Link to="/signup" className="nav-bttn">Signup</Link></button>
          <button className="nav-bttn login active-nav-button"><Link to="/login" className="nav-bttn nav-bttn-selected">Login</Link></button>
        </div>
      )
    }
    
    if(this.props.currentView === 'features'){
      // featuresTabs1 = (
      //   <div className="nav-button features-tabs-1 center">
      //     <button className="nav-bttn features">Feature 1</button>
      //     <button className="nav-bttn features">Feature 2</button>
      //     <button className="nav-bttn features">Feature 3</button>
      //   </div>
      // )
      
      featuresTabs2 = (
        <div className="nav-button features-tabs-1 right">
          <button className="nav-bttn features active-nav-button"><Link id='features' to="/features" className="nav-bttn nav-bttn-selected">Features</Link></button>
          <button className="nav-bttn signup"><Link to="/signup" className="nav-bttn">signup</Link></button>
          <button className="nav-bttn login"><Link to="/login" className="nav-bttn">Login</Link></button>
        </div>
      )
    }

    if(this.props.currentView === 'student'){
      studentTabs = (
        <div className="nav-button student-tabs center">
          <button className="nav-bttn nav-student-dashboard"><Link to="/student/dashboard" className="nav-bttn">Dashboard</Link></button>
          <button className="nav-bttn nav-student-classes"><Link to="/student/classes" className="nav-bttn">Classes</Link></button>
          <button className="nav-bttn nav-student-mood-cloud"><Link to="/student/moodcloud" className="nav-bttn">Mood Cloud</Link></button>
        </div>
      )
    }
    
    if(this.props.currentView === 'teacher'){
      teacherTabs = (
        <div className="nav-button teacher-tabs center">
          <button className="nav-bttn nav-teacher-dashboard"><Link to="/teacher/dashboard" className="nav-bttn">Dashboard</Link></button>
          <button className="nav-bttn nav-teacher-classes"><Link to="/teacher/classes" className="nav-bttn">Classes</Link></button>
          <button className="nav-bttn nav-teacher-students"><Link to="/teacher/students" className="nav-bttn">Your Students</Link></button>
        </div>
      )
    }

    if(this.props.currentView === 'teacher' || this.props.currentView === 'student'){
      logoutTab = (
        <div className="nav-bttn nav-button log-out-tabs right">
          <button className="logout" onClick={() => this.logOut()}><Link to="/" className="nav-bttn">Logout</Link></button>
        </div>
      )
    }

    return(
      <div className="nav-bar">
        
        <h2 className="site-name"><Link to="/" className="logo-container"><img className="logo" src="https://www.startany.com/content/images/ogimage.png" alt="logo-purple-cloud"/><span className="mood-cloud">MOOD CLOUD</span></Link></h2>
        
        {landingPageTabs}
        {featuresTabs1}
        {featuresTabs2}
        {studentTabs}
        {teacherTabs}
        {logoutTab}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentView: state.view.selectedView,
  alertID: state.alert.userPanic[0] ? state.alert.userPanic[0]._id : 0,
})

export default connect(mapStateToProps)(Nav)