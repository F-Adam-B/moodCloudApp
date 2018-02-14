import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom'
import { ClipLoader } from 'react-spinners';
import WordCloud from 'react-d3-cloud';

import { fetchStudentMoods } from '../../actions/moods';
import { toggleView } from '../../actions/views';

import './MoodCloud.css';

export class MoodCloud extends Component {
  componentDidMount() {
    this.props.dispatch(toggleView('student'));
    this.props.dispatch(fetchStudentMoods(this.props.id));
  }

  render() {

    if(this.props.loading){
      return(
        <div className='loading'>
          <ClipLoader
          color={'#0D8FA7'}
          loading={this.props.loading} 
        />
      </div>
      )
    }

    let wordCloud;
    if(this.props.moodCloudData.length === 0){
      wordCloud = (
        <div className='no-student-container'> 

          <div id="clouds">
            <div className="cloud x1"></div>
            <div className="cloud x2"></div>
            <div className="cloud x3"></div>
            <div className="cloud x4"></div>
            <div className="cloud x5"></div>
          </div>

          <div className='no-mood'>
            <p>You have not submitted any mood update.</p>
            <Link to='/student/dashboard' style={{ textDecoration: 'none' }}><p className='instruction-to-update'>Tell me how you are feeling.</p></Link>
          </div>
        </div>
      )
    }

    if(this.props.moodCloudData.length > 0){
      let pattern;
      if(this.props.moodCloudData.length <= 3){
        pattern = <p className='pattern'>Everything begins small. Keep logging your mood.</p>
      }
      else if(this.props.moodCloudData.length <= 5){
        pattern = <p className='pattern'>Your cloud is beginning to take shape.</p>
      }
      else if(this.props.moodCloudData.length > 5){
        if(this.props.moodCloudData.length % 5 === 0){
          pattern = <p className='pattern'>Where is your mood taking you today?</p>
        }
        else if(this.props.moodCloudData.length % 3 === 0){
          pattern = <p className='pattern'>What patterns do you notice?</p>
        }
        else if(this.props.moodCloudData.length % 2 === 0){
          pattern = <p className='pattern'>Where do you want your emotions to shift?</p>
        }
        else {
          pattern = <p className='pattern'>Are you finding any shapes?</p>
        }
      }
      
      // const fontSizeMapper = word => Math.log2(word.value) * 5;
      // const rotate = word => word.value % 360;

      wordCloud = (
      <div className='word-cloud-container'> 

        <div id="clouds">
          <div className="cloud x1"></div>
          <div className="cloud x2"></div>
          <div className="cloud x3"></div>
          <div className="cloud x4"></div>
          <div className="cloud x5"></div>
        </div>

        <div className='word-cloud-text-wrapper'>
          <p className='this-is-your-mood-cloud'> This is your mood cloud.</p>
          {pattern}
          <WordCloud 
            data={this.props.moodCloudData} 
            // fontSizeMapper={fontSizeMapper}
            // rotate={rotate}
            height= "500"
            font="arial"/>
        </div>
        <div className='cloud-background'></div>
      </div>
      )
    }

    return(
      <div className='moodcloud-container'>
        {wordCloud}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.moods.loading,
  id: state.auth.currentUser.id,
  moodCloudData: state.moods.studentMoods
})

export default connect(mapStateToProps)(MoodCloud)