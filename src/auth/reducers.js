import { DO_LOGIN, DO_LOGOUT } from './actions'

let initialState = () => ({
  username: null
})

export default function reduce (state = initialState(), action) {
  switch (action.type) {
    case DO_LOGIN:
      return {
        ...state,
        username: action.username
      }
    case DO_LOGOUT:
      return initialState()
    default:
      return state
  }
}
