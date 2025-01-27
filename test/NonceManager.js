const { expect } = require('@1inch/solidity-utils');
const { ethers } = require('hardhat');
const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { deployNonceManager } = require('./helpers/fixtures');

describe('NonceManager', function () {
    let addr;

    before(async function () {
        [addr] = await ethers.getSigners();
    });

    it('Get nonce - should return zero by default', async function () {
        const { nonceManager } = await loadFixture(deployNonceManager);
        const nonce = await nonceManager.nonce(addr.address);
        expect(nonce).to.equal(0);
    });

    it('Advance nonce - should add to nonce specified amount', async function () {
        const { nonceManager } = await loadFixture(deployNonceManager);
        await nonceManager.advanceNonce(5);
        const nonce = await nonceManager.nonce(addr.address);
        expect(nonce).to.equal(5);
    });

    it('Advance nonce - should not advance by 256', async function () {
        const { nonceManager } = await loadFixture(deployNonceManager);
        await expect(nonceManager.advanceNonce(256)).to.eventually.be.rejectedWith('AdvanceNonceFailed()');
    });

    it('Increase nonce - should add to nonce only 1', async function () {
        const { nonceManager } = await loadFixture(deployNonceManager);
        await nonceManager.increaseNonce();
        const nonce = await nonceManager.nonce(addr.address);
        expect(nonce).to.equal(1);
    });

    it('Nonce equals - should return false when nonce does not match', async function () {
        const { nonceManager } = await loadFixture(deployNonceManager);
        const isEquals = await nonceManager.nonceEquals(addr.address, 1);
        expect(isEquals).to.equal(false);
    });

    it('Nonce equals - should return true when nonce matches', async function () {
        const { nonceManager } = await loadFixture(deployNonceManager);
        await nonceManager.advanceNonce(4);
        const isEquals = await nonceManager.nonceEquals(addr.address, 4);
        expect(isEquals).to.equal(true);
    });
});
