function CompositeEvaluator(){
  var evaluators = [];
}

CompositeEvaluator.prototype = {
  evaluate: function(score){
    for(var i=0;i<evaluators.length;i++){
      var eval = evaluators[i];

      score = eval.evaluate(score);
    }

    return score;
  }
};

function LinearEvaluator(c){
  var coefficient = c;
}

LinearEvaluator.prototype = {
  evaluate: function(score){
    return coefficient * score;
  }
};
