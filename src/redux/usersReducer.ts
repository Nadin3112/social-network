import { usersAPI } from '../api/Api'
import { updateObjectInArray } from '../utils/objectHelpers.js/ObjectHelpers'
import { UsersType } from '../types/types'
import { ThunkAction } from 'redux-thunk'
import { AppStateType } from './reduxStore'
import { Dispatch } from 'redux'

const FOLLOW = 'social-network/users/FOLLOW'
const UNFOLLOW = 'social-network/users/UNFOLLOW'
const SET_USERS = 'social-network/users/SET_USERS'
const SET_CURRENT_PAGE = 'social-network/users/SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'social-network/users/SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'social-network/users/TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'social-network/users/TOGGLE-IS-FOLLOWING-PROGRESS'


let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>
}

export type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(
                    state.users, action.userId, "id", { followed: true })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(
                    state.users, action.userId, "id", { followed: false })
            }
        case SET_USERS:
            return { ...state, users: action.users }

        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.currentPage }

        case SET_TOTAL_USERS_COUNT:
            return { ...state, totalUsersCount: action.count }

        case TOGGLE_IS_FETCHING:
            return { ...state, isFetching: action.isFetching }

        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }

        default:
            return state;
    }
}

type ActionsTypes = FollowSuccessActionType | UnfollowSuccessActionType
    | SetUsersActionType | SetCurrentPageActionType | SetTotalUsersCountActionType
    | ToggleIsFetchingActionType | ToggleFollowingProgressActionType

type FollowSuccessActionType = {
    type: typeof FOLLOW
    userId: number
}
export const followSuccess = (userId: number): FollowSuccessActionType => ({ type: FOLLOW, userId })

type UnfollowSuccessActionType = {
    type: typeof UNFOLLOW
    userId: number
}
export const unfollowSuccess = (userId: number): UnfollowSuccessActionType => ({ type: UNFOLLOW, userId })

type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UsersType>
}
export const setUsers = (users: Array<UsersType>): SetUsersActionType => ({ type: SET_USERS, users })

type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({ type: SET_CURRENT_PAGE, currentPage })

type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    count: number
}
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountActionType => ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount })

type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({ type: TOGGLE_IS_FETCHING, isFetching })

type ToggleFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}
export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressActionType => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId })

type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const requestUsers = (page: number, pageSize: number): ThunkType => async dispatch => {
    dispatch(toggleIsFetching(true))
    dispatch(setCurrentPage(page))

    let data = await usersAPI.getUsers(page, pageSize)
    dispatch(toggleIsFetching(false))
    dispatch(setUsers(data.items))
    dispatch(setTotalUsersCount(data.totalCount))
}




const _followUnfollowFlow = async (dispatch: DispatchType,
                                    userId: number,
                                    apiMethod: any,
                                    actionCreator: (userId: number) => FollowSuccessActionType | UnfollowSuccessActionType) => {
    dispatch(toggleFollowingProgress(true, userId))
    let response = await apiMethod(userId)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingProgress(false, userId))
}

export const follow = (userId: number): ThunkType => async dispatch => {
    _followUnfollowFlow(dispatch, userId, usersAPI.postFollow.bind(usersAPI), followSuccess)
}

export const unfollow = (userId: number): ThunkType => async dispatch => {
    _followUnfollowFlow(dispatch, userId, usersAPI.deleteFollow.bind(usersAPI), unfollowSuccess)
}

export default usersReducer