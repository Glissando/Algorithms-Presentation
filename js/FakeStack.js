BasicApp.FakeStack = function(app){
	this.coins = [];
	this.fakeStackIndex = 0;
	this.run = null;
	this.coinWidth = 20;
	this.coinHeight = 15;
	this.coinPadding = 20;
};

BasicApp.FakeStack.prototype = {

	create: function(){

		this.addKeys();
		this.addPointers();
	},

	render: function(){

	},

	shutdown: function(){

	},

	draw: function(coins, amount, x, y){
			graphics.clear();

			for(var i=0;i<amount;i++){
				this.drawCoins(coins.length, i, x+i*(this.coinPadding+this.coinWidth), y);
			}
	},

	drawStack: function(stackSize, index, x, y){
		for(var i=0;i<index;i++){
			graphics.drawRect(x, y+(i+1)*this.coinHeight, this.coinWidth, this.coinHeight);
		}

		y+=index*this.coinHeight+100;

		for(var i=index;i<stackSize;i++){
			graphics.drawRect(x, y+(i+1)*this.coinHeight, this.coinWidth, this.coinHeight);
		}
	},

	findfakeStack: function(){

		this.coins = generateCoins(range(5,10));

		this.fakeStackIndex = fakeCoin(this.coins);


	},

	menu: function(){
		this.state.start("menu",false);
	},

	addPointers: function(){
		this.input.mousePointer.rightButton.onDown.add(this.rightClick,this);
		this.input.mousePointer.leftButton.onDown.add(this.leftClick,this);
	},

	addKeys: function(){
		//Reset keys
		this.input.keyboard.reset();

		this.run = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.run.onDown.add(this.findFakeCoin, this);

		this.p = this.input.keyboard.addKey(Phaser.Keyboard.P);
		this.p.onDown.add(this.menu, this);

		this.esc = this.input.keyboard.addKey(Phaser.Keyboard.ESC);
		this.esc.onDown.add(this.menu, this);
	},

	leftClick: function(){},

	rightClick: function(){}
};
