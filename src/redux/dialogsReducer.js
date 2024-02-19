const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';
const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
    dialogs: [
        { id: 1, name: 'Nadia' },
        { id: 2, name: 'Roma' },
        { id: 3, name: 'Anna' },
        { id: 4, name: 'Sofia' },
        { id: 5, name: 'Maksim' },
        { id: 6, name: 'Sveta' }
    ],
    messages: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'Hello' },
        { id: 3, message: 'How are you?' },
        { id: 4, message: 'Well. And you?' },
        { id: 5, message: 'I am ok' }
    ],
    newMessageText: ''
}

const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case UPDATE_NEW_MESSAGE_TEXT:
            state.newMessageText = action.newMessage;
            return state;

        case SEND_MESSAGE:
            let newMessage = state.newMessageText;
            state.messages.push({ id: 6, message: newMessage });
            state.newMessageText = '';
            return state;

        default:
            return state;
    }
}

export const sendMessageActionCreator = () => ({ type: SEND_MESSAGE })

export const updateNewMessageTextActionCreator = (message) => ({type: UPDATE_NEW_MESSAGE_TEXT, newMessage: message})

export default dialogsReducer;