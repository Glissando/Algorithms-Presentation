BasicApp.FakeCoin = function(app){
	this.coins = [];
	this.fakeCoinIndex = 0;
	this.run = null;
	this.coinWidth;
	this.coinHeight;
};

BasicApp.FakeCoin.prototype = {
	
	create: function(){
		this.addKeys();
		this.addPointers();
	},
	
	render: function(){
		
	},
	
	shutdown: function(){
		
	},
	
	drawScale: function(){
		
	},
	
	drawCoins: function(amount, x, y){
		var w = this.coinWidth;
		var h = this.coinHeight;
		
		for(var i=0;i*2<amount;i++){
			var iPos = i+1;
			for(var j=0;j<2&&i*2+j<amount;j++){
				graphics.drawRect(x+(j+1)*w,y-iPos*h,w,h);
			}
		}
	},
	
	findfakeCoin: function(){
		
		this.coins = generateCoins(range(5,10));
		
		this.fakeCoinIndex = fakeStack(this.coins, 10, 11);
		
	},
	
	menu: function(){
		this.state.start("menu",false);
	},
	
	addPointers: function(){
		app.input.mousePointer.rightButton.onDown.add(this.rightClick,this);
		app.input.mousePointer.leftButton.onDown.add(this.leftClick,this);
	},
	
	addKeys: function(){
		//Reset keys
		app.input.keyboard.reset();
		
		this.run = app.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.run.onDown.add(this.findFakeCoin, this);		
		
		this.p = app.input.keyboard.addKey(Phaser.Keyboard.P);
		this.p.onDown.add(this.menu, this);
		
		this.esc = app.input.keyboard.addKey(Phaser.Keyboard.ESC);
		this.esc.onDown.add(this.menu, this);
	},
	
	leftClick: function(){
		var x = app.input.activePointer.x;
		var y = app.input.activePointer.y;
		
		if(this.siteMode){
			this.sites.push(this.latticePosition(x,y));
		}
		else{
			this.houses.push(this.latticePosition(x,y));
		}
	},
	
	rightClick: function(){
		this.siteMode = !this.siteMode;
	}
};