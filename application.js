(function pollStage(){
   setTimeout(function(){
    currentStage();
    pollStage();
  }, 5000);
})();

// document.addEventListener("DOMContentLoaded", function() {
//   // var transferAddress = document.getElementById('transfer-address').value;
//   // var transferAmount = document.getElementById('transfer-amount').value;
//   // var fromAddress = document.getElementById('coinbase').innerHTML;
//   // var transferButton = document.getElementById('transfer-button');
//   displayBet();
//   });

// displayBet = function(){
//   var betSpan = document.getElementById('bet-amount');
//   betSpan.innerHTML = betValue();
// }