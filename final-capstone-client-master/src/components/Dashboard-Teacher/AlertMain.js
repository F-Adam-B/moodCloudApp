import React, { Component } from 'react';
import {connect} from 'react-redux';

import EmotionAlertDetail from './EmotionAlertDetail';
import PanicAlertDetail from './PanicAlertDetail';

import './AlertMain.css';

export class AlertMain extends Component {
  render() {
    let alert;
    // Condition: if teacher-user has NO student with critical emotions logged within 24hr && Active Panic
    if (this.props.moodAlerts.length === 0 && this.props.panicAlerts.length === 0) {
      alert = (
        <div className='no-alert-container'>
  
          <div id="clouds">
            <div className="cloud x1"></div>
            <div className="cloud x2"></div>
            <div className="cloud x3"></div>
            <div className="cloud x4"></div>
            <div className="cloud x5"></div>
          </div>
  
          <div className='rest-easy-container'>
            <p>There are no student with alerts at this time.</p>
            <p className='rest-easy'>You may rest assured.</p>
          </div>
  
        </div>
        )
    }
    
    // Condition: if teacher-user HAS student(s) with critical emotions logged within 24hr || Active Panic
    else if (this.props.moodAlerts.length > 0 || this.props.panicAlerts.length > 0)  {
      alert = (
        <div className='alert-main-container'>
              
          <div id="clouds2">
            <div className="cloud2 x1"></div>
            <div className="cloud2 x2"></div>
            <div className="cloud2 x3"></div>
            <div className="cloud2 x4"></div>
            <div className="cloud2 x5"></div>
          </div>
          
          {/* Mapping happens here */}
          <div className='alert-container'>
            <p>You have received one or more alerts from your students.</p>
            <p className='do-not-rest-easy'>See the alerts below.</p>
  
            <div className='alert-detail-container'>
              <PanicAlertDetail />
              <EmotionAlertDetail />
            </div>
          </div>
        </div>
      )
    }
    

    return(
      <div className='emotion-alert-container'>
        {alert}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  moodAlerts: state.alert.moodAlertStudents,
  panicAlerts: state.alert.panicStudents
})

export default connect(mapStateToProps)(AlertMain)