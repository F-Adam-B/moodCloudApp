import React, { Component } from 'react';
import ClassesResult from './ClassesResult';
import { connect } from 'react-redux';

import { searchClasses } from '../../actions/classes';
import { toggleInitialSearch } from '../../actions/classes';

import './SearchClass.css';

export class SearchClass extends Component {
  componentDidMount() {
    this.props.dispatch(toggleInitialSearch(false));
  }

  handleSearch = (e) => {
    e.preventDefault();
    const value = this.input.value;
    this.props.dispatch(searchClasses(value));
    this.props.dispatch(toggleInitialSearch(true));
    this.input.value = '';
  }

  render() {

    return(
      <div className='SearchClass'>
        <form className='search-teacher-form' onSubmit={e => this.handleSearch(e)}>
          <legend><h3>Find Your Class</h3></legend>
          <label className='search-teacher' htmlFor='search-teacher'>Search for classes by your instructor's last name:</label>
          <input
            className='search-teacher-input'
            type='text'
            name='search-teacher'
            id='search-teacher'
            placeholder='Last Name'
            ref={input => this.input = input}
            />
          <button type='submit' className='add-teacher-submit'>Search</button>
        </form>
        <ClassesResult />
      </div>
    )
  }
}

export default connect()(SearchClass)
