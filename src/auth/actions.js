import { AUTHSRV } from '../urls'
import { postJson } from '../utils'

export const EDIT_USER = 'EDIT_USER'
export function editUser (dispatch) {
  return function (user) {
    dispatch({
      type: EDIT_USER,
      user
    })
  }
}

export const FAILED_LOGIN = 'FAILED_LOGIN'
export const SUCCESS_LOGIN = 'SUCCESS_LOGIN'
export function doLogin (dispatch) {
  return async function (email, password, usertype) {
    if (DEBUG && email === 'admin') {
      dispatch({
        type: SUCCESS_LOGIN,
        user: {
          usertype,
          id: '1',
          ssn: '1111111111',
          familyId: '1',
          firstName: 'Pranav',
          lastName: 'Sathy',
          email: 'sathyp@rpi.edu',
          password: 'test',
          family: {
            id: 1,
            name: 'Team Avatar'
          }
        }
      })

      return
    }

    try {
      let response = await postJson(`${AUTHSRV}/${usertype}/login`, { email, password })
      let userdata = await response.json()

      dispatch({
        type: SUCCESS_LOGIN,
        user: {
          ...userdata,
          usertype
        }
      })
    } catch (e) {
      console.log(e)
      dispatch({ type: FAILED_LOGIN, message: 'Login Failed!' })
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

export const DO_REGISTER = 'DO_REGISTER'
export function doRegister (dispatch) {
  return async function (state) {
    let registerData = (({email, firstName, lastName, ssn, npi, prefix, password, usertype}) => {
      switch (usertype) {
        case 'client':
          return { email, password, firstName, lastName, ssn }
        case 'provider':
          return { email, password, firstName, lastName, ssn, npi, prefix }
        case 'admin':
          return { email, password, firstName, lastName }
      }
    })(state)

    let response = await postJson(`${AUTHSRV}/${state.usertype}/register`, registerData)

    if (response.status >= 400) {
      dispatch({ type: FAILED_LOGIN, message: 'Error Registering!' })
    } else {
      let user = await response.json()
      user.usertype = state.usertype

      dispatch({
        type: SUCCESS_LOGIN,
        user
      })
    }
  }
}
