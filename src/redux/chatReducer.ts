import { Dispatch } from "redux"
import { chatApi, ChatMessageApiType, StatusType } from "../api/chat-api"
import { BaseThunkType, InferActionsTypes } from "./reduxStore"
import { v1 } from "uuid"


export type ChatMessageType = ChatMessageApiType & {id: string}

let initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as  StatusType
}



const chatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SOCIAL_NETWORK/CHAT/MESSAGES_RECEVIED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map(m => ({...m, id: v1()}))]
                .filter((m, index, array) => index >= array.length - 100)
            }
        case 'SOCIAL_NETWORK/CHAT/STATUS_CHANGED':
            return {
                ...state,
                status: action.payload.status
            }
        default:
            return state
    }
}

const actions = {
    messagesReceived: (messages: ChatMessageApiType[]) => ({
        type: 'SOCIAL_NETWORK/CHAT/MESSAGES_RECEVIED', payload: { messages }
    } as const),
    statusChanged: (status: StatusType) => ({
        type: 'SOCIAL_NETWORK/CHAT/STATUS_CHANGED', payload: { status }
    } as const)
}

let _newMessagesHandler: ((messages: ChatMessageApiType[]) => void) | null = null

const newMessagesHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessagesHandler === null) {
        _newMessagesHandler = (messages: ChatMessageApiType[]) => {
            dispatch(actions.messagesReceived(messages))
        }
    }
    return _newMessagesHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null

const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status: StatusType) => {
            dispatch(actions.statusChanged(status))
        }
    }
    return _statusChangedHandler
}

export const startMessagesListening = (): ThunkType => async dispatch => {
    chatApi.start()
    chatApi.subscribe('messages-received', newMessagesHandlerCreator(dispatch))
    chatApi.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
}

export const stopMessagesListening = (): ThunkType => async dispatch => {
    chatApi.unsubscribe('messages-received', newMessagesHandlerCreator(dispatch))
    chatApi.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
    chatApi.stop()
}

export const sendMessage = (message: string): ThunkType => async dispatch => {
    chatApi.sendMessage(message)
}

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>

export default chatReducer