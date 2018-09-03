const initialState = {
  records: [],
  labelInput: '',
  urlInput: '',
}

const AppReducer = (state = initialState, action) => {
  const { type, payload } = action
  const { records } = state

  switch (type) {
    case 'ADD_REFERENCE':
      return {
        ...state,
        records: [...records, payload],
      }

    case 'DELETE_REFERENCE':
      const newRecords = [
        ...records.slice(0, payload),
        ...records.slice(payload + 1),
      ]
      return {
        ...state,
        records: newRecords,
      }
    case 'CLEAR_REFERENCES':
      return {
        ...state,
        records: [],
      }
    default:
      return state
  }
}

export default AppReducer
