export const DO_LOGIN = 'DO_LOGIN'
export function doLogin (dispatch) {
  return async function (username, password) {
    let user = await fetch('http://jsonplaceholder.typicode.com/posts/1')
    let userData = await user.json()
    console.log(userData)

    dispatch({
      type: DO_LOGIN,
      username,
      password
    })
  }
}

export const DO_LOGOUT = 'DO_LOGOUT'
export function doLogout (dispatch) {
  return function () {
    dispatch({
      type: DO_LOGOUT
    })
  }
}
