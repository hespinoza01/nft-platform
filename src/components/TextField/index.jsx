import React, { useState } from 'react'
import {
    FaInfoCircle as InfoCircleIcon,
    FaEye as EyeIcon,
    FaEyeSlash as EyeSlashIcon,
} from 'react-icons/fa'
import './index.scss'

// import util
import { randomKey } from 'utils'

/**
 * Component with input+label reusability
 *
 * @param {String} label
 * @param {String} type
 * @param {String} className
 * @param {String} placeholder
 * @param {Boolean} required
 * @param {Object} rest
 * */
function FieldText({
    label = null,
    type = 'text',
    className = '',
    inputRef = null,
    placeholder,
    required,
    ...rest
}) {
    // random id to assing to input field & make reference from label
    const idFieldText = randomKey()

    const [showPassword, setShowPassword] = useState(false)

    return (
        <>
            <fieldset
                className={'FieldText ' + className}
                style={{
                    ...(label ? { marginTop: '1.75rem' } : {}),
                    ...(required ? { marginBottom: '1.25rem' } : {}),
                }}
            >
                {/* ...rest assing other props passed into component invoke */}
                <input
                    ref={inputRef}
                    id={idFieldText}
                    type={type === 'password' && showPassword ? 'text' : type}
                    autoComplete='off'
                    placeholder=' '
                    required={required}
                    {...rest}
                    className='FieldText-input'
                />

                {
                    // if label property is passed, render the label
                    label && (
                        <label
                            htmlFor={idFieldText}
                            className='FieldText-label'
                        >
                            {label}
                        </label>
                    )
                }

                {required && (
                    <div className='FieldText-required'>
                        <InfoCircleIcon />
                        <span>Requerido</span>
                    </div>
                )}

                {type === 'password' && (
                    <i
                        className='FieldText-showpassword'
                        onClick={_ => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                    </i>
                )}
            </fieldset>
        </>
    )
}

export default React.memo(FieldText)
