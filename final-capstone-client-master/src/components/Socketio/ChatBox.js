import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import { SOCKET_URL } from '../../config';

import * as types from './socketTypes';
import * as actions from '../../actions';

import './ChatBox.css';

class ChatBox extends Component {
  constructor(props){
    super(props)

    this.socket = io(SOCKET_URL);

    this.socket.on(types.RECEIVE_MESSAGE, function(data){
      addMessage(data);
    });

    const addMessage = data => {
      if(data.studentId === this.props.studentId){
        this.props.dispatch(actions.setMessages(data));
      }
    }
  }

  handleMessage = (e) => {
    e.preventDefault();
    let userName = `${this.props.user.firstName} ${this.props.user.lastName}`

    this.socket.emit(types.SEND_MESSAGE, {
      author: userName,
      message: this.textInput.value,
      studentId: this.props.studentId,
    });
    this.props.dispatch(actions.setUserMessage(this.textInput.value));
    this.textInput.value = '';
  }

  handleClearHistory = (e) => {
    e.preventDefault();
    this.props.dispatch(actions.clearhistory());
  }

  // componentDidUpdate = () => {
  //   this.box.scrollTop = this.box.scrollHeight;
  // }

  componentWillUnmount = () => {
    this.props.dispatch(actions.setUserMessage(''));
    this.socket.disconnect();
  }

  render(){
    return (
      <div className="container">
        <div className="row">
          <div   className="col-4">
            <div className="card">
              
              <div className="card-body">
                <div className="card-title">Chat Box</div>
                <p className='chat-instruction'>Begin your chat session now.</p>
                <p className='chat-instruction emergency'><em>If this is an emergency, dial 911 right away.</em></p>
                <div className="messages">
                
                  {this.props.messages.map((message, index) => {
                    return (
                      <div key={index} className='message-line' ref={div => this.box = div}>
                        <span className='author'>{message.author}:</span> {message.message}
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="card-footer">
                <form onSubmit={(e)=>this.handleMessage(e)}>
                  <input type="text" placeholder="Message" className="form-control chat-input" ref={(input) => { this.textInput = input; }}/>
                  <br/>
                  <div className='button-group'>
                    <button type="submit" className="btn btn-primary form-control submit-btn" >Send</button>
                    <button onClick={(e)=>this.handleClearHistory(e)} className="btn btn-primary form-control clear-btn">Clear Messages</button>
                    <Link to='/'><button className="btn btn-primary form-control back-btn">Back to home</button></Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  studentId: state.auth.currentUser.role === 'student' ? state.auth.currentUser.id : state.socketio.student,
  user: state.auth.currentUser,
  messages: state.socketio.messages
})

export default connect(mapStateToProps)(ChatBox);