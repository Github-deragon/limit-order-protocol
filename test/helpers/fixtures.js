const { constants } = require('@1inch/solidity-utils');
const { ethers } = require('hardhat');

async function deploySwapTokens () {
    const TokenMock = await ethers.getContractFactory('TokenMock');
    const dai = await TokenMock.deploy('DAI', 'DAI');
    await dai.deployed();
    const WrappedTokenMock = await ethers.getContractFactory('WrappedTokenMock');
    const weth = await WrappedTokenMock.deploy('WETH', 'WETH');
    await weth.deployed();
    const inch = await TokenMock.deploy('1INCH', '1INCH');
    await inch.deployed();
    const LimitOrderProtocol = await ethers.getContractFactory('LimitOrderProtocol');
    const swap = await LimitOrderProtocol.deploy(weth.address);
    await swap.deployed();
    const usdc = await TokenMock.deploy('USDC', 'USDC');
    await usdc.deployed();
    const chainId = (await ethers.provider.getNetwork()).chainId;
    return { dai, weth, inch, swap, chainId, usdc };
};

async function deploySwap () {
    const LimitOrderProtocol = await ethers.getContractFactory('LimitOrderProtocol');
    const swap = await LimitOrderProtocol.deploy(constants.ZERO_ADDRESS);
    await swap.deployed();
    return { swap };
};

async function deployUSDC () {
    const TokenMock = await ethers.getContractFactory('TokenMock');
    const usdc = await TokenMock.deploy('USDC', 'USDC');
    await usdc.deployed();
    return { usdc };
};

async function deployUSDT () {
    const TokenMock = await ethers.getContractFactory('TokenMock');
    const usdt = await TokenMock.deploy('USDT', 'USDT');
    await usdt.deployed();
    return { usdt };
};

async function deployNonceManager () {
    const NonceManager = await ethers.getContractFactory('NonceManager');
    const nonceManager = await NonceManager.deploy();
    await nonceManager.deployed();
    return { nonceManager };
};

async function deploySeriesNonceManager () {
    const SeriesNonceManager = await ethers.getContractFactory('SeriesNonceManager');
    const seriesNonceManager = await SeriesNonceManager.deploy();
    await seriesNonceManager.deployed();
    return { seriesNonceManager };
};

async function deployArgumentsDecoderTest () {
    const ArgumentsDecoderTest = await ethers.getContractFactory('ArgumentsDecoderTest');
    const argumentsDecoderTest = await ArgumentsDecoderTest.deploy();
    await argumentsDecoderTest.deployed();
    return { argumentsDecoderTest };
};

async function deployRangeAmountCalculator () {
    const RangeAmountCalculator = await ethers.getContractFactory('RangeAmountCalculator');
    const rangeAmountCalculator = await RangeAmountCalculator.deploy();
    await rangeAmountCalculator.deployed();
    return { rangeAmountCalculator };
};

module.exports = {
    deploySwapTokens,
    deployNonceManager,
    deploySeriesNonceManager,
    deployArgumentsDecoderTest,
    deployRangeAmountCalculator,
    deployUSDT,
    deployUSDC,
    deploySwap,
};
