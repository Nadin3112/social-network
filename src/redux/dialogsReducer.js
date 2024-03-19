const SEND_MESSAGE = 'social-network/dialogs/SEND-MESSAGE';

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
    ]
}

const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {

        case SEND_MESSAGE:
            let newMessage = action.newMessageElement;
            return {
                ...state,
                messages: [...state.messages, { id: 6, message: newMessage }]
            };

        default:
            return state;
    }
}

export const sendMessageActionCreator = (newMessageElement) => ({ type: SEND_MESSAGE, newMessageElement })

export default dialogsReducer;