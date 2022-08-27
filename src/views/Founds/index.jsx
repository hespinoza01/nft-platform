import { useState, useCallback } from 'react'
import { AppContext } from 'store'
import { SuccessAlert, ErrorAlert } from 'utils'
import { useLoader } from 'hooks'
import './index.scss'

export default function Founds() {
    const [loader] = useLoader()
    const { state } = AppContext()
    const [deposit, setDeposit] = useState(0)
    const [withdraw, setWithdraw] = useState(0)

    const onClickDeposit = useCallback(async () => {
        try {
            loader.show()
            const { token, web3 } = state
            const amount = web3.utils.toWei(String(deposit), 'ether')

            await token.methods.deposit().send({ value: amount })
            setDeposit(0)
            SuccessAlert('Depósito realizado con éxito')
        } catch (error) {
            ErrorAlert('No se pudo realizar el depósito')
        } finally {
            loader.hide()
        }
    }, [state, deposit])

    const onClickWithdraw = useCallback(async () => {
        try {
            loader.show()
            const { token, web3 } = state
            const amount = web3.utils.toWei(String(withdraw), 'ether')
            console.log(withdraw, amount)

            await token.methods.withdraw(amount).send()

            setWithdraw(0)
            SuccessAlert('Retiro realizado con éxito')
        } catch (error) {
            ErrorAlert('No se puedo realizar el retiro')
        } finally {
            loader.hide()
        }
    }, [state, withdraw])

    return (
        <section className='Founds'>
            <article className='Founds__item'>
                <h2>Realizar depósito</h2>

                <input
                    type='number'
                    min={0}
                    value={deposit}
                    onChange={e => setDeposit(e.target.value)}
                />

                <button
                    disabled={!deposit || !state.web3}
                    onClick={onClickDeposit}
                >
                    Depositar
                </button>
            </article>

            <article className='Founds__item'>
                <h2>Retirar fondos</h2>

                <input
                    type='number'
                    min={0}
                    value={withdraw}
                    onChange={e => setWithdraw(e.target.value)}
                />

                <button
                    disabled={!withdraw || !state.web3}
                    onClick={onClickWithdraw}
                >
                    Retirar
                </button>
            </article>
        </section>
    )
}
