import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Field, reduxForm, focus } from 'redux-form';

import {Link} from 'react-router-dom';
import Input from '../Input';
import { login } from '../../actions/auth';
import { required, nonEmpty } from '../../validators';

import './loginForm.css'

export class LoginForm extends React.Component {
  onSubmit(values) {
    const { username, password } = values;
    return this.props.dispatch(login(username, password));
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

    let error;
    if (this.props.error) {
        error = (
          <div className="login-error" aria-live="polite">
            {this.props.error}
          </div>
        );
    }
    return (
      <div className="login-container">
      <img src='http://lifestylepubs.wordpress.s3-us-west-2.amazonaws.com/app/uploads/prod/2017/02/the-psychology-of-color-4.jpg' className='log-in-clouds' alt='colorful clouds'/>
      <form
        className="login-form"
        onSubmit={this.props.handleSubmit(values =>
            this.onSubmit(values)
        )}>

        {error}

        <fieldset className="login-box">
            <legend>Log In</legend>
            <div className='fields-container'>
              <label htmlFor="username"></label>
              <Field
                component={Input}
                type="text"
                name="username"
                id="username"
                placeholder="username"
                validate={[required, nonEmpty]}
              />
              <label htmlFor="password"></label>
              <Field
                component={Input}
                type="password"
                name="password"
                id="password"
                placeholder="password"
                validate={[required, nonEmpty]}
              />
              <button className="log" disabled={this.props.pristine || this.props.submitting}>
                Log in
              </button>
            </div>
          </fieldset>
          <p className='no-account'>Don't have an account yet? Sign up <Link className='signup-here-link' to={'/signup'}><span className="signup-here">Here</span></Link>.</p>
      </form>
      
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  loggedIn: state.auth.currentUser !== null,
  user: state.auth.currentUser
})

export default LoginForm = connect(
  mapStateToProps)(reduxForm({
  form: 'login',
  onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(LoginForm));