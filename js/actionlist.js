function ActionList(isblocking){
		this.actions = [];//Action list
		this.current = 0;//Currently running action
		this.ispaused = false;
		this.isblocking = isblocking || false;
		
		Object.defineProperty(this,'paused',{
			get: function(){
				return ispaused;
			},
			set: function(val){
				if(val===true){
					this.pause();
				}
				else{
					this.resume();
				}
			}
		});
	}

	ActionList.prototype = {

		isrunning: false,
		
		list: null,
		
		run: function(){
			if(this.ispaused)
				return;
			this.isrunning = true;
			this.update();
		},

		end: function(){
			this.isrunning = false;
			if(this.list){
				this.list.remove(this);
				if(this.isblocking)
					this.list.update();
			}
		},
		//Runs all actions until it reaches a block
		update: function(){
			var actions = this.actions;
			for(var i=this.current;i<actions.length;i++){
				if(actions[i].isrunning && !actions[i].isblocking)
					continue;
				else if(!actions[i].isrunning)
					actions[i].run();
				if(actions[i].isblocking){
					current = i;
					break;
				}
			}
			if(actions.length===0)
				this.end();
		},
		prepend: function(action){
			this.actions.splice(0,0,action);
			current = 0;
			action.list = this;
			return action;
		},
		append: function(action){
			this.actions.push(action);
			action.list = this;
			return action;
		},
		//Inserts an action before the current block and runs it if the list is running
		insertBefore: function(action){
			this.actions.splice(current,0,action);
			if(this.isrunning)
				action.run();
			action.list = this;
			current++;
			return action;
		},
		//Inserts an action after the current block
		insertAfter: function(action){
			this.actions.splice(current+1,0,action);
			action.list = this;
			return action;
		},
		remove: function(action){
			for(var i=0;i<actions.length;i++){
				if(this.actions[i]===action){
					this.actions.splice(i,1);
					if(i<=current && i>0){
						--current;
					}
					return action;
				}
			}
			return action;
		},
		removeAt: function(index){
			var action = this.actions[i];
			this.actions.splice(index,1);
			if(index<=current && index>0){
				--current;
			}
			return action;
		},
		removeAll: function(){
			for(var i=0;i<this.actions.length;i++){
				this.actions.end();
			}
			current = 0;
			this.actions = [];
		},
		at: function(index){
			return this.actions[index];
		},
		first: function(){
			return this.actions[0];
		},
		last: function(){
			return this.actions[actions.length-1];
		},
		block: function(){
			return this.actions[current];
		},
		size: function(){
			return this.actions.length;
		},
		pause: function(){
			this.ispaused = true;
			game.time.events.pause();
			for(var i=0;i<current+1;i++){
				this.actions[i].pause();
			}
		},
		resume: function(){
			this.ispaused = false;
			game.time.events.resume();
			for(var i=0;i<current+1;i++){
				this.actions[i].resume();
			}
		}
	};
	
	function Log(text){
		this.text = text;
	}
	
	Log.prototype = {
		list: null,
		
		isblocking: false,
		
		isrunning: false,
		
		run: function (){
			this.isrunnning = true;
			console.log(this.text);			
		},
		
		update: function(){},
		
		end: function(){
			this.list.remove(this);
			this.list.update();
		}
	}
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