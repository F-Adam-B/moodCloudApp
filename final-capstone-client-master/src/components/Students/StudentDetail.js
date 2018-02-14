import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import Moment from 'react-moment';

import { fetchStudentDetailSuccess, toggleInitialMoodSearch } from '../../actions/students';

import './StudentDetail.css';

export class StudentDetail extends Component {
  componentDidMount(){
    this.props.dispatch(fetchStudentDetailSuccess([]));
    this.props.dispatch(toggleInitialMoodSearch(false));
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

    let emotionDetail, studentName;

    if(this.props.moods.length === 0 && !this.props.initialSearch){
      emotionDetail = <p className='click-to-view'>Click on the student name to view their mood history.</p>
    }

    else if(this.props.moods.length === 0 && this.props.initialSearch) {
      emotionDetail = <p className='no-update'><em>The selected student has no record of submitted mood update.</em></p>
    }
    
    else if(this.props.moods.length > 0) {
      emotionDetail = this.props.moods.map((item, index) =>    
        <li key={index} className={' detail-mood-li'}>
          <div className='moodType-dateTime'>
          <p className='detail-moodType'><span className='hash'>#</span>{item.moodType}</p>
            <Moment className='detail-dateTime' fromNow>{item.dateTime}</Moment>
            {/* <Moment className='detail-dateTime' format="MM/DD/YYYY HH:mm">{item.dateTime}</Moment> */}
          </div>
          {item.caption ? <div className='detail-caption'><blockquote>{item.caption}</blockquote></div> : undefined}
        </li>
      );
      studentName = `${this.props.moods[0].studentID.firstName} ${this.props.moods[0].studentID.lastName}`
    }
    

    return(
      <div className='student-detail-container'>
        <h3>Student Detail</h3>
        <p className='student-detail-full-name'>{studentName}</p>
       
        <ul>
          {emotionDetail}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.yourStudents.loading,
  moods: state.yourStudents.studentDetail,
  initialSearch: state.yourStudents.initialSearch,
})

export default connect(mapStateToProps)(StudentDetail);