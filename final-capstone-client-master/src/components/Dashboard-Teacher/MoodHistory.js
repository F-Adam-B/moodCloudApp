import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import Moment from 'react-moment';

import { toggleView } from '../../actions/views';

import './MoodHistory.css';

export class MoodHistory extends Component {
  componentDidMount() {
    this.props.dispatch(toggleView('teacher'));
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


    let emotionDetail = this.props.moods.map((item, index) =>    
      <li key={index} className={' detail-mood-li'}>
        <div className='moodType-dateTime'>
        <p className='detail-moodType'><span className='hash'>#</span>{item.moodType}</p>
          <Moment className='detail-dateTime' fromNow>{item.dateTime}</Moment>
          {/* <Moment className='detail-dateTime' format="MM/DD/YYYY HH:mm">{item.dateTime}</Moment> */}
        </div>
        {item.caption ? <div className='detail-caption'><blockquote>{item.caption}</blockquote></div> : undefined}
      </li>
    );
    let studentName = `${this.props.student.firstName} ${this.props.student.lastName}`

    return(
      <div className='student-history-container'>
        <h3>Student Detail</h3>
        <p><em className='student-history-em'>See below for the mood submissions history of the highlighted student.</em></p>
        <p className='student-detail-full-name student-history-name'>{studentName}</p>
        <ul>
          {emotionDetail}
        </ul>
        <button className='return-to-dashboard'><Link className='return-to-dashboard-link' to='/'>Return to Dashboard</Link></button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.yourStudents.loading,
  moods: state.yourStudents.studentDetail,
  student: state.yourStudents.studentDetail.length > 0 ? state.yourStudents.studentDetail[0].studentID : '',
})

export default connect(mapStateToProps)(MoodHistory);