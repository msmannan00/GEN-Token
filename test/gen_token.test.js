const GEN_TOKEN = artifacts.require("GEN_TOKEN");

contract("GEN_TOKEN", accounts => {
    let tokenInstance;

    before(async () => {
        tokenInstance = await GEN_TOKEN.deployed();
    });

    it("allocates the initial total supply upon deployment", async () => {
        let totalSupply = await tokenInstance.totalSupply();
        assert.equal(totalSupply.toNumber(), 300000000 * 10**18, "sets the total supply to 300,000,000");
    });

    it("assigns the initial total supply to the creator", async () => {
        let adminBalance = await tokenInstance.balanceOf(accounts[0]);
        assert.equal(adminBalance.toNumber(), 300000000 * 10**18, "allocates the initial supply to the admin account");
    });

    it("transfers token ownership", async () => {
        try {
            await tokenInstance.transfer.call(accounts[1], 99999999999999999999999); // large number to fail
        } catch (error) {
            assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
        }
        let success = await tokenInstance.transfer.call(accounts[1], 250000, { from: accounts[0] });
        assert.equal(success, true, "it returns true");
        await tokenInstance.transfer(accounts[1], 250000, { from: accounts[0] });
        let balance = await tokenInstance.balanceOf(accounts[1]);
        assert.equal(balance.toNumber(), 250000, "adds the amount to the receiving account");
    });

    it("approves tokens for delegated transfer", async () => {
        let success = await tokenInstance.approve.call(accounts[1], 100);
        assert.equal(success, true, "it returns true");
        await tokenInstance.approve(accounts[1], 100, { from: accounts[0] });
        let allowance = await tokenInstance.allowance(accounts[0], accounts[1]);
        assert.equal(allowance.toNumber(), 100, "stores the allowance for delegated transfer");
    });

    it("handles delegated token transfers", async () => {
        let fromAccount = accounts[2];
        let toAccount = accounts[3];
        let spendingAccount = accounts[4];
        // Transfer some tokens to fromAccount
        await tokenInstance.transfer(fromAccount, 100, { from: accounts[0] });
        // Approve spendingAccount to spend 10 tokens from fromAccount
        await tokenInstance.approve(spendingAccount, 10, { from: fromAccount });
        // Try transferring something larger than the sender's balance
        try {
            await tokenInstance.transferFrom(fromAccount, toAccount, 9999, { from: spendingAccount });
        } catch (error) {
            assert(error.message.indexOf('revert') >= 0, "cannot transfer value larger than balance");
        }
        // Try transferring something larger than the approved amount
        try {
            await tokenInstance.transferFrom(fromAccount, toAccount, 20, { from: spendingAccount });
        } catch (error) {
            assert(error.message.indexOf('revert') >= 0, "cannot transfer value larger than approved amount");
        }
        let success = await tokenInstance.transferFrom.call(fromAccount, toAccount, 10, { from: spendingAccount });
        assert.equal(success, true);
        await tokenInstance.transferFrom(fromAccount, toAccount, 10, { from: spendingAccount });
        let balance = await tokenInstance.balanceOf(toAccount);
        assert.equal(balance.toNumber(), 10);
        balance = await tokenInstance.balanceOf(fromAccount);
        assert.equal(balance.toNumber(), 90);
    });
});
