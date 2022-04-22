//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Stake {
    IERC20 private stakingToken;
    IERC20 private rewardToken;

    uint256 private percentage;
    uint256 private stakingHold;
    uint256 private rewardHold;

    address private _owner;

    mapping(address => uint256) private stakings;
    mapping(address => uint256) private stakingHolds;
    mapping(address => uint256) private rewardHolds;

    event Staked(uint256 amount, uint256 until);
    event Unstaked(uint256 amount);
    event Claimed(uint256 amount);

    modifier owner() {
        require(msg.sender == _owner, "You are not the contract owner.");
        _;
    }

    constructor(address _stakingToken, address _rewardToken) {
        percentage = 1;
        stakingToken = IERC20(_stakingToken);
        rewardToken = IERC20(_rewardToken);
        stakingHold = 5 minutes;
        rewardHold = 2 minutes;
        _owner = msg.sender;
    }

    function stake(uint256 _amount) public {
        require(_amount > 0, "Staking amount should be greater than zero.");

        stakingToken.transferFrom(msg.sender, address(this), _amount);
        stakings[msg.sender] += _amount;
        stakingHolds[msg.sender] = block.timestamp + stakingHold;
        rewardHolds[msg.sender] = block.timestamp + rewardHold;

        emit Staked(_amount, stakingHolds[msg.sender]);
    }

    function unstake() public {
        require(stakings[msg.sender] > 0, "No tokens to unstake");
        require(stakingHolds[msg.sender] <= block.timestamp, "It's too early");

        uint256 staking = stakings[msg.sender];
        stakings[msg.sender] = 0;
        stakingToken.transfer(msg.sender, staking);

        emit Unstaked(staking);
    }

    function claim() public {
        require(rewardHolds[msg.sender] <= block.timestamp, "It's too early");
        require(stakings[msg.sender] > 0, "No tokens staked");

        uint256 reward = (stakings[msg.sender] * percentage) / 100;
        rewardToken.transferFrom(_owner, msg.sender, reward);
        rewardHolds[msg.sender] = block.timestamp + rewardHold;

        emit Claimed(reward);
    }

    function setPercentage(uint256 _percentage) public owner {
        percentage = _percentage;
    }

    function setStakingHold(uint256 _stakingHold) public owner {
        stakingHold = _stakingHold;
    }

    function setRewardHold(uint256 _rewardHold) public owner {
        rewardHold = _rewardHold;
    }
}
