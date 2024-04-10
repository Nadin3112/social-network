import { getAuthUserData } from "./authReducer"
import { ThunkAction } from 'redux-thunk'
import { AppStateType } from './reduxStore'

const INITIALIZED_SUCCESS = 'social-network/app/INITIALIZED_SUCCESS'

export type InitialStateType = {
    initialized: boolean
}

let initialState: InitialStateType = {
    initialized: false
}

type ActionsTypes = InitializedSuccessActionType

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType  => {

    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}

export const initializedSucces = ():InitializedSuccessActionType => ({ type: INITIALIZED_SUCCESS })

export const initializeApp = ():ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes> => async dispatch => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSucces())
        })
}

export default appReducer