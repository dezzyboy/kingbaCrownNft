// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Address.sol";

contract Faucet is Ownable {
    using Address for address payable;

    uint256 public dripAmount;
    uint256 public cooldownTime;
    mapping(address => uint256) public nextRequestAt;

    event Dripped(address indexed recipient, uint256 amount);

    constructor(uint256 _dripAmount, uint256 _cooldownTime) payable Ownable(msg.sender) {
        require(msg.value > 0, "Initial deposit must be greater than zero");
        dripAmount = _dripAmount;
        cooldownTime = _cooldownTime;
    }

    function drip() external {
        require(block.timestamp >= nextRequestAt[msg.sender], "Faucet: Cooldown period not yet passed");
        require(address(this).balance >= dripAmount, "Faucet: Insufficient balance");

        nextRequestAt[msg.sender] = block.timestamp + cooldownTime;
        payable(msg.sender).sendValue(dripAmount);

        emit Dripped(msg.sender, dripAmount);
    }

    function setDripAmount(uint256 _dripAmount) external onlyOwner {
        dripAmount = _dripAmount;
    }

    function setCooldownTime(uint256 _cooldownTime) external onlyOwner {
        cooldownTime = _cooldownTime;
    }

    function deposit() external payable {
        require(msg.value > 0, "Deposit amount must be greater than zero");
    }

    function withdraw(uint256 amount) external onlyOwner {
        require(address(this).balance >= amount, "Insufficient balance");
        payable(owner()).sendValue(amount);
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
