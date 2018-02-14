import * as types from '../actions/actionType';

const initialState = {
    conversations: [],
    message: '',
    messages: [],
    recipients: [],
    loading: false,
    error: false
}

export const FETCH_RECIPIENTS = 'FETCH_RECIPIENTS';
export const FETCH_CONVERSATIONS = 'FETCH_CONVERSATIONS';
export const START_CONVERSATIONS = 'START_CONVERSATIONS';
export const FETCH_SINGLE_CONVERSATION = 'FETCH_SINGLE_CONVERSATION';
export const SEND_REPLY = 'SEND_REPLY';
export const CHAT_ERROR = 'CHAT_ERROR';

const conversationsReducer = (state = initialState, action) => {
    switch (action.type){
        case types.FETCH_CONVERSATIONS:
            return Object.assign({}, state, {
                loading: true,
                error: false,
                conversations: action.conversations
            })
        case types.FETCH_SINGLE_CONVERSATION:
            return Object.assign({}, state, {
                loading: true,
                error: false,
                messages: action.conversation
            })
        case types.FETCH_RECIPIENTS:
            return Object.assign({}, state, {
                loading: true,
                error: false,
            })
        case types.START_CONVERSATIONS:
            return Object.assign({}, state, {
                recipients: action.recipients,
                message: action.composedMessage,
            })
        case types.SEND_REPLY:
            return Object.assign({}, state, {
                message: action.composedMessage
            })
        case types.CHAT_ERROR: 
            return Object.assign({}, state, {
                loading: false,
                error: true,
            })
        default: break;
    }
    return state;
}

export default conversationsReducer;