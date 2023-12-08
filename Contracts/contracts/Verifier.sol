//SPDX-License-Identifier: MIT

pragma solidity 0.8.16;
import "./INFTs.sol";

import {PrimitiveTypeUtils} from "@iden3/contracts/lib/PrimitiveTypeUtils.sol";
import {ICircuitValidator} from "@iden3/contracts/interfaces/ICircuitValidator.sol";
import {ZKPVerifier} from "@iden3/contracts/verifiers/ZKPVerifier.sol";

contract Verifier is ZKPVerifier {
    uint64 public constant TRANSFER_REQUEST_ID = 1;
    INFTs private nfts;
    mapping(uint => bool) public isProofVerified;

    // Circuit validation

    constructor(address _NFTs) {
        nfts = INFTs(_NFTs);
    }

    event rewardClaimed(address supporter, uint paperId, uint amount);

    function _beforeProofSubmit(
        uint64 requestId,
        uint256[] memory inputs,
        ICircuitValidator validator
    ) internal view override {
        // // check that  challenge input is address of sender
        // address addr = PrimitiveTypeUtils.int256ToAddress(
        //     inputs[validator.inputIndexOf("challenge")]
        // );
        // // this is linking between msg.sender and
        // require(
        //     _msgSender() == addr,
        //     "address in proof is not a sender address"
        // );
    }

    function _afterProofSubmit(
        uint64 requestId,
        uint256[] memory inputs,
        ICircuitValidator validator
    ) internal override {
        require(
            requestId == TRANSFER_REQUEST_ID,
            "proof can not be submitted more than once"
        );
        uint did = inputs[1];
        isProofVerified[did] = true;
    }

    function withdrawSupporterReward(
        uint userID,
        uint tokenId,
        address _supporter
    ) public {
        require(isProofVerified[userID], "Proof not verified for this token");
        uint _paperId = nfts.getPaperIdBySocialTokenId(tokenId);
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

        nfts.sendTransaction(_supporter, rewardToClaim);
        nfts.updateSupporterRewardClaims(rewardToClaim, _paperId, _supporter);
        isProofVerified[userID] = false;
        emit rewardClaimed(_supporter, _paperId, rewardToClaim);
    }

    function withdrawResearcherReward(uint _paperId) public {
        INFTs.ResearchPaper memory paper = nfts.getResearchPaper(_paperId);
        require(
            paper.researcher == _msgSender(),
            "Only researcher can withdraw reward"
        );
        INFTs.SocialToken memory socialToken = nfts.getSocialToken(
            paper.socialTokenId
        );
        uint ResearcherOwnership = 100 -
            socialToken.ownershipOnEntireTokenBatch;
        uint totalTokenReward = (paper.totalAmount * ResearcherOwnership) / 100;
        uint rewardToClaim = totalTokenReward -
            nfts.getAddressRewardClaimed(paper.researcher, _paperId);
        nfts.sendTransaction(paper.researcher, rewardToClaim);
        nfts.updateSupporterRewardClaims(
            rewardToClaim,
            _paperId,
            paper.researcher
        );
    }
}
