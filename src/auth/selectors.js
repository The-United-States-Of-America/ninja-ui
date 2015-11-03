export default function select (state) {
  return {
    isLoggedIn: state.auth.email !== null,
    email: state.auth.email,
    failure: state.auth.failure
  }
}
