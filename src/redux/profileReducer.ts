import { profileAPI } from '../api/Api'
import { PhotosType, PostType, ProfileType } from '../types/types'
import { ThunkAction } from 'redux-thunk'
import { AppStateType } from './reduxStore'
import { Dispatch } from 'redux'

const ADD_POST = 'social-network/profile/ADD-POST'
const SET_USER_PROFILE = 'social-network/profile/SET-USERS-PROFILE'
const SET_STATUS = 'social-network/profile/SET-STATUS'
const DELETE_POST = 'social-network/profile/DELETE-POST'
const SAVE_PHOTO_SUCCESS = 'social-network/profile/SAVE-PHOTO-SUCCESS'


let initialState = {
    posts: [
        { id: 1, message: 'Hi, how are you', likeCount: 25 },
        { id: 2, message: 'It is my first post', likeCount: 35 }
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    newPostText: ''
}

export type InitialStateType = typeof initialState

type ActionsTypes = AddPostActionCreatorType | SetUserProfileActionType 
| SetStatusActionType | DeletePostActionType | SavePhotoSuccessActionType

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 3,
                message: action.newPostElement,
                likeCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            }
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos } as ProfileType
            }
        default:
            return state
    }
}

type  AddPostActionCreatorType = {
    type: typeof ADD_POST
    newPostElement: string
}
export const addPostActionCreator = (newPostElement: string):  AddPostActionCreatorType => 
    ({ type: ADD_POST, newPostElement })

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType  =>
    ({ type: SET_USER_PROFILE, profile })

type SetStatusActionType = {
    type: typeof SET_STATUS
    status: string
}
export const setStatus = (status: string): SetStatusActionType =>
    ({ type: SET_STATUS, status })

type DeletePostActionType = {
    type: typeof  DELETE_POST
    postId: number
}
export const deletePost = (postId: number): DeletePostActionType =>
    ({ type: DELETE_POST, postId })

type SavePhotoSuccessActionType = {
    type: typeof  SAVE_PHOTO_SUCCESS
    photos: PhotosType
}
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType =>
    ({ type: SAVE_PHOTO_SUCCESS, photos })

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>
type DispatchType = Dispatch<ActionsTypes>
type GetStateType = () => AppStateType

export const getUserProfile = (userId: number): ThunkType => async dispatch => {
    let data = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(data))
}

export const getStatus = (userId: number): ThunkType => async dispatch => {
    let data = await profileAPI.getStatus(userId)
    dispatch(setStatus(data))
}

export const updateStatus = (status: string): ThunkType => async dispatch => {
    try {
        let data = await profileAPI.updateStatus(status)
        if (data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    } catch (error) { }
}

export const savePhoto = (file: any):ThunkType => async dispatch => {
    let data = await profileAPI.savePhoto(file)
    if (data.resultCode === 0) {
        dispatch(savePhotoSuccess(data.data.photos))
    }
}



export const saveProfile = (profile: ProfileType) => async (dispatch: DispatchType, getState: GetStateType) => {
    const userId = getState().auth.userId
    const response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === 0) {
        //dispatch(getUserProfile(userId))
    }
}
export default profileReducer