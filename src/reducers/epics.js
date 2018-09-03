import update from 'immutability-helper'

const initialState = []

const emptyEpic = {
  title: '',
  phases: [],
  problem: '',
  references: [],
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
      return update(state, {
        [payload.id]: {
          title: { $set: payload.content },
        },
      })
    case 'CREATE_REFERENCE':
      return update(state, {
        [payload.selectedEpic]: {
          references: {
            $push: [
              {
                label: payload.referenceLabel,
                url: payload.referenceUrl,
              },
            ],
          },
        },
      })
    case 'DELETE_REFERENCE':
      return update(state, {
        [payload.selectedEpic]: {
          references: {
            $splice: [[payload.id, 1]],
          },
        },
      })
    default:
      return state
  }
}

export default EpicReducer
