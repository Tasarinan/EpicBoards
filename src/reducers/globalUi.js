const initialState = {
  drawerOpen: false,
  settingsOpen: false,
  selectedEpic: 0,
  referenceLabel: '',
  referenceUrl: '',
}

const GlobalUiReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'TOGGLE_DRAWER':
      return {
        ...state,
        drawerOpen: payload,
      }
    case 'SET_REFERENCE_LABEL_INPUT':
      return {
        ...state,
        referenceLabel: payload,
      }
    case 'SET_REFERENCE_URL_INPUT':
      return {
        ...state,
        referenceUrl: payload,
      }
    case 'SET_SELECTED_EPIC':
      return {
        ...state,
        selectedEpic: payload,
      }
    case 'TOGGLE_SETTINGS_MODAL':
      return {
        ...state,
        settingsOpen: payload,
      }
    default:
      return state
  }
}

export default GlobalUiReducer
