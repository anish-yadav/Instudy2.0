export const history = (state = {active:''},action) =>{
  switch (action.type){

    case 'SET_ACTIVE_ROUTE':
    state.active = action.payload.name
    return state
    default :
    return state
  }
}