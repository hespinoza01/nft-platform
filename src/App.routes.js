import { Route, Switch } from 'react-router-dom'

// import components
import { Navbar } from './components'

// import views
import { Home, Founds, MyNFT } from './views'

export default function AppRoutes() {
    return (
        <>
            <Navbar />
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/founds' component={Founds} />
                <Route exact path='/mynft' component={MyNFT} />
            </Switch>
        </>
    )
}
