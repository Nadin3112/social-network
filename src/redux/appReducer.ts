import { getAuthUserData } from "./authReducer"
import { BaseThunkType,  InferActionsTypes } from './reduxStore'

let initialState = {
    initialized: false
}
export type InitialStateType = typeof initialState

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case 'SOCIAL_NETWORK/APP/INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>

const actions = {
    initializedSucces: () => ({ type: 'SOCIAL_NETWORK/APP/INITIALIZED_SUCCESS' } as const)
}

type ThunkType = BaseThunkType<ActionsTypes>

export const initializeApp = (): ThunkType => async dispatch => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise])
        .then(() => {
            dispatch(actions.initializedSucces())
        })
}

export default appReducer