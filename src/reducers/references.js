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
    case 'SET_LABEL_INPUT':
      return {
        ...state,
        labelInput: payload,
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
    case 'SET_URL_INPUT':
      return {
        ...state,
        urlInput: payload,
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
