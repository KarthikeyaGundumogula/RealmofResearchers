//SPDX-License-Identifier: MIT

pragma solidity 0.8.16;
import "./INFTs.sol";

import {PrimitiveTypeUtils} from "@iden3/contracts/lib/PrimitiveTypeUtils.sol";
import {ICircuitValidator} from "@iden3/contracts/interfaces/ICircuitValidator.sol";
import {ZKPVerifier} from "@iden3/contracts/verifiers/ZKPVerifier.sol";

contract Verifier is ZKPVerifier {
    using PrimitiveTypeUtils for uint256;
    INFTs private nfts;

    // Circuit validation

    constructor(address _NFTs) {
        nfts = INFTs(_NFTs);
    }

    function verifyProof() public view returns (bool) {
        return true;
    }

    function withdrawSubscriberReward(
        uint _paperId,
        address _supporter
    ) private {
        INFTs.ResearchPaper memory paper = nfts.getResearchPaper(_paperId);
        uint socialTokenId = paper.socialTokenId;
        INFTs.SocialToken memory socialToken = nfts.getSocialToken(
            socialTokenId
        );
        uint totalTokenReward = (paper.totalAmount *
            socialToken.ownershipOnEntireTokenBatch) / 100;
        uint supporterTokenHolding = nfts.getSupporterTokenHoldings(
            _supporter,
            socialTokenId
        );
        uint totalSupporterReward = (totalTokenReward * supporterTokenHolding) /
            socialToken.totalAmount;
        uint rewardToClaim = totalSupporterReward -
            nfts.getAddressRewardClaimed(_supporter, _paperId);
    }
}
