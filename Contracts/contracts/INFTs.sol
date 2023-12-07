//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface INFTs {
    struct SocialToken {
        uint tokenID;
        address creator;
        string URI;
        bool isLaunched;
        uint price;
        uint totalAmount;
        uint availbleAmount;
        uint thresholdAmount;
        uint ownershipOnEntireTokenBatch;
    }
    struct Creator {
        uint tokenID;
        address creator;
        string URI;
    }
    struct ResearchPaper {
        uint tokenId;
        uint socialTokenId;
        address researcher;
        string URI;
        uint subscriptionFee;
        uint totalAmount;
        uint unClaimedAmount;
    }

    function getCreator(
        address _creator
    ) external view returns (Creator memory);

    function getResearchPaper(
        uint _tokenId
    ) external view returns (ResearchPaper memory);

    function getAddressRewardClaimed(
        address _address,
        uint _id
    ) external view returns (uint);

    function getSupporterTokenHoldings(
        address _supporter,
        uint _id
    ) external view returns (uint);

    function getSocialToken(
        uint _id
    ) external view returns (SocialToken memory);

    function sendTransaction(address _to, uint _amount) external;

    function updateSupporterRewardClaims(
        uint _amount,
        uint _paperId,
        address _supporter
    ) external;
}
// END: Interface
