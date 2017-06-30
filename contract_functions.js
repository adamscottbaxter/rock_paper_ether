
window.addEventListener('load', function(){
  if(typeof web3 === 'undefined'){
    web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io'));
    // alert('Please Download Metamask')
    //disable everything
  }else{
    
    contractAddress = '0x42127961151663294090099ec80d8e5409badd24';
    abi = [{"constant":false,"inputs":[{"name":"gameThrow","type":"bytes32"},{"name":"secret","type":"bytes32"}],"name":"playerTwoReveal","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"bet","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"returnFunds","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"determineWinner","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"player2","outputs":[{"name":"addy","type":"address"},{"name":"commitHash","type":"bytes32"},{"name":"commitTime","type":"uint256"},{"name":"gameThrow","type":"bytes32"},{"name":"revealTime","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"resetTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"gameThrow","type":"bytes32"},{"name":"secret","type":"bytes32"}],"name":"playerOneReveal","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"commitHash","type":"bytes32"}],"name":"playerOneCommit","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[{"name":"commitHash","type":"bytes32"}],"name":"playerTwoCommit","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"stage","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"player1","outputs":[{"name":"addy","type":"address"},{"name":"commitHash","type":"bytes32"},{"name":"commitTime","type":"uint256"},{"name":"gameThrow","type":"bytes32"},{"name":"revealTime","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"winner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"_player1","type":"address"},{"name":"_player2","type":"address"},{"name":"_bet","type":"uint256"}],"payable":false,"type":"constructor"}]


    rockPaperScissors = web3.eth.contract(abi).at(contractAddress);

    betValue();
    currentStage();
    getCoinbase();
    displayPlayerOne();
    displayPlayerTwo();
    displayBet();
    displayWinner();
  }
})

submitCommit1 = function(){
  var form_elements = document.getElementById('player_1_gamethrow').elements;
  var selectedThrow = form_elements['p_1_radio'].value;
  var t =  THROWS[selectedThrow];
  var s =  createSecret(document.getElementById('player_1_secret').value);
  if(t){
    var p1Commit = keccak_256(Buffer.concat([t,s]))
    rockPaperScissors.playerOneCommit('0x'+p1Commit , {from: coinbase, value:"1000000000000000"}, function(e,response){
      console.log(e,response);                                                   
    })
  }
}

submitCommit2 = function(){
  var form_elements = document.getElementById('player_2_gamethrow').elements;
  var selectedThrow = form_elements['p_2_radio'].value;
  var t =  THROWS[selectedThrow];
  var s =  createSecret(document.getElementById('player_2_secret').value);
  if(t){
    var p2Commit = keccak_256(Buffer.concat([t,s]))
    rockPaperScissors.playerTwoCommit('0x'+p2Commit , {from: coinbase, value:"1000000000000000"}, function(e,response){
      console.log(e,response);                                                   
    })
  }
}

submitReveal1 = function(){
  var form_elements = document.getElementById('player_1__reveal_gamethrow').elements;
  var selectedThrow = form_elements['p_1_reveal_radio'].value;
  var t =  STRING_THROWS[selectedThrow];
  var s =  '0x'+keccak_256(document.getElementById('player_1_reveal_secret').value);
  var ks = keccak_256(s);

  if(t){
    rockPaperScissors.playerOneReveal.sendTransaction(t,s, {from: coinbase}, function(e,r){
      console.log("playerOneReveal: ", e,r);
    })
  }
}

submitReveal2 = function(){
  var form_elements = document.getElementById('player_2__reveal_gamethrow').elements;
  var selectedThrow = form_elements['p_2_reveal_radio'].value;
  var t =  STRING_THROWS[selectedThrow];
  var s =  '0x'+keccak_256(document.getElementById('player_2_reveal_secret').value);
  var ks = keccak_256(s);

  if(t){
    rockPaperScissors.playerTwoReveal.sendTransaction(t,s, {from: coinbase}, function(e,r){
      console.log("playerTwoReveal: ", e,r);
    })
  }
}

createCommitHash = function(t,s){
  return keccak_256(Buffer.concat([t,s]));
}

createSecret = function(inputString){
  var secretHash = keccak_256(inputString);
  return new Buffer(secretHash,"hex")
}

STRING_THROWS = {
  "rock": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "paper": "0x0000000000000000000000000000000000000000000000000000000000000001",
  "scissors": "0x0000000000000000000000000000000000000000000000000000000000000002"
}

THROWS = {
  "rock": new Buffer("0000000000000000000000000000000000000000000000000000000000000000","hex"),
  "paper": new Buffer("0000000000000000000000000000000000000000000000000000000000000001","hex"),
  "scissors": new Buffer("0000000000000000000000000000000000000000000000000000000000000002","hex")
}

coinbase = "";

getCoinbase = function(){
  web3.eth.getAccounts(function(e, accounts){
      if(accounts && accounts.length > 0){
        coinbase = accounts[0];
      }else{
        alert("Please open metamask")
      }
    })
}

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
        if(stageValue > 0){
          var previousStageDiv = document.querySelectorAll("[data-stage-display='" + (stageValue - 1) + "']")[0];
          previousStageDiv.classList.add('hidden');
        }
        currentStageDiv.classList.remove('hidden');
    }else{
      console.log('ERROR: ', e)
    }
  })
}

displayWinner = function(){
  rockPaperScissors.winner.call(function(e, response){
    if(response){
      document.getElementById('winner_address').innerHTML = response;
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
      return response;
    }else{
      console.log('ERROR: ', e)
    }
  })
}

playerTwoInfo = function(){
  rockPaperScissors.player2.call(function(e, response){
    if(response){
      return response;
    }else{
      console.log('ERROR: ', e);
    }
  })
}


playerOneCommit = function(){
  var playerOneCommitHash = document.getElementById('player_1_commit').value;

  rockPaperScissors.playerOneCommit.sendTransaction(playerOneCommitHash, {from: coinbase, value: "10000000000000000"}, function(e, response){
    if(response){
      console.log('PLAYER_1 COMMIT: ', response);
    }else{
      console.log('ERROR: ', e);
    }
  })
}

playerTwoCommit = function(){
  var playerTwoCommitHash = document.getElementById('player_2_commit').value;

  rockPaperScissors.playerTwoCommit.sendTransaction(playerTwoCommitHash, {from: coinbase, value: "10000000000000000"}, function(e, response){
    if(response){
      console.log('PLAYER_2 COMMIT: ', response);
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
