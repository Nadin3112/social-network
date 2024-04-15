import { profileAPI } from '../api/ProfileApi'
import { PhotosType, PostType, ProfileType } from '../types/types'
import { BaseThunkType, InferActionsTypes } from './reduxStore'

let initialState = {
    posts: [
        { id: 1, message: 'Hi, how are you', likeCount: 25 },
        { id: 2, message: 'It is my first post', likeCount: 35 }
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
}

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SOCIAL-NETWORK/PROFILE/ADD_POST':
            let newPost = {
                id: 3,
                message: action.newPostElement,
                likeCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost]
            }
        case 'SOCIAL-NETWORK/PROFILE/SET_USER_PROFILE': {
            return {
                ...state,
                profile: action.profile
            }
        }
        case 'SOCIAL-NETWORK/PROFILE/SET_STATUS': {
            return {
                ...state,
                status: action.status
            }
        }
        case 'SOCIAL-NETWORK/PROFILE/DELETE_POST':
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            }
        case 'SOCIAL-NETWORK/PROFILE/SAVE_PHOTO_SUCCESS':
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos } as ProfileType
            }
        default:
            return state
    }
}

export const actions = {
    addPostActionCreator: (newPostElement: string) => ({ type: 'SOCIAL-NETWORK/PROFILE/ADD_POST', newPostElement } as const),
    setUserProfile: (profile: ProfileType)  => ({ type: 'SOCIAL-NETWORK/PROFILE/SET_USER_PROFILE', profile } as const),
    setStatus: (status: string) => ({ type: 'SOCIAL-NETWORK/PROFILE/SET_STATUS', status } as const),
    deletePost: (postId: number) => ({ type: 'SOCIAL-NETWORK/PROFILE/DELETE_POST', postId } as const),
    savePhotoSuccess :(photos: PhotosType) => ({ type: 'SOCIAL-NETWORK/PROFILE/SAVE_PHOTO_SUCCESS', photos } as const)
}

export const getUserProfile = (userId: number): ThunkType => async dispatch => {
    let data = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(data))
}

export const getStatus = (userId: number): ThunkType => async dispatch => {
    let data = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(data))
}

export const updateStatus = (status: string): ThunkType => async dispatch => {
    try {
        let data = await profileAPI.updateStatus(status)
        if (data.resultCode === 0) {
            dispatch(actions.setStatus(status))
        }
    } catch (error) { }
}

export const savePhoto = (file: File):ThunkType => async dispatch => {
    let data = await profileAPI.savePhoto(file)
    if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(data.data.photos))
    }
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId
    const data = await profileAPI.saveProfile(profile)
    if (data.resultCode === 0) {
        if (userId != null) {
            dispatch(getUserProfile(userId))
        } else {
            throw new Error("userId can't be null")
        }
        
    }
}

export default profileReducer

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
