import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as mood from '../../moodBank/moodBank';
import { updateMoodCaption } from '../../actions/moods';
import './MoodSelections.css';

export class MoodSelections extends Component {
  handleClick = (e) => {
    this.props.dispatch(updateMoodCaption(e.target.name));
  }

  render() {
    let that = this;
    function compileRow(row){
      return row.map((each, index) => { 
        return (
          <input type='button' className={'mood-square ' + each} key={index}  name={each} onClick={(e)=>that.handleClick(e)}/>
      )})
    }

    let row1 = compileRow(mood.set1);
    let row2 = compileRow(mood.set2);
    let row3 = compileRow(mood.set3);
    let row4 = compileRow(mood.set4);
    let row5 = compileRow(mood.set5);
    let row6 = compileRow(mood.set6);
    let row7 = compileRow(mood.set7);
    let row8 = compileRow(mood.set8);
    let row9 = compileRow(mood.set9);
    let row10 = compileRow(mood.set10);

    return(
      <div className='container'>
        <div className='row row-1'>
          {row1}
        </div>

        <div className='row row-2'>
          {row2}
        </div>
        
        <div className='row row-3'>
          {row3}
        </div>
        
        <div className='row row-4'>
         {row4}
        </div>
        
        <div className='row row-5'>
          {row5}
        </div>
        
        <div className='row row-6'>
          {row6}
        </div>
        
        <div className='row row-7'>
          {row7}
        </div>

        <div className='row row-8'>
          {row8}
        </div>

        <div className='row row-9'>
         {row9}
        </div>

        <div className='row row-10'>
          {row10}
        </div>

      </div>
    )
  }
}


export default connect()(MoodSelections)
