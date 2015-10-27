export default function select (state) {
  return {
    isLoggedIn: state.login.username !== null,
    username: state.login.username
  }
}
