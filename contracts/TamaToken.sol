// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TamaToken is ERC721, Ownable {
    constructor(string memory _name, string memory _symbol) 
        ERC721(_name, _symbol)
    {}

    uint256 COUNTER = 1;

    uint256 fee = 1 ether;

    struct Tama {
        string name;
        uint256 id;
        uint256 dna;
        uint8 level;
        uint8 rarity;
    }

    Tama[] tamas;

    event NewTamaEvent(address indexed owner, uint256 id, uint256 dna);

    
    // Creation 
    function _createTama(string memory _name) internal {
        uint256 randomDna = _generateNumber(10**16);
        Tama memory newTama = Tama(_name, COUNTER, randomDna, 1, 1);
        tamas.push(newTama);
        _safeMint(msg.sender, COUNTER);
        emit NewTamaEvent(msg.sender, COUNTER, randomDna);
        COUNTER++;
    }

    function createRandomTama(string memory _name) public payable {
        require(msg.value >= fee, "Not enough fee");
        
        _createTama(_name);
    }


    // Getters
    function getTamas() 
    public view returns(Tama[] memory) {
        return tamas;
    }

    function getOwnerTamas(address _owner) 
    public view returns(Tama[] memory) {
        Tama[] memory result = new Tama[](balanceOf(_owner));
        uint256 counter = 0;
        
        for(uint256 i = 0; i < tamas.length; i++) {
            if(ownerOf(i) == _owner ) {
                result[counter] = tamas[i];
                counter++;
            }
        }

        return result;
    }


    // Helpers
    function _generateNumber(uint256 _mod) internal view returns(uint256) {
        uint256 randomNumber = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender)));
        return randomNumber % _mod;
    }

    function updateFee(uint256 _fee) external onlyOwner() {
        fee = _fee;
    }

    function withdraw() external payable onlyOwner() {
        address payable _owner = payable(owner());
        _owner.transfer(address(this).balance);
    }
}