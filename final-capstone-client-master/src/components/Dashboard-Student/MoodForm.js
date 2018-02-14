import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import  {saveMood} from '../../actions/moods';
import { updateMoodCaption } from '../../actions/moods';

import './MoodForm.css';

export class MoodForm extends Component {
  handleSaveMood = (e) => {
    // e.preventDefault();
    let mood = {moodType: this.props.selectedMood, studentID: this.props.id, caption: this.textInput.value}
    this.props.dispatch(saveMood(mood));
    this.props.dispatch(updateMoodCaption(''));
    this.textInput.value = '';
  }

  render() {
    let saveMoodButton;
    if(!this.props.selectedMood){
      saveMoodButton = (
        <button className="save-mood save-mood-disabled" type='button' disabled>Save Mood</button>
      )
    }
    else {
      saveMoodButton = (
        <Link to="/student/confirmation"><button className="save-mood" type='submit' onClick={(e)=>this.handleSaveMood(e)}>Save Mood</button></Link>
      )
    }

    return(
      <div className='moodform-container'>
        <input type='text' ref={(input) => { this.textInput = input; }} className="text-area" rows='2' placeholder='I feel this way because: '/>
        {saveMoodButton}
      </div>
    )
  }
}


const mapStateToProps = state => ({
  selectedMood: state.moods.selectedMood,
  id: state.auth.currentUser.id
})

export default connect(mapStateToProps)(MoodForm);