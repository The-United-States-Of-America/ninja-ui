export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR'
export function toggleSidebar() {
    return {
        type: TOGGLE_SIDEBAR
    }
}

export const CHANGE_LOCATION = 'CHANGE_LOCATION'
export function changeLocation(location) {
    return {
        type: CHANGE_LOCATION,
        location
    }
}
