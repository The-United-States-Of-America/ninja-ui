import { SUCCESS_LOGIN, FAILED_LOGIN, DO_LOGOUT } from './actions'

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
    default:
      return state
  }
}
