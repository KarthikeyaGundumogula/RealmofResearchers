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
    }

    struct supporter {
        address supporter;
        mapping(uint => uint) tokenAmount;
        mapping(uint => uint) rewardClaimed;
    }

    struct Creator {
        uint tokenID;
        address creator;
        string _URI;
    }

    struct tokenTressury {
        uint tokenId;
        uint availbleAmount;
        uint totalAmount;
    }

    mapping(uint => Creator) public creators;
    mapping(uint => SocialToken) public socialTokens;
    mapping(address => supporter) public supporters;

    event CratorRigistered(uint id, address creator, string URI);
    event SocialTokenMinted(uint id, address owner, uint amount, string URI);
    event SocialTokenLaunched(
        uint id,
        address owner,
        uint price,
        uint threshold
    );
    event SocialTokenBought(
        uint id,
        address researcher,
        address supporter,
        uint amount
    );

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

    function getEthosLink() public {
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
            0
        );
        emit SocialTokenMinted(_id, msg.sender, amount, URI);
    }

    function launchSocialToken(
        uint _id,
        uint _price,
        uint _thresholdAmount
    ) public {
        require(
            socialTokens[_id].creator == msg.sender,
            "You are not the creator of this token"
        );
        require(
            socialTokens[_id].isLaunched == false,
            "This token is already launched"
        );
        socialTokens[_id].isLaunched = true;
        socialTokens[_id].price = _price;
        socialTokens[_id].availbleAmount = socialTokens[_id].totalAmount;
        socialTokens[_id].thresholdAmount = _thresholdAmount;
        _safeTransferFrom(
            msg.sender,
            address(this),
            _id,
            socialTokens[_id].totalAmount,
            ""
        );
        emit SocialTokenLaunched(_id, msg.sender, _price, _thresholdAmount);
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
}
