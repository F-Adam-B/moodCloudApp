import * as types from '../actions/actionType';

const initialState = {
    username: '',
    message: '',
    messages: [],
    student: undefined,
    loading: false,
    error: false,
}

// // End Goal:
// messages: {
//     studentID1: [{name: 'Eddie Yao', message: 'Help'}, [{name: 'Eddie Yao', message: 'Take me here'}] ]
//     studentID2: [{name: 'Wences', message: 'Hello'}]
// }

const socketioReducer = (state=initialState, action) => {
    switch (action.type) {
        case types.SET_MESSAGES:
            // let newMessages = Object.assign({}, state.messages, {[action.message.studentId]: [...state.messages[action.message.studentId]]})
            // console.log(newMessages);
            // return 'abc';
            // Object.assign({}, state, {
            //         messages: newMessages
                // })
            return Object.assign({}, state, {
                messages: [...state.messages, action.message]
            })
        case types.SET_USER_MESSAGES:
            return Object.assign({}, state, {
                message: action.message
            })
        case types.CLEAR_HISTORY:
            return Object.assign({}, state, {
                messages: [],
            })
        case types.SET_STUDENT:
            return Object.assign({}, state, {
                student: action.student,
            })
        default: break;
    }
    return state;
}
export default socketioReducer;