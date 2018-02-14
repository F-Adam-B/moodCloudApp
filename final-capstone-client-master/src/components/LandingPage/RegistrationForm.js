import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm, focus } from 'redux-form';
import {Link} from 'react-router-dom';

import Input from '../Input';
import { login } from '../../actions/auth';
import { registerUser } from '../../actions/users';
import {required, nonEmpty, matches, length, isTrimmed} from '../../validators';

import './registrationForm.css'

export class RegistrationForm extends React.Component {
  onSubmit(values) {
    const { username, password, firstName, lastName, role } = values;
    const user = { username, password, firstName, lastName, role };
    return this.props
      .dispatch(registerUser(user))
      .then(() => this.props.dispatch(login(username, password)));
  }

  render() {
    if (this.props.loggedIn) {
      if(this.props.user.role === 'student'){
      return <Redirect to="/student/dashboard" />;
      } 
      else if(this.props.user.role === 'teacher'){
        return <Redirect to="/teacher/dashboard" />
      }
    }

    // let { selectedRole } = this.props

    let successMessage;
    if (this.props.submitSucceeded) {
      successMessage = (
        <div className="signup sigup-success">
          Signed up successfully
        </div>
      );
    }

    let errorMessage;
    if (this.props.error) {
      errorMessage = (
        <div className="signup signup-error">{this.props.error}</div>
      );
    }


    return (
      <div className="sign-container">
      <img src='http://lifestylepubs.wordpress.s3-us-west-2.amazonaws.com/app/uploads/prod/2017/02/the-psychology-of-color-4.jpg' className='log-in-clouds' alt='colorful clouds'/>
      {/* <img src='https://images-eu.ssl-images-amazon.com/images/I/81M39GgqFnL.png' className='log-in-clouds-2' alt='colorful clouds'/> */}

      <form
        className="registration-form"
        onSubmit={this.props.handleSubmit(values =>
            this.onSubmit(values)
        )}>

        {successMessage}
        {errorMessage}

        <fieldset className="registration-box">
          <legend>Sign Up</legend>
        <div className='fields-container-2'>
          <label htmlFor="firstName"></label>
          <Field component={Input} type="text" name="firstName" placeholder="first name"/>
          <label htmlFor="lastName"></label>
          <Field component={Input} type="text" name="lastName" placeholder="last name"/>
          <label htmlFor="username"></label>
          <Field
            component={Input}
            type="text"
            name="username"
            placeholder="username"
            validate={[required, nonEmpty, isTrimmed]}
          />
          <label htmlFor="password"></label>
          <Field
            component={Input}
            type="password"
            name="password"
            placeholder="password"
            validate={[required, length({min: 6, max: 72}), isTrimmed]}
          />
          <label htmlFor="passwordConfirm"></label>
          <Field
            component={Input}
            type="password"
            name="passwordConfirm"
            placeholder="confirm password"
            validate={[required, nonEmpty, matches('password')]}
          />
          <label className="select-role" htmlFor="role">Select your role: </label>
          <Field
            component="select"
            type="role"
            name="role"
            validate={[required]}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </Field>
          <div></div>
          {/* {selectedRole && <div>{selectedRole}</div>} */}
          <button
              className="sign"
              type="submit"
              disabled={this.props.pristine || this.props.submitting}>
              Sign Up
          </button>
        </div>
        </fieldset>
        <p className='no-account'>Already have an account? Log in <Link className='log-in-here' to={'/login'}><span className="log-in-here">Here</span></Link>.</p>
      </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedRole: state.form.registration.values.role,
  loggedIn: state.auth.currentUser !== null,
  user: state.auth.currentUser,
})

RegistrationForm = connect(
  mapStateToProps)(RegistrationForm);

export default reduxForm({
  form: 'registration',
  initialValues: { role: 'student' },
  onSubmitFail: (errors, dispatch) =>
      dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm);
