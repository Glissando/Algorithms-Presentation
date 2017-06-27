BasicApp.Help = function(app){
	this.xMargin = 50;
	this.yMargin = 20;
	this.instructionMargin = 15;
	this.esc = null;
	this.title = null;
	this.instructions = null;
	this.state = "";
};

BasicApp.Help.prototype = {

	init: function(state, title, instructions){
		this.state = state;
		this.title = title;
		this.instructions = this.add.group();

		var style = { font: '24pt Arial', fill: 'black', align: 'left', wordWrap: true, wordWrapWidth: 800 };
		var titleStyle = { font: '32pt Arial', fill: 'white', align: 'left', wordWrap: false };
		var instructionStyle = { font: '24pt Arial', fill: 'black', align: 'center', wordWrap: false, wordWrapWidth: 900 };

		this.title = this.add.text(this.xMargin, this.yMargin, title, titleStyle);

		for(var i=0;i<instructions.length;i++){
			this.instructions.add(this.add.text(this.xMargin, this.yMargin+(i+1)*this.instructionMargin, instructions[i], instructionStyle));
		}
	},

	create: function(){


		this.addKeys();
		this.addPointers();
	},

	render: function(){

	},

	shutdown: function(){
		this.title.destroy();
		this.title = null;

		this.instructions.destroy();
		this.instructions = null;
	},

	return: function(){
		this.state.start(this.state, false);
	},

	addPointers: function(){
		this.input.mousePointer.rightButton.onDown.add(this.rightClick,this);
		this.input.mousePointer.leftButton.onDown.add(this.leftClick,this);
	},

	addKeys: function(){
		//Reset keys
		this.input.keyboard.reset();

		this.esc = this.input.keyboard.addKey(Phaser.Keyboard.ESC);
		this.esc.onDown.add(this.return, this);
	},

	leftClick: function(){},

	rightClick: function(){}
};
