import initState from './initState'
const common = (state = initState, action) => {
  switch (action.type) {
    case 'UPDATE_STATE':
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export default common
