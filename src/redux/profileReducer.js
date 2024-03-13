import { profileAPI, usersAPI } from '../api/Api';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USERS-PROFILE';
const SET_STATUS = 'SET-STATUS';

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
                id: 5,
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

        default:
            return state;
    }

}

export const addPostActionCreator = (newPostElement) => ({ type: ADD_POST, newPostElement })

export const setUserProfile = (profile) =>
    ({ type: SET_USER_PROFILE, profile })

export const setStatus = (status) =>
    ({ type: SET_STATUS, status})

export const getUserProfile = (userId) => {
    return (dispatch) => {
        usersAPI.getProfile(userId)
            .then(data => {
                dispatch(setUserProfile(data));
            });
    }
}

export const getStatus = (userId) => {
    return (dispatch) => {
        profileAPI.getStatus(userId)
            .then(responce => {
                dispatch(setStatus(responce.data));
            });
    }
}

export const updateStatus = (status) => {
    return (dispatch) => {
        profileAPI.updateStatus(status)
            .then(responce => {
                if (responce.data.resultCode === 0) {
                    dispatch(setStatus(status));
                }
            });
    }
}
export default profileReducer;