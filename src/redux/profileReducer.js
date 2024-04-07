import { profileAPI } from '../api/Api';
//import { stopSubmit } from 'redux-form';

const ADD_POST = 'social-network/profile/ADD-POST';
const SET_USER_PROFILE = 'social-network/profile/SET-USERS-PROFILE';
const SET_STATUS = 'social-network/profile/SET-STATUS';
const DELETE_POST = 'social-network/profile/DELETE-POST';
const SAVE_PHOTO_SUCCESS = 'social-network/profile/SAVE-PHOTO-SUCCESS';

let initialState = {
    posts: [
        { id: 1, message: 'Hi, how are you', likeCount: 25 },
        { id: 2, message: 'It is my first post', likeCount: 35 }
    ],
    profile: null,
    status: ""
}

const profileReducer = (state = initialState, action) => {

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
                post: state.posts.filter(p => p.id !== action.postId)
            }


        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos }
            }

        default:
            return state;
    }

}

export const addPostActionCreator = (newPostElement) => ({ type: ADD_POST, newPostElement })

export const setUserProfile = (profile) =>
    ({ type: SET_USER_PROFILE, profile })

export const setStatus = (status) =>
    ({ type: SET_STATUS, status })

export const deletePost = (postId) =>
    ({ type: DELETE_POST, postId })

export const savePhotoSuccess = (photos) =>
    ({ type: SAVE_PHOTO_SUCCESS, photos })

export const getUserProfile = (userId) => async (dispatch) => {
    let data = await profileAPI.getProfile(userId);
    dispatch(setUserProfile(data));
}

export const getStatus = (userId) => async (dispatch) => {
    let data = await profileAPI.getStatus(userId);
    dispatch(setStatus(data));
}

export const updateStatus = (status) => async (dispatch) => {
    try {
        let data = await profileAPI.updateStatus(status);
        if (data.resultCode === 0) {
            dispatch(setStatus(status));
        }
    } catch (error) { }
}

export const savePhoto = (file) => async (dispatch) => {
    let data = await profileAPI.savePhoto(file);
    if (data.resultCode === 0) {
        dispatch(savePhotoSuccess(data.data.photos));
    }
}

export const saveProfile = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId)); }
}
export default profileReducer;