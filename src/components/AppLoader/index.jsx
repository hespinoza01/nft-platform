import React, { useEffect } from 'react'
import { ReactComponent as Loader } from 'assets/loader.svg'
import './index.scss'

function AppLoader() {
    const onClickLoader = e => {
        e.preventDefault()
        e.stopPropagation()
    }

    useEffect(_ => {
        document.body.style.overflow = 'hidden'

        return _ => {
            document.body.style.overflow = ''
        }
    }, [])

    return (
        <section onClick={onClickLoader} className='AppLoader'>
            <Loader height={80} width={80} />
        </section>
    )
}

export default React.memo(AppLoader)
