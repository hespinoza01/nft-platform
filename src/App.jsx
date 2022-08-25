import { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

// import styles
import './index.scss'

// import routes
import AppRoutes from './App.routes'

// import components
import { AppAlert as AppAlertComponent, AppLoader } from 'components'

// import hooks
import { useLoader } from 'hooks'

// import utils
import { AppAlert } from 'utils'
import Service from 'onejustchain'

export default function App() {
    // configuring app loader
    const [loader, enableLoader, disableLoader] = useLoader(<AppLoader />)
    // init AppAlerts config
    const { 1: enableAlerts, 2: disableAlerts } = AppAlert(AppAlertComponent)

    // Initial config for app
    const initComponent = _ => {
        console.log(Service)
        enableLoader()
        enableAlerts()

        return _ => {
            disableLoader()
            disableAlerts()
        }
    }

    useEffect(initComponent, [])

    return (
        <main className='App'>
            {/* <Router>
                <AppRoutes />
            </Router> */}

            {loader.render()}
        </main>
    )
}
