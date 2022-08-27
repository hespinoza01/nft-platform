const { ethers } = require('hardhat')
const chalk = require('chalk')
const { gasPriceCalc } = require('../tools')
const MainContract = require('../artifacts/contracts/main.sol/NftMarketplace.json')
const fs = require('fs')
const path = require('path')

const mainEntryContract = 'NftMarketplace'

async function _deploy() {
    console.log(chalk.green(`Deploying "${mainEntryContract}"...`))

    const Contract = await ethers.getContractFactory(mainEntryContract)
    const Token = await Contract.deploy()
    const gasPrice = await gasPriceCalc()

    const deployedTransaction = await Token.deployTransaction.wait()
    const gasUsed = deployedTransaction.gasUsed.toNumber()
    const prices = gasPrice.calc(gasUsed)

    console.log()
    console.log(chalk.green('******** Contract Deploy Cost ********'))
    console.log(chalk.green(`* ETH: ${prices.eth}`))
    console.log(chalk.green(`* USD: ${prices.usd}`))
    console.log(chalk.green('**************************************'))
    console.log()

    console.log(
        chalk.green.bold(
            `Contract "${mainEntryContract}" deployed to ${Token.address}`
        )
    )

    return {
        address: Token.address,
        abi: MainContract.abi,
    }
}

_deploy()
    .then(data => {
        fs.writeFileSync(
            path.resolve(__dirname, '../src/secrets.json'),
            JSON.stringify(data, null, 2)
        )
        process.exit(0)
    })
    .catch(error => {
        console.error(error)
        process.exit(1)
    })
