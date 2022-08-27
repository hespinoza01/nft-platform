import { useState, useEffect, useCallback } from 'react'
import { AppContext } from 'store'
import { TbMoodEmpty as MoodIcon } from 'react-icons/tb'
import { randomKey, WarningAlert, SuccessAlert } from 'utils'
import { useLoader } from 'hooks'
import './index.scss'

export default function Home() {
    const [loader] = useLoader()
    const { state } = AppContext()
    const [nft, setNft] = useState([])

    const onInit = async () => {
        const { token } = state
        token && setNft(await token.methods.getAllTokenByWallet().call())
    }

    const onClickSell = useCallback(
        async e => {
            const { token, web3 } = state
            const input = e.target.parentElement.querySelector('input')
            const tokenId = parseInt(input.getAttribute('data-token'))
            const amount = input.value

            if (isNaN(parseFloat(amount))) {
                WarningAlert('Ingrese un precio de venta para continuar')
                return
            }

            loader.show()
            const price = web3.utils.toWei(String(amount), 'ether')
            await token.methods.publishNftSell(tokenId, price).send()
            loader.hide()
            SuccessAlert('Venta publicada con éxito')
        },
        [state]
    )

    useEffect(() => {
        onInit()
    }, [state])

    return (
        <section className='MyNFT'>
            {!state.web3 && (
                <div className='MyNFT__empty'>
                    <MoodIcon className='MyNFT__empty__icon' />
                    <p className='MyNFT__empty__msg'>
                        Conecta tu wallet para ver los NFT's
                    </p>
                </div>
            )}

            {state.web3 && (
                <article className='MyNFT__content'>
                    {nft.map(({ uri }, index) => (
                        <div key={randomKey()} className='MyNFT__content__item'>
                            <img src={uri} alt={uri} />
                            <div className='item__info'>
                                <p>Precio venta: </p>
                                <input
                                    type='number'
                                    min={0.1}
                                    step={0.1}
                                    data-token={index}
                                />
                                <button
                                    className='item__sell'
                                    onClick={onClickSell}
                                >
                                    vender
                                </button>
                            </div>
                        </div>
                    ))}
                </article>
            )}
        </section>
    )
}
