import React, { useEffect, useState } from 'react'
import './index.scss'

function Button({
    align = 'center',
    color = '#fff',
    textColor = '#000',
    variant = '',
    children,
    type = 'button',
    onClick = () => {},
}) {
    const [style, setStyle] = useState({
        backgroundColor: 'transparent',
        color: textColor,
        border: 'none',
        textAlign: align,
    })

    const styleToUse = () => {
        if (variant === 'filled') {
            setStyle({
                backgroundColor: color,
                color: textColor,
                border: 'none',
            })
        }
        if (variant === 'outline') {
            setStyle({
                backgroundColor: 'transparent',
                color: color,
                border: `1px solid ${color}`,
            })
        }

        if (variant === 'link') {
            setStyle({
                backgroundColor: 'transparent',
                color: color,
                border: `none`,
            })
        }
    }

    useEffect(() => {
        styleToUse()
    }, [variant])

    return (
        <button type={type} onClick={onClick} className='Button' style={style}>
            {children}
        </button>
    )
}

export default React.memo(Button)
