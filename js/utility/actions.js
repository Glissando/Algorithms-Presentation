function Sync(){
  this.timer = null;
}

Sync.prototype = {
  list: null,

  isblocking: true,

  isrunning: false,

  run: function(){
    this.isrunning = true;
    this.timer = game.time.events.loop(PHASER.Timer.QUARTER,this.update,this);
  },

  update: function(){
    if(this.list.first()===this){
      this.end();
    }
  },

  end: function(){
    game.time.events.remove(timer);
    this.timer = null;
    this.list.remove(this);
    this.list.update();
  },

  pause: function(){},

  resume: function(){}
};

function Delay(l){
  this.timer = null;
  this.length = l;
}

Delay.prototype = {
  list: null,

  isblocking: true,

  isrunning: false,

  run: function(){
    this.isrunning = true;
    this.timer = game.time.events.add(this.length,this.end,this);
  },
  end: function(){
    this.list.remove(this);
    game.time.events.remove(this.timer);
    this.timer = null;
    this.list.update();
  },
  pause: function(){},
  resume: function(){}
};

  function Callback(f,ctx){
  this.func = f;
  this.context = ctx;
}

Callback.prototype = {
  list: null,

  isrunning: false,

  isblocking: false,

  run: function(){
    this.isrunning = true;
    this.func.call(this.context);
    this.end();
  },

  end: function(){
    this.list.remove(this);
    if(this.isblocking)
      this.list.update();
  },

  pause: function(){},

  resume: function(){}
};
