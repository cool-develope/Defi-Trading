const TradingUtility = artifacts.require("TradingUtility");

module.exports = function (deployer) {
  deployer.deploy(TradingUtility);
};
