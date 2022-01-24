const INCREMENT = 'increment'
const DECREMENT = 'decrement'

export const increment = () => ({
  type: INCREMENT
})

export const decrement = () => ({
  type: DECREMENT
})

const defaultState = {
  count: 0
}

export default (state = defaultState, action) => {
  switch(action.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 }
    case DECREMENT:
      return { ...state, count: state.count - 1 }
    default:
      return state
  }
}
