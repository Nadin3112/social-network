import { usersAPI } from '../api/UserApi'
import { updateObjectInArray } from '../utils/objectHelpers.js/ObjectHelpers'
import { UsersType } from '../types/types'
import {  BaseThunkType, InferActionsTypes } from './reduxStore'
import { Dispatch } from 'redux'

let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>
}

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SOCIAL_NETWORK/USERS/FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(
                    state.users, action.userId, "id", { followed: true })
            }
        case 'SOCIAL_NETWORK/USERS/UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(
                    state.users, action.userId, "id", { followed: false })
            }
        case 'SOCIAL_NETWORK/USERS/SET_USERS':
            return { ...state, users: action.users }
        case 'SOCIAL_NETWORK/USERS/SET_CURRENT_PAGE':
            return { ...state, currentPage: action.currentPage }
        case 'SOCIAL_NETWORK/USERS/SET_TOTAL_USERS_COUNT':
            return { ...state, totalUsersCount: action.count }
        case 'SOCIAL_NETWORK/USERS/TOGGLE_IS_FETCHING':
            return { ...state, isFetching: action.isFetching }
        case 'SOCIAL_NETWORK/USERS/TOGGLE_IS_FOLLOWING_PROGRESS':
            return {
                ...state,
                followingInProgress: action.isFetching ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state;
    }
}

export const actions = {
    followSuccess: (userId: number) => ({ type: 'SOCIAL_NETWORK/USERS/FOLLOW', userId } as const),
    unfollowSuccess: (userId: number) => ({ type: 'SOCIAL_NETWORK/USERS/UNFOLLOW', userId } as const),
    setUsers: (users: Array<UsersType>) => ({ type: 'SOCIAL_NETWORK/USERS/SET_USERS', users } as const),
    setCurrentPage: (currentPage: number) => ({ type: 'SOCIAL_NETWORK/USERS/SET_CURRENT_PAGE', currentPage } as const),
    setTotalUsersCount: (totalUsersCount: number) => ({ type: 'SOCIAL_NETWORK/USERS/SET_TOTAL_USERS_COUNT', count: totalUsersCount } as const),
    toggleIsFetching: (isFetching: boolean) => ({ type: 'SOCIAL_NETWORK/USERS/TOGGLE_IS_FETCHING', isFetching } as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({ type: 'SOCIAL_NETWORK/USERS/TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId } as const)
}

export const requestUsers = (page: number, pageSize: number): ThunkType => async dispatch => {
    dispatch(actions.toggleIsFetching(true))
    dispatch(actions.setCurrentPage(page))

    let data = await usersAPI.getUsers(page, pageSize)
    dispatch(actions.toggleIsFetching(false))
    dispatch(actions.setUsers(data.items))
    dispatch(actions.setTotalUsersCount(data.totalCount))
}


const _followUnfollowFlow = async (dispatch: Dispatch<ActionsTypes>,
    userId: number,
    apiMethod: any,
    actionCreator: (userId: number) => ActionsTypes) => {
    dispatch(actions.toggleFollowingProgress(true, userId))
    let response = await apiMethod(userId)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleFollowingProgress(false, userId))
}

export const follow = (userId: number): ThunkType => async dispatch => {
    _followUnfollowFlow(dispatch, userId, usersAPI.postFollow.bind(usersAPI), actions.followSuccess)
}

export const unfollow = (userId: number): ThunkType => async dispatch => {
    _followUnfollowFlow(dispatch, userId, usersAPI.deleteFollow.bind(usersAPI), actions.unfollowSuccess)
}

export default usersReducer

export type InitialStateType = typeof initialState
type ThunkType = BaseThunkType<ActionsTypes>
type ActionsTypes = InferActionsTypes<typeof actions>