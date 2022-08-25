import { Route, Switch } from 'react-router-dom'

// import components
import { PrivateRoute } from './components'

// import views
import { Home } from './views'

export default function AppRoutes() {
    return (
        <Switch>
            <Route exact path='/' component={Home} />
        </Switch>
    )
}
