import { EditorState } from 'draft-js'
import createMarkdownPlugin from 'draft-js-markdown-plugin'

const emptyState = EditorState.createEmpty()

const initialState = {
  windowBounds: { width: 1440, height: 900 },
}

const AppSettings = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default AppSettings
