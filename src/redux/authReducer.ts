import { authAPI, securityAPI } from '../api/Api'
import { AppStateType } from './reduxStore'
import { ThunkAction } from 'redux-thunk'

const SET_USERS_DATA = 'social-network//auth/SET_USERS_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'social-network//auth/GET_CAPTCHA_URL_SUCCESS'


let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
}

export type InitialStateType = typeof initialState;

type ActionsTypes = SetAuthUserDataActionType | GetCaptchaUrlSuccessActionType

const authReducer = (state = initialState, action: ActionsTypes):InitialStateType => {

    switch (action.type) {
        case SET_USERS_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

type SetAuthUserDataActionPayloadType = {
    userId: number | null
    email: string| null
    login: string| null
    isAuth: boolean 
}

type SetAuthUserDataActionType = {
    type: typeof SET_USERS_DATA
    payload: SetAuthUserDataActionPayloadType 
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
    type: SET_USERS_DATA, payload: { userId, email, login, isAuth }
})

type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload: {captchaUrl: string}
}

export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType => ({
    type: GET_CAPTCHA_URL_SUCCESS, payload: { captchaUrl} 
})

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getAuthUserData = ():ThunkType  => async dispatch => {
    let response = await authAPI.me()
    if (response.data.resultCode === 0) {
        let { id, login, email } = response.data.data
        dispatch(setAuthUserData(id, email, login, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, setStatus: any, captcha: string):ThunkType => async dispatch => {
    let response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    }   else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl())
        } 
        setStatus(response.data.messages)
    }
}

export const logout = (): ThunkType => async dispatch => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}

export const getCaptchaUrl = (): ThunkType => async dispatch => {
    const data = await securityAPI.getCaptchaUrl()
    const captchaUrl = data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}


export default authReducer