import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createClass } from '../../actions/classes';

import './AddClass.css';

export class AddClass extends Component {

  handleAdd = (e) => {
    e.preventDefault();
    const value = {
      className: this.classNameInput.value,
      classPeriod: this.classPeriodInput.value,
      // email: this.emailContactInput.value,
      // phone: this.contactNumberInput.value,
      id: this.props.currentUser.id,
    }
    this.props.dispatch(createClass(value));
    this.classNameInput.value = '';
    this.classPeriodInput.value = '';
    // this.emailContactInput.value = '';
    // this.contactNumberInput.value = '';
  }

  render() {
    return(
      <div className='add-class'>
        <form className='add-class-form' onSubmit={e => this.handleAdd(e)}>
          <legend><h3>Create a Class</h3></legend>
          <label htmlFor='class-name'></label>
          <input 
            className="create-class-input" 
            type='text'
            name='class-name'
            id='class-name'
            placeholder='Class Name'
            ref={input => this.classNameInput = input}
            />

          <label htmlFor='search-teacher'></label>
          <input 
            className="create-class-input" 
            type='text'
            name='class-period'
            id='class-period'
            placeholder='Class Period'
            ref={input => this.classPeriodInput = input}
            />

          {/* <label htmlFor='search-teacher'></label>
          <input 
            className="create-class-input" 
            type='text'
            name='contact-email'
            id='contact-email'
            placeholder='Email Address'
            ref={input => this.emailContactInput = input}
            />

          <label htmlFor='search-teacher'></label>
          <input 
            className="create-class-input" 
            type='text'
            name='contact-phone'
            id='contact-phone'
            placeholder='Contact Number'
            ref={input => this.contactNumberInput = input}
            /> */}

          

          <button type='submit' className='create-class-submit'>Create</button>
        </form>
      </div>
    )
  }
}

// Refactor to Backend;
const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
})

export default connect(mapStateToProps)(AddClass)