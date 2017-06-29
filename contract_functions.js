window.addEventListener('load', function(){
  if(typeof web3 === 'undefined'){
    web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io'));
    // alert('Please Download Metamask')
    //disable everything
  }else{
    

    contractAddress = '0x333f3096a94b9d4ea6a3798993ad1fdf7f3de857';
    abi = [{"constant":true,"inputs":[],"name":"bet","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"returnFunds","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"determineWinner","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"player2","outputs":[{"name":"addy","type":"address"},{"name":"commitHash","type":"bytes32"},{"name":"commitTime","type":"uint256"},{"name":"gameThrow","type":"uint256"},{"name":"revealTime","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"resetTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"commitHash","type":"bytes32"}],"name":"playerOneCommit","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[{"name":"commitHash","type":"bytes32"}],"name":"playerTwoCommit","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[{"name":"gameThrow","type":"uint256"},{"name":"secret","type":"uint256"}],"name":"playerOneReveal","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"stage","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"player1","outputs":[{"name":"addy","type":"address"},{"name":"commitHash","type":"bytes32"},{"name":"commitTime","type":"uint256"},{"name":"gameThrow","type":"uint256"},{"name":"revealTime","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"winner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"gameThrow","type":"uint256"},{"name":"secret","type":"uint256"}],"name":"playerTwoReveal","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"_player1","type":"address"},{"name":"_player2","type":"address"},{"name":"_bet","type":"uint256"}],"payable":false,"type":"constructor"}];




    rockPaperScissors = web3.eth.contract(abi).at(contractAddress);

    betValue();
    currentStage();
    winner();
    resetTime();
    playerOneInfo();
    playerTwoInfo();
    // playerOneCommit();
    // playerTwoCommit();
    // playerOneReveal();
    // playerTwoReveal();
    // determineWinner();
    // returnFunds();

    displayBet();
    displayPlayerOne();
    displayPlayerTwo();
  }
})

betValue = function(){
  rockPaperScissors.bet.call(function(e, response){
    if(response){
      console.log('BET: ', response.toNumber() / 1000000000000000000);
      bet = response.toNumber() / 1000000000000000000;
    }else{
      console.log('ERROR: ', e);
    }
  })
}

currentStage = function(){
  rockPaperScissors.stage.call(function(e, response){
    if(response){
      console.log('STAGE: ', response.toNumber());
       var stageValue = response.toNumber();
       var currentStageDiv = document.querySelectorAll("[data-stage-display='" + stageValue + "']")[0];
       currentStageDiv.classList.remove('hidden');
    }else{
      console.log('ERROR: ', e)
    }
  })
}

winner = function(){
  rockPaperScissors.winner.call(function(e, response){
    if(response){
      console.log('WINNER: ', response);
      response;
    }else{
      console.log('ERROR: ', e)
    }
  })
}

resetTime = function(){
  rockPaperScissors.resetTime.call(function(e, response){
    if(response){
      console.log('RESET TIME: ', response);
      response; // TODO convert to time
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
      console.log('ERROR: ', e);
    }
  })
}


playerOneCommit = function(){
	web3.eth.getAccounts(function(e, accounts){
	    if(accounts && accounts.length > 0){
	      console.log('ACCOUNT: ', accounts[0])
	      var coinbase = accounts[0];
	      console.log('COINBASE: ', coinbase);
	      var playerOneCommitHash = document.getElementById('player_1_commit').value;

	      rockPaperScissors.playerOneCommit.sendTransaction(playerOneCommitHash, {from: coinbase, value: "10000000000000000"}, function(e, response){
	        if(response){
	          console.log('PLAYER_1 COMMIT: ', response);
	          console.log('player 1 info: ', playerOneInfo());
	        }else{
	          console.log('ERROR: ', e);
	        }
	      })

	    }else{
	      console.log('get accounts error: ', e)
	      alert("Please open metamask")
	    }
	  })
}

playerTwoCommit = function(){
	web3.eth.getAccounts(function(e, accounts){
	    if(accounts && accounts.length > 0){
	      console.log('ACCOUNT: ', accounts[0])
	      var coinbase = accounts[0];
	      console.log('COINBASE: ', coinbase);
	      var playerTwoCommitHash = document.getElementById('player_2_commit').value;

	      rockPaperScissors.playerTwoCommit.sendTransaction(playerTwoCommitHash, {from: coinbase, value: "10000000000000000"}, function(e, response){
	        if(response){
	          console.log('PLAYER_2 COMMIT: ', response);
	          console.log('player 2 info: ', playerOneInfo());
	        }else{
	          console.log('ERROR: ', e);
	        }
	      })

	    }else{
	      console.log('get accounts error: ', e)
	      alert("Please open metamask")
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

returnFunds = function(){
  rockPaperScissors.returnFunds.call(function(e, response){
    if(response){
      console.log('RETURN FUNDS: ', response);
    }else{
      console.log('ERROR: ', e);
    }
  })
}


displayBet = function(){
  rockPaperScissors.bet.call(function(e,response){
    if(response){ 
      console.log('bet_span: ', response.toNumber())
      document.getElementById('bet_amount').innerHTML = response.toNumber() / 1000000000000000000;
    }else{
      console.log(e)
    }
  })
}

displayPlayerOne = function(){
  rockPaperScissors.player1.call(function(e,response){
    if(response){ 
      console.log('display p1: ', response[0])
      document.getElementById('player_1_address').innerHTML = response[0];
    }else{
      console.log(e)
    }
  })
}

displayPlayerTwo = function(){
  rockPaperScissors.player2.call(function(e,response){
    if(response){ 
      console.log('display p2: ', response[0])
      document.getElementById('player_2_address').innerHTML = response[0];
    }else{
      console.log(e)
    }
  })
}