# Rock Paper Ether

## How this project started

This was my first significant development project on the ethereum network. I wanted model it on a system with black-and-white rules, but at least a little completixy, so rock paper scissors fit the bill.

## What I learned

My main takeaway from this project was a better understanding of the flow of information to the blockchain, and the steps involved to prove past transactions. In this project, for example, a player can secretly throw 'rock', and then after the opponent throws, the first player can prove they threw 'rock' by providing the secret key which was encrypted along with the initial throw.

I also came to a better understanding of the pace of information transfer, which is much different than when using traditional databases. All calls for getting and setting information happen asynchronously, and waiting for responses from the blockchain computer forces a deliberate slow dance of information. 

## Further development goals
* Rebuild the front end using node.js
* Redesign the contract to be able to generate multiple games
* Create a new game without a preset opponent, then rework the web interface to act as an index for available games to join with the bet value being displayed

## Acknowledgments

* Hat-tip to[@zmitton](https://github.com/zmitton) for getting me out of the weeds when debugging the way web3 was transmitting the user input to the blockchain. Thank you-
