(function pollStage(){
   setTimeout(function(){
    currentStage();
    pollStage();
  }, 5000);
})();
