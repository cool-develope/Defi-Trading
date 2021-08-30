// SPDX-License-Identifier: MIT
pragma solidity ^0.6.6;
import {ILendingPool} from "@aave/protocol-v2/contracts/interfaces/ILendingPool.sol";
import {IUniswapV2Router01} from "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router01.sol";
import {UniswapV2Library} from "@uniswap/v2-periphery/contracts/libraries/UniswapV2Library.sol";
import {IERC20} from "@openzeppelin/contracts/interfaces/IERC20.sol";

contract TradingUtility {
  address constant public aaveLendingPoolAddress = 0xE0fBa4Fc209b4948668006B2bE61711b7f465bAe;
  address constant public uniswapRouterAddress = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
  address constant public uniswapDaiEtherPoolAddress = 0xBbB8eeA618861940FaDEf3071e79458d4c2B42e3;
  ILendingPool public aaveLendingPool;
  IUniswapV2Router01 public uniswapRouter;
  address immutable public uniswapFactoryAddress;

  constructor() public {
    aaveLendingPool = ILendingPool(aaveLendingPoolAddress);
    uniswapRouter = IUniswapV2Router01(uniswapRouterAddress);
    uniswapFactoryAddress = uniswapRouter.factory();
  }

  function quote(uint amountA, address tokenA, address tokenB) external view returns (uint amountB) {
    (uint reserveA, uint reserveB) = UniswapV2Library.getReserves(uniswapFactoryAddress, tokenA, tokenB);
    amountB = UniswapV2Library.quote(amountA, reserveA, reserveB);
  }

  function depositToAave(address asset, uint256 amount) external {
    IERC20 token = IERC20(asset);
    
    token.approve(aaveLendingPoolAddress, amount);
    aaveLendingPool.deposit(asset, amount, msg.sender, 0);
  }

  function provideLiquidityUniswap(address asset, uint256 amount) external payable {
    aaveLendingPool.withdraw(asset, amount, msg.sender);
    uniswapRouter.addLiquidityETH(uniswapDaiEtherPoolAddress, amount, amount, msg.value, msg.sender, 1729899138);
  }

  function removeLiquidityUniswap(address asset, uint256 amount) external payable {
    uniswapRouter.removeLiquidityETH(uniswapDaiEtherPoolAddress, amount, amount, msg.value, msg.sender, 1729899138);
    aaveLendingPool.deposit(asset, amount, msg.sender, 0);
  }
  
  event Deposit(address indexed from, uint256 value, uint256 amount);
}
