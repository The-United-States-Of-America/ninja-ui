export const DO_LOGIN = 'DO_LOGIN'
export function doLogin(username, password) {
    localStorage.setItem('username', username)
    return {
        type: DO_LOGIN,
        username,
        password
    }
}

export const DO_LOGOUT = 'DO_LOGOUT'
export function doLogout() {
    return {
        type: DO_LOGOUT
    }
}
