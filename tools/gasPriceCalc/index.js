const axios = require('axios')
const Web3 = require('web3')

/**
 * Calc eth & usd price for contract transaction using gas usage value
 * @param {Number} gasUsed
 * @returns { gasPrice, ethPrice, gasEthPrice, gasUsdPrice }
 */
module.exports = function () {
    return new Promise(async resolve => {
        try {
            const web3 = new Web3(
                new Web3.providers.HttpProvider(
                    'https://main-light.eth.linkpool.io'
                )
            )

            const gasPrice = Number(await web3.eth.getGasPrice())
            const { gasLimit } = await web3.eth.getBlock('latest')
            const { data } = await axios.get(
                'https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT'
            )

            const ethPriceInUsd = parseFloat(data.price)
            const calc = (gasUsed = 0) => {
                const result = web3.utils.fromWei(
                    web3.utils.toBN(gasPrice * gasUsed),
                    'ether'
                )

                return { eth: result, usd: result * ethPriceInUsd }
            }

            resolve({
                gasPrice: gasPrice,
                ethPrice: ethPriceInUsd,
                calc,
                gasLimit,
            })
        } catch (error) {
            console.log('calcEthPrice error:', error)
            process.exit(1)
        }
    })
}
