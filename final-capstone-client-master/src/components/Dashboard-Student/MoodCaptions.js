import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './MoodCaptions.css';

export class MoodCaptions extends Component {
  render() {

    let caption;
    if(!this.props.selectedMood){
      caption = <p className='mood-caption nothing-selected'></p>
    }
    else {
      caption = <p key='0' className={'mood-caption caption-' + this.props.selectedMood}>{this.props.selectedMood}</p>
    }

    return(
      <div className='mood-captions-container'>
        <ReactCSSTransitionGroup
          transitionName="height"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {caption}
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  selectedMood: state.moods.selectedMood
})

export default connect(mapStateToProps)(MoodCaptions)
