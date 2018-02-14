import React, { Component } from 'react';
import {connect} from 'react-redux';

import './Modal.css';

export class Modal extends Component {

  render() {

    return (
      <div className='overlay' id='modal' key='0'>
        <div className='contents'>
          <img className='nav-image' src="http://res.cloudinary.com/adpoyao/image/upload/v1517277718/Mood%20Cloud/mood-cloud-nav.png" alt='navigation-chart'/>
          <p className='nav-description'>"Record how you feel on the mood cloud as often as you'd like."</p>

        </div>
      </div>
    )
  }
}

export default connect()(Modal)