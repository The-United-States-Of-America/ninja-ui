export const DO_LOGIN = 'DO_LOGIN'
export function doLogin (dispatch) {
  return function (username, password) {
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
