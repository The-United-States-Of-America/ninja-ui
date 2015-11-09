export default function select (state) {
  return {
    isLoggedIn: state.auth.user !== null,
    user: state.auth.user,
    failure: !!state.auth.failure,
    failureMsg: state.auth.failure
  }
}
