function RandomSelector(){

}

RandomSelector.prototype = {
  select: function(list){
    return list[Mathf.range(0,list.length)];
  }
};

function MaxSelector(){

}

MaxSelector.prototype = {
  select: function(list){
    var best = Number.POSITIVE_INFINITY;
    for(var i=0;i<list.length;i++){
      if(best){

      }
    }
  }
};
