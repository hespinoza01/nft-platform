import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import Blockies from 'react-blockies'
import { LogoAsset } from 'assets'
import { AppContext, actions } from 'store'
import { ErrorAlert } from 'utils'
import Web3 from 'web3'
import './index.scss'

export default function Navbar() {
    const { state, dispatch } = AppContext()
    const [balance, setBalance] = useState(0)

    const onConnectWallet = useCallback(async () => {
        if (!window.ethereum) {
            ErrorAlert('Por favor, instale metamask')
            return
        }

        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const web3 = new Web3(window.ethereum)
        const wallet = await web3.eth.getCoinbase()
        const { contract } = state
        const token = new web3.eth.Contract(contract.abi, contract.address, {
            from: wallet,
        })

        dispatch(actions.SET_WEB3, web3)
        dispatch(actions.SET_WALLET, wallet)
        dispatch(actions.SET_TOKEN, token)
        setBalance(await token.methods.balance().call())
    }, [state])

    const onRefreshBalance = useCallback(async () => {
        const { token } = state
        setBalance(await token.methods.balance().call())
    }, [state])

    return (
        <header className='Navbar'>
            <Link to={'/'}>
                <img src={LogoAsset} alt='app-logo' className='Navbar__logo' />
            </Link>

            <nav className='Navbar__nav'>
                <ul>
                    <li className='Navbar__nav__item'>
                        <Link to={'/'} className='nav--item'>
                            Inicio
                        </Link>
                    </li>
                    <li className='Navbar__nav__item'>
                        <Link to={'/founds'} className='nav--item'>
                            Mis Fondos
                        </Link>
                    </li>
                    <li className='Navbar__nav__item'>
                        <Link to={'/mynft'} className='nav--item'>
                            Mis NFT
                        </Link>
                    </li>
                </ul>
            </nav>

            {!state.web3 && (
                <button className='Navbar__btn' onClick={onConnectWallet}>
                    conectar wallet
                </button>
            )}

            {state.web3 && (
                <div className='Navbar__info'>
                    <span title='Recargar balance' onClick={onRefreshBalance}>
                        {state.web3.utils.fromWei(String(balance), 'ether')} ETH
                    </span>
                    <Blockies seed={state.wallet || ''} />
                </div>
            )}
        </header>
    )
}
