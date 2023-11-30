const ContractPaperNFts = artifacts.require("ContractPaperNFts");

contract("ContractPaperNFts", (accounts) => {
  let contract;

  before(async () => {
    contract = await ContractPaperNFts.deployed();
  });

  it("should mint 100 tokens for the deployer of the contract", async () => {
    const deployer = accounts[0];
    const tokenId = 0;
    const expectedSupply = 100;

    const balanceBefore = await contract.balanceOf(deployer, tokenId);
    assert.equal(
      balanceBefore.toNumber(),
      0,
      "Deployer should have 0 tokens before minting"
    );

    await contract.mint(deployer, tokenId, expectedSupply);

    const balanceAfter = await contract.balanceOf(deployer, tokenId);
    assert.equal(
      balanceAfter.toNumber(),
      expectedSupply,
      "Deployer should have 100 tokens after minting"
    );
  });
});
