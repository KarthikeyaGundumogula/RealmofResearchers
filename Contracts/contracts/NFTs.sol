//SPDX-License-Identifier: MIT

pragma solidity 0.8.16;

import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "hardhat/console.sol";

contract NFTs is ERC1155URIStorage, ERC1155Holder {
    uint private tokenIds;
    uint public Retoks;
    address public owner;

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

    mapping(address => Creator) public creators;
    mapping(uint => SocialToken) public socialTokens;
    mapping(address => mapping(uint => uint)) public supporterTokenHoldings; //supporter => tokenID => amount
    mapping(address => mapping(uint => uint)) public addressRewardClaimed; //supporter => tokenID => amount
    mapping(uint => ResearchPaper) public researchPapers;
    mapping(address => mapping(uint => bool)) public isSubscribed;

    event CratorRigistered(uint id, address creator, string URI);
    event SocialTokenMinted(uint id, address owner, uint amount, string URI);
    event SocialTokenLaunched(
        uint id,
        address owner,
        uint price,
        uint threshold,
        uint ownershipOnEntireTokenBatch
    );
    event SocialTokenBought(
        uint id,
        address researcher,
        address supporter,
        uint amount
    );
    event PaperMinted(
        uint id,
        address owner,
        string URI,
        uint tokenId,
        uint subscriptionFee
    );
    event subscribed(address subscriber, uint paperId);
    event rewardClaimed(address supporter, uint paperId, uint amount);

    constructor() ERC1155("") {
        Retoks = tokenIds;
        owner = msg.sender;
    }

    function getCurrentTokenId() public view returns (uint) {
        return tokenIds;
    }

    function getCreator(
        address _creator
    ) external view returns (Creator memory) {
        return creators[_creator];
    }

    function getSocialToken(
        uint _id
    ) external view returns (SocialToken memory) {
        return socialTokens[_id];
    }

    function getSupporterTokenHoldings(
        address _supporter,
        uint _id
    ) external view returns (uint) {
        return supporterTokenHoldings[_supporter][_id];
    }

    function getAddressRewardClaimed(
        address _address,
        uint _id
    ) external view returns (uint) {
        return addressRewardClaimed[_address][_id];
    }

    function getResearchPaper(
        uint _id
    ) public view returns (ResearchPaper memory) {
        return researchPapers[_id];
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC1155, ERC1155Receiver) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function getRetoks() public {
        uint amount = 100 ether;
        _mint(msg.sender, Retoks, amount, "");
    }

    function registerCreator(string memory URI) public {
        tokenIds += 1;
        uint256 id = tokenIds;
        creators[msg.sender].tokenID = id;
        creators[msg.sender].creator = msg.sender;
        creators[msg.sender].URI = URI;
        _mint(msg.sender, id, 1, "");
        emit CratorRigistered(id, msg.sender, URI);
    }

    function mintSocialToken(uint amount, string memory URI) public {
        tokenIds += 1;
        uint256 _id = tokenIds;
        _mint(msg.sender, _id, amount, "");
        socialTokens[_id] = SocialToken(
            _id,
            msg.sender,
            URI,
            false,
            0,
            amount,
            0,
            0,
            0
        );
        emit SocialTokenMinted(_id, msg.sender, amount, URI);
    }

    function launchSocialToken(
        uint _id,
        uint _price,
        uint _thresholdAmount,
        uint _ownershipOnEntireTokenBatch
    ) public {
        require(
            socialTokens[_id].creator == msg.sender,
            "You are not the creator of this token"
        );
        require(
            socialTokens[_id].isLaunched == false,
            "This token is already launched"
        );
        require(
            socialTokens[_id].totalAmount >= _thresholdAmount,
            "Threshold amount is greater than total amount"
        );
        require(
            _ownershipOnEntireTokenBatch <= 100,
            "Ownership on token Batch cannot be greater than 100"
        );
        socialTokens[_id].isLaunched = true;
        socialTokens[_id].price = _price;
        socialTokens[_id].availbleAmount = socialTokens[_id].totalAmount;
        socialTokens[_id].thresholdAmount = _thresholdAmount;
        socialTokens[_id]
            .ownershipOnEntireTokenBatch = _ownershipOnEntireTokenBatch;
        _safeTransferFrom(
            msg.sender,
            address(this),
            _id,
            socialTokens[_id].totalAmount,
            ""
        );
        emit SocialTokenLaunched(
            _id,
            msg.sender,
            _price,
            _thresholdAmount,
            _ownershipOnEntireTokenBatch
        );
    }

    function buySocialToken(uint _id, uint _amount) public payable {
        address researcher = socialTokens[_id].creator;
        require(
            socialTokens[_id].isLaunched == true,
            "This token is not launched"
        );
        require(
            socialTokens[_id].availbleAmount >= _amount,
            "Not enough tokens available"
        );
        require(
            balanceOf(msg.sender, Retoks) >= socialTokens[_id].price * _amount,
            "You do not have enough Retoks"
        );
        require(
            supporterTokenHoldings[msg.sender][_id] <
                socialTokens[_id].thresholdAmount,
            "You have already bought the maximum amount of tokens"
        );
        socialTokens[_id].availbleAmount -= _amount;
        _safeTransferFrom(
            msg.sender,
            researcher,
            Retoks,
            socialTokens[_id].price * _amount,
            ""
        );
        supporterTokenHoldings[msg.sender][_id] += _amount;
        _safeTransferFrom(address(this), msg.sender, _id, _amount, "");
        emit SocialTokenBought(_id, researcher, msg.sender, _amount);
    }

    function mintPaper(
        string memory _uri,
        uint _tokenId,
        uint _subscriptionFee
    ) public {
        tokenIds += 1;
        uint256 _id = tokenIds;
        _mint(msg.sender, _id, 1, "");
        _setURI(_id, _uri);
        researchPapers[_id] = ResearchPaper(
            _id,
            _tokenId,
            msg.sender,
            _uri,
            _subscriptionFee,
            0,
            0
        );

        emit PaperMinted(_id, msg.sender, _uri, _tokenId, _subscriptionFee);
    }

    function Subscribe(uint _id) public {
        require(
            isSubscribed[msg.sender][_id] == false,
            "You are already subscribed to this paper"
        );
        require(
            balanceOf(msg.sender, Retoks) >=
                researchPapers[_id].subscriptionFee,
            "You do not have enough Retoks"
        );
        isSubscribed[msg.sender][_id] = true;
        if (researchPapers[_id].socialTokenId != 0) {
            _safeTransferFrom(
                msg.sender,
                address(this),
                Retoks,
                researchPapers[_id].subscriptionFee,
                ""
            );
            researchPapers[_id].unClaimedAmount += researchPapers[_id]
                .subscriptionFee;
        } else {
            _safeTransferFrom(
                msg.sender,
                researchPapers[_id].researcher,
                Retoks,
                researchPapers[_id].subscriptionFee,
                ""
            );
            researchPapers[_id].unClaimedAmount = 0;
        }
        researchPapers[_id].totalAmount += researchPapers[_id].subscriptionFee;

        emit subscribed(msg.sender, _id);
    }

    function withdrawSubscriptionReward(uint _paperId) public {
        if (msg.sender != researchPapers[_paperId].researcher) {
            require(
                supporterTokenHoldings[msg.sender][
                    researchPapers[_paperId].socialTokenId
                ] > 0,
                "You are not a supporter of this paper"
            );
            uint totalTokensReward = (researchPapers[_paperId].totalAmount *
                socialTokens[researchPapers[_paperId].socialTokenId]
                    .ownershipOnEntireTokenBatch) / 100;
            uint totalSupporterReward = (totalTokensReward *
                supporterTokenHoldings[msg.sender][
                    researchPapers[_paperId].socialTokenId
                ]) /
                socialTokens[researchPapers[_paperId].socialTokenId]
                    .totalAmount;
            uint rewardToClaim = totalSupporterReward -
                addressRewardClaimed[msg.sender][_paperId];
            supporterTokenHoldings[msg.sender][_paperId] += rewardToClaim;
            researchPapers[_paperId].unClaimedAmount -= rewardToClaim;
            _safeTransferFrom(
                address(this),
                msg.sender,
                Retoks,
                rewardToClaim,
                ""
            );
            emit rewardClaimed(msg.sender, _paperId, rewardToClaim);
        } else {
            require(
                researchPapers[_paperId].researcher == msg.sender,
                "You are not the researcher or the supporter of this paper"
            );
            uint researcherPercentage = 100 -
                socialTokens[researchPapers[_paperId].socialTokenId]
                    .ownershipOnEntireTokenBatch;
            uint totalResearcherShare = (researchPapers[_paperId].totalAmount *
                researcherPercentage) / 100;
            uint rewardToClaim = totalResearcherShare -
                addressRewardClaimed[researchPapers[_paperId].researcher][
                    _paperId
                ];
            _safeTransferFrom(
                address(this),
                msg.sender,
                Retoks,
                rewardToClaim,
                ""
            );
            addressRewardClaimed[researchPapers[_paperId].researcher][
                _paperId
            ] += rewardToClaim;
            researchPapers[_paperId].unClaimedAmount -= rewardToClaim;
            emit rewardClaimed(msg.sender, _paperId, rewardToClaim);
        }
    }
}
