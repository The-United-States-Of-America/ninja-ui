import { SUCCESS_LOGIN, FAILED_LOGIN, DO_LOGOUT } from './actions'

let initialState = () => ({
  email: null,
  failure: false
})

export default function reduce (state = initialState(), action) {
  switch (action.type) {
    case SUCCESS_LOGIN:
      return {
        ...state,
        email: action.email,
        failure: false
      }
    case FAILED_LOGIN:
      return {
        ...state,
        failure: true
      }
    case DO_LOGOUT:
      return initialState()
    default:
      return state
  }
}
