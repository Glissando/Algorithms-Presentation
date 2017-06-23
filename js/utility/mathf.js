
function MathHelp() {

}

MathHelp.prototype = {
  mean: function(list){
    var y = 0;
    for(var i=0;i<list.length;i++){
      y += list[i];
    }

    return y / list.length;
  },

  standardDev: function(list, mean){
    var y = 0;
    for(var i=0;i<list.length;i++){
      y += Math.pow(list[i]-mean,2);
    }
    return Math.sqrt(y);
  },

  exp: function(x){
    return x * x;
  },

  logit: function(x){

  },

  range: function(a,b){
  	return Math.floor(Math.random() * (b-a+1))+a;
  },

  sum: function(n){
    return (Math.pow(n,2)+n) / 2;
  },

  distance: function (x1, y1, x2, y2) {

        var dx = x1 - x2;
        var dy = y1 - y2;

        return Math.sqrt(dx * dx + dy * dy);

  }
};

var Mathf = new MathHelp();
