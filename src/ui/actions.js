export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR'
export function toggleSidebar (dispatch) {
  return function () {
    dispatch({
      type: TOGGLE_SIDEBAR
    })
  }
}

export const CHANGE_LOCATION = 'CHANGE_LOCATION'
export function changeLocation (dispatch) {
  return function (location) {
    dispatch({
      type: CHANGE_LOCATION,
      location
    })
  }
}
