const TamaToken = artifacts.require("TamaToken");

module.exports = function (deployer) {
    deployer.deploy(TamaToken, "TamaToken", "TAMA");
}