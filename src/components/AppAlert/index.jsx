import { GrClose } from 'react-icons/gr'
import './index.scss'

export default function AppAlert({
    message = '',
    title = '',
    type = 'error',
    onClose = () => {},
}) {
    return (
        <p id='AppAlertComponent' className={`AppAlert ${type}`}>
            <span className='AppAlert-message'>
                {type === 'error' && <strong>¡Opps! Algo salió mal. </strong>}
                {type === 'success' && <strong>¡Finalizado! {title} </strong>}
                {type === 'warning' && <strong>¡Advertencia! {title} </strong>}
                {message}
            </span>

            {/* Clear error message on click */}
            <span className='AppAlert-close' onClick={onClose} title='Cerrar'>
                <GrClose size={20} />
            </span>
        </p>
    )
}
