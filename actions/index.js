export const LOGIN = 'LOGIN'
export const SKIP = 'SKIP'
export const LOGOUT = 'LOGOUT'
export const ADD_BOOKS = 'ADD_BOOKS'
export const SET_GOAL = 'SET_GOAL'


export const login = (payload) => ({
    type:LOGIN,
    payload
})

export const skip = ( payload ) => ({
    type: SKIP,
    payload
})

export const logout = () => ({
    type: LOGOUT
})

export const addBooks = ( payload ) => ({
    type:ADD_BOOKS,
    payload
})

export const setAttendanceGoal = (payload) => ({
    type: SET_GOAL,
    payload
})

export const setActiveRoute = (payload) =>({
    type :'SET_ACTIVE_ROUTE',
    payload
})