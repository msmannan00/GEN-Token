const GenesisNFT = artifacts.require("GenesisNFT");

contract("GenesisNFT", accounts => {
    let nftInstance;

    before(async () => {
        nftInstance = await GenesisNFT.deployed();
    });

    it("enables NFT minting and tracks the creator", async () => {
        await nftInstance.mint("tokenURI1", 100, "Creator1", { from: accounts[0] });
        let owner = await nftInstance.ownerOf(0);
        assert.equal(owner, accounts[0], "correctly assigns owner of minted NFT");
        let creator = await nftInstance.originalCreator(0);
        assert.equal(creator, accounts[0], "correctly records the creator of the NFT");
    });

    it("allows the creator to update the NFT price", async () => {
        let newPrice = 200;
        await nftInstance.updateListingPrice(0, newPrice, { from: accounts[0] });
        let price = await nftInstance.listingPrice(0);
        assert.equal(price.toNumber(), newPrice, "correctly updates the listing price by the creator");
    });

    it("prevents non-creators from updating the NFT price", async () => {
        try {
            await nftInstance.updateListingPrice(0, 300, { from: accounts[1] });
            assert.fail("should have thrown an error");
        } catch (error) {
            assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
        }
    });

    it("handles transfers of NFT ownership", async () => {
        await nftInstance.transferFrom(accounts[0], accounts[1], 0, { from: accounts[0] });
        let newOwner = await nftInstance.ownerOf(0);
        assert.equal(newOwner, accounts[1], "ownership is transferred to new owner");
    });
});
