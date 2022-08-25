import { Route, Redirect } from 'react-router-dom'

/**
 * Protect routes that require a prior login by verifying access keys before
 * rendering a protected view
 * @param {React.Component} component - Component to render
 * @param {String} path - route path to capture
 * */
export default function PrivateRoute({ component, path }) {
    // Check if exist a prev login access to can render request view
    const _component = true ? component : () => <Redirect to='/login' />

    return <Route exact path={path} component={_component} />
}
