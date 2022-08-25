import ReactDOM from 'react-dom'
// components
import App from './App'

// import context provider
import Provider from 'store'

ReactDOM.render(
    <Provider>
        <App />
    </Provider>,
    document.getElementById('root')
)
