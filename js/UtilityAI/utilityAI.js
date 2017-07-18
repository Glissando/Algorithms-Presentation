function Action(params){
	for(var k in params){
		this[k] = params[k];
	}

	this.scorers  = [];
}

Action.prototype = {

	score: function(x){
		var y = 0;
		for(var i=0;i<this.scorers.length;i++){
			var scorer = this.scorers[i];
			y += this.filter(scorer.score(x), scorer.filterId, scorer.filterArg);
		}
    return y;
	}
};

  isOutlier: function(s, mean, scorer){
    var dev = Mathf.standardDeviation(dev);

    if(s - mean > dev*3){
      console.log("There's an outlier score from the action " + scorer.id);
    }
  }
};



function Scorer(f, evaluator){
	this.f = f;
	this.action = null;
  this.id = null;
}

Scorer.prototype = {
	score: function(x){
		return this.f(x, this.action);
	}
};
