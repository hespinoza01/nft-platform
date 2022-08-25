import ReactDOMServer from 'react-dom/server'

/**
 * Custom hook for control app alert visualization
 * @param {React.Component} AlertComponent - component to render
 * @return {Array}
 */
export default function AppAlert(AlertComponent = null) {
    // Store alert status
    let showAlert = false

    const _onShowAlert = ({ detail }) => {
        const template = document.createElement('template')
        template.innerHTML = ReactDOMServer.renderToString(
            <AlertComponent
                message={detail.message}
                type={detail.type}
                title={detail.title}
            />
        )

        const html = template.content.firstChild
        const [closeButton] = html.getElementsByClassName('AppAlert-close')

        closeButton.onclick = () => _hideAlert()
        document.body.appendChild(html)
        setTimeout(() => _hideAlert(), 8000)
    }

    const _onHideAlert = _ => {
        const html = document.getElementById('AppAlertComponent')
        html?.remove()
    }

    // Change alert status to true for show
    function _showAlert(_message = '', _type = 'error', _title = '') {
        window.dispatchEvent(
            new CustomEvent('_showAlert', {
                detail: {
                    message: _message,
                    type: _type,
                    title: _title,
                },
                bubbles: true,
                cancelable: true,
            })
        )
    }

    // Change alert status to false
    function _hideAlert() {
        window.dispatchEvent(new CustomEvent('_hideAlert'))
    }

    // Configure window listener for show alerts
    const enableAlerts = _ => {
        window.addEventListener('_showAlert', _onShowAlert)
        window.addEventListener('_hideAlert', _onHideAlert)
    }

    // Remove prev windows listener
    const disableAlerts = _ => {
        window.removeEventListener('_showAlert', _onShowAlert)
        window.removeEventListener('_hideAlert', _onHideAlert)
    }

    return [
        {
            isShowing: showAlert,
            show: _showAlert,
            hide: _hideAlert,
        },
        enableAlerts,
        disableAlerts,
    ]
}

/**
 * Show a success alert
 * @param {String} message
 */
export const SuccessAlert = (message, title = 'Finalizado', timer = 1500) => {
    const alert = AppAlert()[0]

    alert.show(message, 'success')
}

/**
 * Show a error alert
 * @param {String} message
 */
export const ErrorAlert = message => {
    AppAlert()[0].show(message, 'error')
}

/**
 * Show a warning alert
 * @param {String} message
 */
export const WarningAlert = (message, title = '') => {
    AppAlert()[0].show(message, 'warning', title)
}

export const ValidationAlert = message => {
    WarningAlert(message, 'Completa los campos')
}
