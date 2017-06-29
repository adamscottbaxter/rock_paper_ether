window.addEventListener('load', function(){
  if(typeof web3 === 'undefined'){
    web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io'));
    // alert('Please Download Metamask')
    //disable everything
  }else{
    

    contractAddress = '0xde03ba19d5238c2e610c39f55f4cc4bb3f806d1d';
    abi = [{"constant":true,"inputs":[],"name":"bet","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"splitFunds","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"returnFunds","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"determineWinner","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"player2","outputs":[{"name":"addy","type":"address"},{"name":"commitHash","type":"bytes32"},{"name":"commitTime","type":"uint256"},{"name":"gameThrow","type":"uint256"},{"name":"revealTime","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"resetTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"commitHash","type":"bytes32"}],"name":"playerOneCommit","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[{"name":"commitHash","type":"bytes32"}],"name":"playerTwoCommit","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[{"name":"gameThrow","type":"uint256"},{"name":"secret","type":"uint256"}],"name":"playerOneReveal","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"stage","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"player1","outputs":[{"name":"addy","type":"address"},{"name":"commitHash","type":"bytes32"},{"name":"commitTime","type":"uint256"},{"name":"gameThrow","type":"uint256"},{"name":"revealTime","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"winner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"gameThrow","type":"uint256"},{"name":"secret","type":"uint256"}],"name":"playerTwoReveal","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"_player1","type":"address"},{"name":"_player2","type":"address"},{"name":"_bet","type":"uint256"}],"payable":false,"type":"constructor"}];



    rockPaperScissors = web3.eth.contract(abi).at(contractAddress);

    betValue();
    currentStage();
    playerOneInfo();
    playerTwoInfo();
    playerOneCommit();
    playerTwoCommit();
    playerOneReveal();
    playerTwoReveal();
    determineWinner();
  }
})


betValue = function(){
  rockPaperScissors.bet.call(function(e, response){
    if(response){
      console.log('BET: ', response.toNumber() / 1000000000000000000);
      response.toNumber() / 1000000000000000000;
    }else{
      console.log('ERROR: ', e);
    }
  })
}

currentStage = function(){
  rockPaperScissors.stage.call(function(e, response){
    if(response){
      console.log('STAGE: ', response.toNumber());
      response.toNumber();
    }else{
      console.log('ERROR: ', e)
    }
  })
}

playerOneInfo = function(){
  rockPaperScissors.player1.call(function(e, response){
    if(response){
      console.log('PLAYER_1: ', response);
      response;
    }else{
      console.log('ERROR: ', e)
    }
  })
}

playerTwoInfo = function(){
  rockPaperScissors.player2.call(function(e, response){
    if(response){
      console.log('PLAYER_2: ', response);
      response;
    }else{
      console.log('ERROR: ', e)
    }
  })
}


playerOneCommit = function(commitHash){
  rockPaperScissors.playerOneCommit.call(commitHash, function(e, response){
    if(response){
      console.log('PLAYER_1 COMMIT: ', response);
    }else{
      console.log('ERROR: ', e);
    }
  })
}

playerTwoCommit = function(commitHash){
  rockPaperScissors.playerTwoCommit.call(commitHash, function(e, response){
    if(response){
      console.log('PLAYER_2 COMMIT: ', response);
    }else{
      console.log('ERROR: ', e);
    }
  })
}

playerOneReveal = function(gameThrow, secret){
  rockPaperScissors.playerOneReveal.call(gameThrow, secret, function(e, response){
    if(response){
      console.log('PLAYER_1 Reveal: ', response);
    }else{
      console.log('ERROR: ', e);
    }
  })
}

playerTwoReveal = function(gameThrow, secret){
  rockPaperScissors.playerTwoReveal.call(gameThrow, secret, function(e, response){
    if(response){
      console.log('PLAYER_2 Reveal: ', response);
    }else{
      console.log('ERROR: ', e);
    }
  })
}

determineWinner = function(){
  rockPaperScissors.determineWinner.call(function(e, response){
    if(response){
      console.log('DETERMINE WINNER: ', response);
    }else{
      console.log('ERROR: ', e);
    }
  })
}

