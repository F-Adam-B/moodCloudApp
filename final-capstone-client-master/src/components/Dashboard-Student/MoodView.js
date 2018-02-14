import React, { Component } from 'react';
import { connect } from 'react-redux';

import MoodForm from './MoodForm';
import MoodCaptions from './MoodCaptions';
import MoodSelections from './MoodSelections';

import './MoodView.css';

export class MoodDash extends Component {
  render() {
    return(
      <form className="mood-view-container">
        <MoodSelections/>
        <MoodCaptions/>
        <MoodForm/>
      </form>
    )
  }
}

export default connect()(MoodDash)