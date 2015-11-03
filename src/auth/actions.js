import { AUTHSRV } from '../urls'

export const FAILED_LOGIN = 'FAILED_LOGIN'
export const SUCCESS_LOGIN = 'SUCCESS_LOGIN'
export function doLogin (dispatch) {
  return async function (email, password, usertype) {
    let response = await fetch(`${AUTHSRV}/${usertype}/login`, {
      method: 'post',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    if (response.status >= 400) {
      dispatch({ type: FAILED_LOGIN })
    } else {
      dispatch({
        type: SUCCESS_LOGIN,
        email
      })
    }
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
