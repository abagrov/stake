//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@prb/math/contracts/PRBMathUD60x18.sol";

contract Stake {
    using PRBMathUD60x18 for uint256;

    IERC20 public stakingToken;
    IERC20 public rewardToken;

    uint256 public percentage;
    uint256 public stakingHold;
    uint256 public rewardHold;

    uint256 private constant HUNDRED_PERCENTS = 100 * 1e18;
    address private _owner;

    mapping(address => StakeInfo) private stakings;

    struct StakeInfo {
        uint256[] depositAtTimes;
        mapping(uint256 => uint256) deposits;
    }

    event Staked(uint256 amount, uint256 until);
    event Unstaked(uint256 amount);
    event Claimed(uint256 amount);

    modifier owner() {
        require(msg.sender == _owner, "You are not the contract owner.");
        _;
    }

    constructor(address _stakingToken, address _rewardToken) {
        percentage = 1 * 1e18;
        stakingToken = IERC20(_stakingToken);
        rewardToken = IERC20(_rewardToken);
        stakingHold = 5 minutes;
        rewardHold = 2 minutes;
        _owner = msg.sender;
    }

    function stake(uint256 _amount) public {
        require(_amount > 0, "Staking amount should be greater than zero.");

        stakingToken.transferFrom(msg.sender, address(this), _amount);
        StakeInfo storage currStake = stakings[msg.sender];
        currStake.depositAtTimes.push(block.timestamp);
        currStake.deposits[block.timestamp] = _amount;

        emit Staked(_amount, block.timestamp + stakingHold);
    }

    function unstake() public {
        StakeInfo storage currStake = stakings[msg.sender];

        require(currStake.depositAtTimes.length > 0, "No tokens to unstake");
        uint256 amount = 0;
        for (uint256 i = currStake.depositAtTimes.length; i > 0; i--) {
            if (currStake.depositAtTimes[i - 1] + stakingHold > block.timestamp) {
                continue;
            }

            amount += currStake.deposits[currStake.depositAtTimes[i - 1]];
            currStake.deposits[currStake.depositAtTimes[i - 1]] = 0;
            pop(i - 1, currStake.depositAtTimes);
        }

        require(amount > 0, "It's too early");

        stakingToken.transfer(msg.sender, amount);
        emit Unstaked(amount);
    }

    function claim() public {
        StakeInfo storage currStake = stakings[msg.sender];

        require(currStake.depositAtTimes.length > 0, "No tokens to unstake");
        uint256 amount = 0;

        for (uint256 i = 0; i < currStake.depositAtTimes.length; i++) {
            if (currStake.depositAtTimes[i] + rewardHold > block.timestamp) {
                continue;
            }

            uint256 percentTimes = ((block.timestamp -
                currStake.depositAtTimes[i]) / rewardHold) * 1e18;

            amount +=
                currStake.deposits[currStake.depositAtTimes[i]].mul(percentage.pow(percentTimes)).div(HUNDRED_PERCENTS);

            currStake.depositAtTimes[i] = block.timestamp;

            currStake.deposits[block.timestamp] = currStake.deposits[
                currStake.depositAtTimes[i]
            ];
            currStake.deposits[currStake.depositAtTimes[i]] = 0;
        }

        require(amount > 0, "It's too early");

        rewardToken.transferFrom(_owner, msg.sender, amount);

        emit Claimed(amount);
    }

    function setPercentage(uint256 _percentage) public owner {
        percentage = _percentage * 1e18;
    }

    function setStakingHold(uint256 _stakingHold) public owner {
        stakingHold = _stakingHold;
    }

    function setRewardHold(uint256 _rewardHold) public owner {
        rewardHold = _rewardHold;
    }

    function pop(uint256 index, uint256[] storage array) private {
        require(index < array.length);
        array[index] = array[array.length - 1];
        array.pop();
    }
}
