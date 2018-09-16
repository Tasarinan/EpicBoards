const initialState = {
  drawerOpen: false,
  notificationContent: '',
  notificationOpen: false,
  referenceLabel: '',
  referenceUrl: '',
  saving: false,
  selectedEpic: 0,
  settingsOpen: false,
}

const GlobalUiReducer = (state = initialState, { type, payload }) => {
  const actionMap = {
    SET_NOTICATION_CONTENT: 'notificationContent',
    SET_REFERENCE_LABEL_INPUT: 'referenceLabel',
    SET_REFERENCE_URL_INPUT: 'referenceUrl',
    SET_SELECTED_EPIC: 'selectedEpic',
    TOGGLE_DRAWER: 'drawerOpen',
    TOGGLE_NOTIFICATION: 'notificationOpen',
    TOGGLE_SAVING: 'saving',
    TOGGLE_SETTINGS_MODAL: 'settingsOpen',
  }

  return {
    ...state,
    [actionMap[type]]: payload,
  }
}

export default GlobalUiReducer
