import actions from './actions.store'
import initialState from './initial-state.store'

/**
 * Case reducers for manipulate global store context
 * @param {Object} state
 * @param {Object} action
 * */
export default function Reducer(state = initialState, action) {
    const { type, payload } = action

    // Verify action reducer type
    switch (type) {
        default:
            return state
    }
}
