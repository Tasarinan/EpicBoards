import { createAction } from 'redux-actions'

export const setNotificationContent = createAction('SET_NOTICATION_CONTENT')
export const setReferenceLabelInput = createAction('SET_REFERENCE_LABEL_INPUT')
export const setReferenceUrlInput = createAction('SET_REFERENCE_URL_INPUT')
export const toggleDrawer = createAction('TOGGLE_DRAWER')
export const toggleNotification = createAction('TOGGLE_NOTIFICATION')
export const toggleSaving = createAction('TOGGLE_SAVING')
export const toggleSettings = createAction('TOGGLE_SETTINGS_MODAL')
