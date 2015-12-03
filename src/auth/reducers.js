import { SUCCESS_LOGIN, FAILED_LOGIN, DO_LOGOUT, EDIT_USER } from './actions'

let initialState = () => ({
  user: null,
  failure: ''
})

export default function reduce (state = initialState(), action) {
  switch (action.type) {
    case SUCCESS_LOGIN:
      return {
        ...state,
        user: action.user,
        failure: ''
      }
    case FAILED_LOGIN:
      return {
        ...state,
        failure: action.message
      }
    case DO_LOGOUT:
      return initialState()
    case EDIT_USER:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.user
        }
      }
    default:
      return state
  }
}
