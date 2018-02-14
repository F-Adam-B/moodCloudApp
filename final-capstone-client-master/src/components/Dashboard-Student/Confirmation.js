import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './Confirmation.css';

export class Confirmation extends Component {

  render() {

    return (
      <div className='confirmation-container'>
        
        <div id="clouds">
          <div className="cloud x1"></div>
          <div className="cloud x2"></div>
          <div className="cloud x3"></div>
          <div className="cloud x4"></div>
          <div className="cloud x5"></div>
        </div>

        <div className='confirmation-text'>
          <p>Your mood has been recorded, {this.props.user}.</p>
          <Link to='/student/moodcloud' style={{ textDecoration: 'none' }}><p className='click-to-see'>Let's go see your mood cloud.</p></Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth.currentUser.firstName,
})

export default connect(mapStateToProps)(Confirmation)