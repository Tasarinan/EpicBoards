import { EditorState } from 'draft-js'
import createMarkdownPlugin from 'draft-js-markdown-plugin'

const emptyState = EditorState.createEmpty()

const initialState = {
  windowBounds: { width: 1440, height: 900 },
  saveLocation: undefined,
}

const AppSettings = (state = initialState, { payload, type }) => {
  switch (type) {
    case 'SET_SAVE_LOCATION':
      return {
        ...state,
        saveLocation: payload,
      }
    default:
      return state
  }
}

export default AppSettings
