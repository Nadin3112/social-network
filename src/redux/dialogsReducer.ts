import { InferActionsTypes } from './reduxStore'

export type DialogsType = {
    id: number
    name: string
}

export type MessagesType = {
    id: number
    message: string
}

let initialState = {
    dialogs: [
        { id: 1, name: 'Nadia' },
        { id: 2, name: 'Roma' },
        { id: 3, name: 'Anna' },
        { id: 4, name: 'Sofia' },
        { id: 5, name: 'Maksim' },
        { id: 6, name: 'Sveta' }
    ] as Array<DialogsType>,
    messages: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'Hello' },
        { id: 3, message: 'How are you?' },
        { id: 4, message: 'Well. And you?' },
        { id: 5, message: 'I am ok' }
    ] as Array<MessagesType>,
}

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>

const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {

        case 'SOCIAL_NETWORK/DIALOGS/SEND_MESSAGE':
            let newMessage = action.newMessageElement
            return {
                ...state,
                messages: [...state.messages, { id: 6, message: newMessage }]
            };

        default:
            return state
    }
}

export const actions = {
    sendMessageActionCreator: (newMessageElement: string) => ({ type: 'SOCIAL_NETWORK/DIALOGS/SEND_MESSAGE', newMessageElement } as const)
}

export default dialogsReducer