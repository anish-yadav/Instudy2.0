const INITIAL_STATE = {
  books: [],
  notes: []
}

export const resourceReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {

    case 'ADD_BOOKS':
      return {
        ...state,
        books: action.payload.books
      }
    default:
      return state
  }
}