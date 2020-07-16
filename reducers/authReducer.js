const INITIAL_STATE = {
    isLoggedIn : false,
    name: '',
    attendance: [],
    semester: ''
}


const authReducer = (state=INITIAL_STATE,action) => {
    switch(action.type){

        case 'LOGIN':
            state.isLoggedIn = true
            return {
                ...state,
                name:action.payload.name,
                attendance:action.payload.attendance,
                semester: action.payload.semester
            }
        case 'SKIP':
            state.isLoggedIn = true
            return {
                ...state
            }
        case 'SET_GOAL':
            console.log('request recienved')
            var attendance = state.attendance.find(d => d.subCode === action.payload.subCode)
            if(attendance){
                var index = state.attendance.findIndex(d => d.subCode === action.payload.subCode)
                attendance.goal = action.payload.goal
                Object.assign(state.attendance[index],attendance)
            }

            return state
        case 'LOGOUT':
            return {
                ...state,
                isLoggedIn: false
            }
        default:
            return state
    }
}

export default authReducer