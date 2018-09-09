import update from 'immutability-helper'

const initialState = []

const emptyEpic = {
  title: '',
  phases: [],
  problem: '',
  references: [],
  goodBetterBest: ['', '', ''],
}

const EpicReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'CREATE_EPIC_RECORD':
      return [
        ...state,
        {
          id: payload,
          ...emptyEpic,
        },
      ]
    case 'DELETE_EPIC':
      return update(state, {
        $splice: [[payload, 1]],
      })
    case 'DELETE_PHASE':
      return update(state, {
        [payload.selectedEpic]: {
          phases: {
            $splice: [[payload.index, 1]],
          },
        },
      })

      return update(state, {
        [payload.selectedEpic]: {
          phases: {
            [payload.index]: { $set: payload.content },
          },
        },
      })
    case 'SET_EPIC_TITLE':
      return update(state, {
        [payload.selectedEpic]: {
          title: { $set: payload.content },
        },
      })
    case 'SET_EPIC_PROBLEM':
      return update(state, {
        [payload.selectedEpic]: {
          problem: { $set: payload.content },
        },
      })
    case 'SET_EPIC_GBB_CONTENT':
      return update(state, {
        [payload.selectedEpic]: {
          goodBetterBest: {
            [payload.index]: { $set: payload.content },
          },
        },
      })
    case 'SET_EPIC_PHASE':
      return update(state, {
        [payload.selectedEpic]: {
          phases: {
            [payload.index]: { $set: payload.content },
          },
        },
      })
    case 'CREATE_PHASE': {
      return update(state, {
        [payload.selectedEpic]: {
          phases: {
            $push: [''],
          },
        },
      })
    }
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
