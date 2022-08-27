import { useState, useEffect, useCallback } from 'react'
import { AppContext } from 'store'
import { TbMoodEmpty as MoodIcon } from 'react-icons/tb'
import { useLoader } from 'hooks'
import { randomKey, ErrorAlert, SuccessAlert } from 'utils'
import './index.scss'

export default function Home() {
    const [loader] = useLoader()
    const { state } = AppContext()
    const [nft, setNft] = useState([])

    const onInit = async () => {
        loader.show()
        const { token } = state
        token && setNft(await token.methods.getAllToken().call())
        loader.hide()
    }

    const onClickBuy = useCallback(
        async tokenId => {
            try {
                loader.show()

                const { token } = state
                await token.methods.buyNft(tokenId).send()
                SuccessAlert('Compra realizada con éxito')
            } catch (error) {
                ErrorAlert('No se logró efectuar la compra')
            } finally {
                loader.hide()
            }
        },
        [state]
    )

    useEffect(() => {
        onInit()
    }, [state])

    return (
        <section className='Home'>
            {!state.web3 && (
                <div className='Home__empty'>
                    <MoodIcon className='Home__empty__icon' />
                    <p className='Home__empty__msg'>
                        Conecta tu wallet para ver los NFT's
                    </p>
                </div>
            )}

            {state.web3 && (
                <article className='Home__content'>
                    {nft.map(({ owner, uri, price }, index) => (
                        <div key={randomKey()} className='Home__content__item'>
                            <img src={uri} alt={uri} />
                            <div className='item__info'>
                                <p className='item__info--owner'>
                                    Dueño:{' '}
                                    <span>{owner.substring(0, 7)}...</span>
                                </p>
                                <p className='item__info--price'>
                                    Precio:{' '}
                                    {price < 0 ? (
                                        'No disponible'
                                    ) : (
                                        <span>
                                            {state.web3.utils.fromWei(
                                                price,
                                                'ether'
                                            )}{' '}
                                            ETH
                                        </span>
                                    )}
                                </p>
                            </div>
                            {price > 0 && (
                                <button
                                    className='item__buy'
                                    onClick={() => onClickBuy(index)}
                                >
                                    comprar
                                </button>
                            )}
                        </div>
                    ))}
                </article>
            )}
        </section>
    )
}
