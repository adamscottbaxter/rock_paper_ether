(function pollStage(){
   setTimeout(function(){
    currentStage();
    pollStage();
  }, 5000);
   
  showHidden = function(){
    var allDivs = document.querySelectorAll("[data-stage-display]")
    for (var i = allDivs.length - 1; i >= 0; i--) {
      allDivs[i].classList.remove('hidden');
    }
  }
})();
