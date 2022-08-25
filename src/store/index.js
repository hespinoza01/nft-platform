import { createStore } from 'redux'
import React, { useState, useEffect } from 'react'

// Import store items
import actions from './actions.store'
import initialState from './initial-state.store'
import Reducer from './reducer.store'

// create global context
const Store = createStore(Reducer)

/**
 * Extract redux context & context dispatcher
 * @returns {Object}
 */
function AppContext() {
    let unsubscribe = function () {}

    /**
     * @param {String} type
     * @param {Any} payload
     */
    const dispatch = (type, payload = null) => {
        Store.dispatch({ type, payload })
    }

    /**
     * @param {Callback} callback
     */
    const subscribe = callback => {
        if (typeof callback !== 'function') {
            return
        }

        unsubscribe = Store.subscribe(() => callback(Store.getState()))
    }

    return {
        state: Store.getState(),
        dispatch,
        subscribe,
        unsubscribe,
    }
}

/**
 * Wrapper for global store provider
 * @param {React.Component} children
 * */
function Provider({ children, ...props }) {
    const {
        state: rootState,
        dispatch,
        subscribe: contextSubscribe,
        unsubscribe: contextUnsubscribe,
    } = AppContext()

    const [state, setState] = useState(rootState)

    useEffect(() => {
        contextSubscribe(updatedState => {
            if (JSON.stringify(updatedState) !== JSON.stringify(state)) {
                setState(updatedState)
            }
        })

        return () => {
            contextUnsubscribe()
        }
    }, [])

    return React.cloneElement(children, {
        AppContext: () => ({ state, dispatch }),
        ...props,
    })
}

export default Provider
export { AppContext, actions, initialState, Reducer, Store }
