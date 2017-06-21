BasicApp.FakeCoin = function(app){
	this.coins = [];
	this.fakeCoinIndex = 0;
	this.run = null;
	this.coinWidth = 25;
	this.coinHeight = 10;
	this.coinPadding = 100;
	this.tooltip = null;
};

BasicApp.FakeCoin.prototype = {

	create: function(){
		if(this.tooltip){
			var style = { font: '32pt Arial', fill: 'white', align: 'left', wordWrap: false };
			this.tooltip = app.add.text(20,640, '', style);
		}
		else{
			this.tooltip.renderable = true;
		}
		this.addKeys();
		this.addPointers();
	},

	render: function(){

	},

	shutdown: function(){
		this.tooltip.renderable = false;
	},

	drawScale: function(){

	},

	draw: function(weight, amount, x, y){
			graphics.clear();

			var offsetA = 0;
			var offsetB = 0;

			if(weight==0){
				offsetA = 50;
			}
			else if(weight==1){
				offsetB = 50
			}


			this.drawScale(x+offsetA,y);

			this.drawScale(x+offsetB,y);

			this.drawCoins(amount, x, y);

			this.drawCoins(amount, x+this.coingPadding, y);

			this.tooltip.text = this.fakeCoinIndex;
	},

	drawScale: function(x, y){

			graphics.lineStyle(2, 0xFFFFFF);

			graphics.moveTo(x,y);

			graphics.lineTo(x+50,y);

			graphics.lineTo(x+25,y-50);

			graphics.lineTo(x,y);

	},

	drawCoins: function(amount, x, y){
		graphics.lineStyle(1, 0xFFFFFF);

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
