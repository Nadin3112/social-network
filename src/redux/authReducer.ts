import { ResultCodeForCaptcha, ResultCodesEnum } from '../api/Api'
import { authAPI } from '../api/AuthApi'
import { securityAPI } from '../api/SecurityApi'
import { BaseThunkType, InferActionsTypes } from './reduxStore'

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
}

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SOCIAL_NETWORK/AUTH/SET_USERS_DATA':
        case 'SOCIAL_NETWORK/AUTH/GET_CAPTCHA_URL_SUCCESS':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) =>
        ({ type: 'SOCIAL_NETWORK/AUTH/SET_USERS_DATA', payload: { userId, email, login, isAuth } } as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({ type: 'SOCIAL_NETWORK/AUTH/GET_CAPTCHA_URL_SUCCESS', payload: { captchaUrl } } as const)
}

export const getAuthUserData = (): ThunkType => async dispatch => {
    let meData = await authAPI.me()
    if (meData.resultCode === ResultCodesEnum.Succes) {
        let { id, login, email } = meData.data
        dispatch(actions.setAuthUserData(id, email, login, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, setStatus: any, captcha: string): ThunkType => async dispatch => {
    let data = await authAPI.login(email, password, rememberMe, captcha)
    if (data.resultCode === ResultCodesEnum.Succes) {
        dispatch(getAuthUserData())
    } else {
        if (data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
            dispatch(getCaptchaUrl())
        }
        setStatus(data.messages)
    }
}

export const logout = (): ThunkType => async dispatch => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(actions.setAuthUserData(null, null, null, false));
    }
}

export const getCaptchaUrl = (): ThunkType => async dispatch => {
    const data = await securityAPI.getCaptchaUrl()
    const captchaUrl = data.url
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}


export default authReducer

export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>