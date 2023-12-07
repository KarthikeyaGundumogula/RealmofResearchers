const { expect } = require("chai");

describe("token contract deployment", function () {
  it("Owner is the deployer", async function () {
    const [owner] = await ethers.getSigners();
    const NFTs = await ethers.deployContract("NFTs");
    expect(await NFTs.owner()).to.equal(owner.address);
  });
  it("Users can mint the ReToks token with ID 0", async function () {
    const [owner, addr1] = await ethers.getSigners();
    const NFTs = await ethers.deployContract("NFTs");
    await NFTs.connect(addr1).getRetoks();
    expect(await NFTs.balanceOf(addr1.address, 0)).to.equal(
      ethers.parseEther("100")
    );
  });
});

describe("NFTs Interaction", function () {
  it("New creator is added with the URI", async function () {
    const [owner, addr1] = await ethers.getSigners();
    const NFTs = await ethers.deployContract("NFTs");
    await NFTs.connect(addr1).getRetoks();
    await NFTs.connect(addr1).registerCreator("uri");
    const currentTokenId = await NFTs.getCurrentTokenId();
    expect(
      await NFTs.connect(addr1).balanceOf(addr1.address, currentTokenId)
    ).to.equal(1);
  });
  it("Users are able to mint Social Tokens", async function () {
    const [owner, addr1] = await ethers.getSigners();
    const NFTs = await ethers.deployContract("NFTs");
    await NFTs.mintSocialToken(100, "uir");
    expect(await NFTs.balanceOf(owner.address, 1)).to.equal(100);
  });
  it("Minted Social tokens can be launched", async function () {
    const [owner, addr1] = await ethers.getSigners();
    const NFTs = await ethers.deployContract("NFTs");
    await NFTs.mintSocialToken(100, "uir");
    await NFTs.launchSocialToken(1, 23, 2, 60);
    expect(await NFTs.balanceOf(owner.address, 1)).to.equal(0);
    expect(await NFTs.balanceOf(NFTs, 1)).to.equal(100);
  });
  it("Launched Social tokens can be bought", async function () {
    const [owner, addr1] = await ethers.getSigners();
    const NFTs = await ethers.deployContract("NFTs");
    await NFTs.mintSocialToken(100, "uir");
    await NFTs.launchSocialToken(1, 23, 2, 60);
    await NFTs.connect(addr1).getRetoks();
    await NFTs.connect(addr1).buySocialToken(1, 1);
    expect(await NFTs.balanceOf(addr1.address, 1)).to.equal(1);
    expect(await NFTs.balanceOf(NFTs, 1)).to.equal(99);
    expect(await NFTs.balanceOf(owner.address, 0)).to.equal(23);
  });
  it("minting research papers", async function () {
    const [owner, addr1] = await ethers.getSigners();
    const NFTs = await ethers.deployContract("NFTs");
    await NFTs.mintSocialToken(100, "uir");
    await NFTs.launchSocialToken(1, 23, 2, 60);
    await NFTs.mintPaper("karthikeya", 1, 10);
    expect(await NFTs.balanceOf(owner.address, 2)).to.equal(1);
  });
  it("subscribing to a research paper", async function () {
    const [owner, addr1] = await ethers.getSigners();
    const NFTs = await ethers.deployContract("NFTs");
    await NFTs.mintSocialToken(100, "uir");
    await NFTs.launchSocialToken(1, 23, 2, 60);
    await NFTs.mintPaper("karthikeya", 1, 10);
    await NFTs.connect(addr1).getRetoks();
    await NFTs.connect(addr1).Subscribe(2);
    expect(await NFTs.isSubscribed(addr1.address, 2)).to.equal(true);
  });
  it("withdrwing the subscription amount as a creator", async function () {
    const [owner, addr1] = await ethers.getSigners();
    const NFTs = await ethers.deployContract("NFTs");
    await NFTs.mintSocialToken(60, "uir");
    await NFTs.launchSocialToken(1, 100, 2, 60);
    await NFTs.mintPaper("karthikeya", 1, 10);
    await NFTs.connect(addr1).getRetoks();
    await NFTs.connect(addr1).Subscribe(2);
    await NFTs.connect(owner).withdrawResearcherSubscriptionReward(2);
    expect(await NFTs.balanceOf(owner.address, 0)).to.equal(4);
  });
  it("withdrawing the subscription reward as a supporter", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();
    const NFTs = await ethers.deployContract("NFTs");
    await NFTs.mintSocialToken(60, "uir");
    await NFTs.launchSocialToken(1, 100, 2, 60);
    await NFTs.connect(addr2).getRetoks();
    await NFTs.connect(addr2).buySocialToken(1, 1);
    await NFTs.mintPaper("karthikeya", 1, 100);
    await NFTs.connect(addr1).getRetoks();
    await NFTs.connect(addr1).Subscribe(2);
    const verifier = await ethers.deployContract("Verifier", [NFTs]);
    await verifier.connect(addr2).withdrawSupporterReward(2, addr2.address);
    expect(await NFTs.balanceOf(addr2.address, 0)).to.equal(4);
    console.log(NFTs);
  });
});
