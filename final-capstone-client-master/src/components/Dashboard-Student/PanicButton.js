import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../../actions';
import './PanicButton.css';

export class PanicButton extends Component {
  handleToggleOn = () => {
    let data = {studentID: this.props.userId, active: true}
    this.props.dispatch(actions.toggleAlertButton(!this.props.alertActive));
    this.props.dispatch(actions.studentAlertTeachers(data));
  };

  handleToggleOff = () => {
    let data = {alertID: this.props.alertID, active: false}
    this.props.dispatch(actions.toggleAlertButton(!this.props.alertActive));
    this.props.dispatch(actions.toggleAlertOff(data));
  };
  
  render() {
    let helpButton;
    if(!this.props.alertActive) {
      helpButton = (
        <button className="panic-button hoverable" onClick={()=>{this.handleToggleOn()}}>
          <p className='normal'><i className="fa fa-warning"> </i> Are you in trouble?</p>
          <Link className='alert-teacher-button' to='/chatbox'><p className='hover'>Alert your teachers.</p></Link>
        </button>
      )
    }
    else {
      helpButton = (
      <button className="panic-button-on hoverable" onClick={()=>{this.handleToggleOff()}}>
        <p className='normal'><i className="fa fa-warning"> </i> Alert is on.</p>
        <p className='hover'>Turn off alert.</p>
      </button>
      )
    }

    return(
      <div className='help-button-container'>
        {helpButton}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.auth.currentUser ? state.auth.currentUser.id : 0,
  alertID: state.alert.userPanic[0] ? state.alert.userPanic[0]._id : 0,
  alertActive: state.alert.panicToggled,
})

export default connect(mapStateToProps)(PanicButton);
