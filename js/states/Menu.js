BasicApp.Menu = function(app){
	this.lemonade = null;
	this.fakeCoin = null;
	this.fakeStack = null;
	this.background = null;
};

BasicApp.Menu.prototype = {

	create: function(){
		if(!this.lemonade){
			this.background = this.add.image(0, 0, "menuBackground");

			this.lemonade = this.add.button(151, 200, "lemonadeButton");
			this.fakeCoin = this.add.button(151, 300, "fakeCoin");
			this.fakeStack = this.add.button(151, 400, "fakeCoinButton");
		}
		else{
			this.lemonade.renderable = true;
			this.fakeCoin.renderable = true;
			this.fakeStack.renderable = true;
			this.background.renderable = true;

			this.lemonade.onInputUp.add(this.lemonadeUp, this);
			this.fakeCoin.onInput.add(this.fakeCoinUp, this);
			this.fakeStack.onInput.add(this.fakeStackUp, this);
		}
	},

	shutdown: function(){
		this.lemonade.renderable = false;
		this.fakeCoin.renderable = false;
		this.fakeStack.renderable = false;
		this.background.renderable = false;

		this.lemonade.onInputUp.removeAll();
		this.fakeCoin.onInputUp.removeAll();
		this.fakesStack.onInputUp.removeAll();

		this.lemonade.onInputDown.removeAll();
		this.fakeCoin.onInputDown.removeAll();
		this.fakeStack.onInputDown.removeAll();

		this.lemonade.onInputHover.removeAll();
		this.fakeCoin.onInputHover.removeAll();
		this.fakeStack.onInputHover.removeAll();
	},

	lemonadeUp: function(){
		this.state.start("Lemonade",false);
	},

	fakeCoin: function(){
		this.start.start("FakeCoin",false);
	},

	fakeStack: function(){
		this.state.start("FakeStack",false);
	}
};
