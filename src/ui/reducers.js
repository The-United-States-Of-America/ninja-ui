import { combineReducers } from 'redux'
import { List, Set } from 'immutable'
import { TOGGLE_SIDEBAR, CHANGE_LOCATION } from './actions'

let initialState = () => ({
    location: '',
    mobile: document.body.clientWidth < 600,
    showSidebar: document.body.clientWidth >= 600
});

export default function ui(state = initialState(), action) {
    switch (action.type) {
        case TOGGLE_SIDEBAR:
            return {
                ...state,
                showSidebar: !state.showSidebar
            }
        case CHANGE_LOCATION:
            return {
                ...state,
                location: action.location
            }
        default:
            return state
    }
}
