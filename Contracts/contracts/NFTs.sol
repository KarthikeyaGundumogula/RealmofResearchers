//SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";

contract SocialTokens is ERC1155URIStorage, ERC1155Holder {
    uint private tokenIds;
    uint public Retoks;
    address owner;

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
    struct Supporter {
        address supporter;
        mapping(uint => uint) tokenAmount;
        mapping(uint => uint) rewardClaimed;
    }
    struct Creator {
        uint tokenID;
        address creator;
        string _URI;
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

    mapping(uint => Creator) public creators;
    mapping(uint => SocialToken) public socialTokens;
    mapping(address => Supporter) public supporters;
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
        owner = msg.sender;
        Retoks = tokenIds;
    }

    function getCurrentTokenId() public view returns (uint) {
        return tokenIds;
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC1155, ERC1155Holder) returns (bool) {
        return
            interfaceId == type(IERC165).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    function getRetoks() public {
        uint amount = 100 ether;
        _mint(msg.sender, Retoks, amount, "");
    }

    function registerCreator(string memory URI) public {
        tokenIds += 1;
        uint256 _id = tokenIds;
        creators[_id] = Creator(_id, msg.sender, URI);
        _mint(msg.sender, _id, 1, "");
        emit CratorRigistered(_id, msg.sender, URI);
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

    function buySocialToken(
        uint _id,
        uint _amount,
        address researcher
    ) public payable {
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
            supporters[msg.sender].tokenAmount[_id] <
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
        if (supporters[msg.sender].tokenAmount[_id] == 0) {
            supporters[msg.sender].supporter = msg.sender;
            supporters[msg.sender].tokenAmount[_id] = _amount;
            supporters[msg.sender].rewardClaimed[_id] = 0;
        } else {
            supporters[msg.sender].tokenAmount[_id] += _amount;
        }
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

    function withDrawSubscriptionReward(uint _id) public {
        require(
            supporters[msg.sender].tokenAmount[_id] > 0,
            "You are not a supporter of this paper"
        );
        uint totalTokensReward = (researchPapers[_id].totalAmount *
            socialTokens[researchPapers[_id].socialTokenId]
                .ownershipOnEntireTokenBatch) / 100;
        uint totalSupporterReward = (totalTokensReward *
            supporters[msg.sender].tokenAmount[_id]) /
            socialTokens[researchPapers[_id].socialTokenId].totalAmount;
        uint rewardToClaim = totalSupporterReward -
            supporters[msg.sender].rewardClaimed[_id];
        require(rewardToClaim > 0, "You have already claimed all the rewards");
        supporters[msg.sender].rewardClaimed[_id] += rewardToClaim;
        researchPapers[_id].unClaimedAmount -= rewardToClaim;
        _safeTransferFrom(address(this), msg.sender, Retoks, rewardToClaim, "");
        emit rewardClaimed(msg.sender, _id, rewardToClaim);
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
        _safeTransferFrom(
            msg.sender,
            address(this),
            Retoks,
            researchPapers[_id].subscriptionFee,
            ""
        );
        emit subscribed(msg.sender, _id);
    }
}
