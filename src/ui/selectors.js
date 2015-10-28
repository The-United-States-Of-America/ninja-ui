export default function select (state) {
  return {
    location: state.ui.location,
    mobile: state.ui.mobile,
    showSidebar: state.ui.showSidebar
  }
}
