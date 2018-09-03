import { EditorState } from 'draft-js'
import createMarkdownPlugin from 'draft-js-markdown-plugin'

const emptyState = EditorState.createEmpty()

const initialState = {
  windowBounds: { width: 1440, height: 900 },
  title: '',
  problem: {},
  phases: [],
}

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TITLE_CONTENT':
      return {
        ...state,
        title: action.payload,
      }
    case 'SET_PROBLEM_CONTENT':
      return {
        ...state,
        problem: action.payload,
      }
    default:
      return state
  }
}

export default AppReducer
