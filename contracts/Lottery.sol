pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address[] public players;

    function Lottery() public {
        manager = msg.sender;
    }
    // expect player to enter eth
    function enter() public payable{
        require(msg.value > 0.1 ether);

        players.push(msg.sender);
    }

    function random() private view returns (uint) {
        return uint(keccak256(block.difficulty, now, players));
    }

    function pickWinner() public restricted {

        uint index = random() % players.length;
        players[index].transfer(this.balance);
        // empties array
        players = new address[](0);
    }

    function getPlayers() public view returns (address[]) {
        return players;
    }

    // reinforce security
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
}
