import update from 'immutability-helper'

const initialState = []

const emptyEpic = {
  title: '',
  phases: [],
  problem: '',
  references: []
}

const EpicReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'CREATE_EPIC':
      const count = state.length

      return [
        ...state,
        {
          id: count + 1,
          ...emptyEpic,
        },
      ]
    case 'SET_EPIC_TITLE':
      console.log(state)
      return update(state, {
        [payload.id]: {
          title: { $set: payload.content },
        },
      })
    default:
      return state
  }
}

export default EpicReducer
