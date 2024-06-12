to run program type "npm start",

this is solidity contract:
```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DecentralizedChat is IERC721Receiver, Ownable {
    struct User {
        string nickname;
        address wallet;
    }

    struct Message {
        address sender;
        string content;
    }

    mapping(address => User) public users;
    mapping(address => mapping(address => Message[])) private chatHistory;
    address[] private userAddresses;

    event MessageSent(address indexed sender, address indexed receiver, string content, uint256 timestamp);
    event UserRegistered(address indexed user, string nickname);

    constructor(address initialOwner) Ownable(initialOwner) {}

    function register(string memory _nickname) external {
        require(bytes(_nickname).length > 0, "Nickname cannot be empty");
        require(users[msg.sender].wallet == address(0), "User already registered");

        users[msg.sender] = User(_nickname, msg.sender);
        userAddresses.push(msg.sender);
        emit UserRegistered(msg.sender, _nickname);
    }

    function sendMessage(address _receiver, string memory _message) external {
        require(users[msg.sender].wallet != address(0), "User is not registered");
        require(users[_receiver].wallet != address(0), "Receiver is not registered");

        chatHistory[msg.sender][_receiver].push(Message(msg.sender, _message));
        chatHistory[_receiver][msg.sender].push(Message(msg.sender, _message)); // Mirror message for the receiver
        emit MessageSent(msg.sender, _receiver, _message, block.timestamp);
    }

    function getChatHistory(address _user1, address _user2) external view returns (Message[] memory) {
        return chatHistory[_user1][_user2];
    }

    function getAllUsers() external view returns (address[] memory) {
        return userAddresses;
    }

    function onERC721Received(address, address, uint256, bytes memory) external pure override returns (bytes4) {
        return this.onERC721Received.selector;
    }
}
```
