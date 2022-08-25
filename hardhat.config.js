require('@nomiclabs/hardhat-waffle')
require('@openzeppelin/hardhat-upgrades')
require('@nomiclabs/hardhat-web3')
require('hardhat-contract-sizer')
require('dotenv').config()

// config local blockchain network
const GANACHE = {
    chainId: parseInt(process.env.GANACHE_CHAIN_ID) || 0,
    url: process.env.GANACHE_URL,
    accounts: JSON.parse(process.env.GANACHE_ACCOUNT),
}

module.exports = {
    defaultNetwork: 'ganache',
    networks: {
        ganache: {
            ...GANACHE,
        },
    },
    solidity: {
        version: '0.8.8',
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
                details: {
                    yul: true,
                    yulDetails: {
                        stackAllocation: true,
                        optimizerSteps: 'dhfoDgvulfnTUtnIf',
                    },
                },
            },
        },
    },
    paths: {
        sources: './contracts',
        tests: './tests',
        cache: './cache',
        artifacts: './artifacts',
    },
    contractSizer: {
        alphaSort: true,
        disambiguatePaths: false,
        runOnCompile: true,
        strict: true,
    },
}
