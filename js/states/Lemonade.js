BasicApp.Lemonade = function(app){
	this.sites = [];
	this.houses = [];
	this.siteMode = true;
	this.cellSize = 30; //Side length of a grid
	this.diameter = Math.sqrt(this.cellSize)+12;
	this.latticeRange = this.diameter+2;
	this.run = null;
	this.p = null;
	this.e = null;
	this.r = null;
	this.esc = null;

	this.bmd = null;
	this.tooltip = null;
};

BasicApp.Lemonade.prototype = {

	create: function(){
		if(!this.tooltip){
			var style = { font: '32pt Arial', fill: 'white', align: 'left', wordWrap: false };
			this.tooltip = this.add.text(20, 30, '', style);
		}
		else{
			this.tooltip = renderable = true;
		}

		this.draw(this.houses, this.sites);

		this.addKeys();
		this.addPointers();
	},

	update: function(){
			var pos = this.latticePosition(this.input.activePointer.x, this.input.activePointer.y);
			this.tooltip.setText("x: " + pos.x + " y: " + pos.y);
			graphics.width = this.game.width;
			graphics.height = this.game.height;
	},

	render: function(){
		//this.draw(this.houses, this.sites);
	},

	shutdown: function(){
		this.tooltip.renderable = false;
	},

	draw: function(houses, sites){
		Logger.time("Draw screen time");
		graphics.clear();
		this.drawLattice();
		//this.drawIntersections();
		this.drawLocations();
		Logger.timeEnd("Draw screen time");
	},

	drawLattice: function(){
		graphics.lineStyle(2, 0xffffff, 1);

		for(var i=0;i*this.cellSize < this.game.width;i++){
			var pos = this.cellSize * i;
			graphics.beginFill(0xffffff);
			graphics.lineStyle(2, 0xffffff, 1);
			graphics.moveTo(pos, 0);
			graphics.lineTo(pos, this.game.height);
			//var line = new Phaser.Line(pos, 0, pos, this.game.height);
			//graphics.drawShape(line);
			//graphics.drawPolygon([pos,0,pos,this.game.height]);
			graphics.endFill();
		}

		for(var i=0;i*this.cellSize < this.game.height;i++){
			var pos = this.cellSize * i;
			graphics.beginFill(0xffffff);
			graphics.lineStyle(2, 0xffffff, 1);
			graphics.moveTo(0, pos);
			graphics.lineTo(this.game.width, pos);
			//var line = new Phaser.Line(0, pos, this.game.width, pos);
			//graphics.drawShape(line);
			//graphics.drawPolygon([0,pos,this.game.width,pos]);
			graphics.endFill();
		}
	},

	drawIntersections: function(){


		for(var i=0;i*this.cellSize < this.game.width;i++){
			var xPos = this.cellSize * i;
			for(var j=0;j*this.cellSize < this.game.height;j++){
				var yPos = this.cellSize * j;
				graphics.lineStyle(2, 0xffd900);
				graphics.drawCircle(xPos, yPos, this.diameter);
				graphics.endFill();
			}
		}
	},

	drawLocations: function(houses, sites){
		//Draw sites
		for(var i=0;i<this.sites.length;i++){
			if(this.isHouseOverlap(this.sites[i])){
				graphics.beginFill(0xff0000);
				graphics.drawCircle(this.sites[i].x*this.cellSize, this.sites[i].y*this.cellSize, this.diameter);
				graphics.endFill();
			}
			else{
				graphics.beginFill(0x00ff00);
				graphics.drawCircle(this.sites[i].x*this.cellSize, this.sites[i].y*this.cellSize, this.diameter);
				graphics.endFill();
			}
		}

		//Draw houses
		for(var i=0;i<this.houses.length;i++){
			Logger.debug("IsSiteOverlap: "+!this.isSiteOverlap(this.houses[i]));
			if(!this.isSiteOverlap(this.houses[i])){
				graphics.beginFill(0x0000ff);
				graphics.drawCircle(this.houses[i].x*this.cellSize, this.houses[i].y*this.cellSize, this.diameter);
				graphics.endFill();
			}
		}
	},

	isHouseOverlap: function(pos){
		for(var i=0;i<this.houses.length;i++){
			if(pos.equals(this.houses[i])){
				return true;
			}
		}

		return false;
	},

	isSiteOverlap: function(pos){
		for(var i=0;i<this.sites.length;i++){
			if(pos.equals(this.sites[i])){
				return true;
			}
		}

		return false;
	},

	removeHouse: function(pos){
		for(var i=0;i<this.houses.length;i++){
			if(pos.equals(this.houses[i])){
				Logger.debug("Removed house at point " + pos);
				this.houses.splice(i,1);
				return true;
			}
		}

		return false;
	},

	removeSite: function(pos){
		for(var i=0;i<this.sites.length;i++){
			if(pos.equals(this.sites[i])){
				Logger.debug("Removed site at point" + pos);
				this.sites.splice(i,1);
				return true;
			}
		}

		return false;
	},

	findBestLocation: function(){
		Logger.time("Iterative algorithm time");
		var pos = bestLocation(this.houses,this.sites);

		this.sites = [pos];
		Logger.endTime("Iterative algorithm time");
	},

	randomBoard: function(){
			this.resetBoard();

			while(this.sites.length < 5){
				var pos = new Phaser.Point(Mathf.range(1,40), Mathf.range(1,20));

				if(!this.isSiteOverlap(pos)){
					this.sites.push(pos);
				}
			}

			while(this.houses.length < 5){
				var pos = new Phaser.Point(Mathf.range(1,40), Mathf.range(1,20));

				if(!this.isHouseOverlap(pos)){
					this.houses.push(pos);
				}
			}

			Logger.Debug("Sites generated at " + this.sites);
			Logger.Debug("Houses generated at " + this.houses);
	},

	resetBoard: function(){
			this.houses = [];
			this.sites = [];
	},

	latticePosition: function(x, y){
		return new Phaser.Point(Math.round(x/this.cellSize), Math.round(y/this.cellSize));
	},

	menu: function(){
		Logger.debug("Switching to menu state");
		this.state.start("Menu", false);
	},

	help: function(){
		Logger.debug("Switching to help state");
		this.state.start("Help", false, true, "lemonade", "Lemonade Stand",
	[
		"Green points represent sites, blue points represent a house, red points represent an overlap of potential site locations and a house",
		"",
		" Controls ",
		"E: Generate random points",
		"R: Clear the board",
		"Spacebar: Find the best location",
	]);
	},

	addPointers: function(){
		this.input.mousePointer.rightButton.onDown.add(this.rightClick, this);

		this.input.mousePointer.leftButton.onDown.add(this.leftClick, this, 10);
		this.input.mousePointer.leftButton.onDown.add(this.draw, this, 0, this.houses, this.sites);
	},

	addKeys: function(){
		//Reset keys
		this.input.keyboard.reset();

		this.run = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.run.onDown.add(this.findBestLocation, this, 10);
		this.run.onDown.add(this.draw, this, 0, this.houses, this.sites);

		this.p = this.input.keyboard.addKey(Phaser.Keyboard.P);
		this.p.onDown.add(this.menu, this);

		this.e = this.input.keyboard.addKey(Phaser.Keyboard.E);
		this.e.onDown.add(this.randomBoard, this, 10);
		this.e.onDown.add(this.draw, this, 0, this.houses, this.sites);

		this.r = this.input.keyboard.addKey(Phaser.Keyboard.R);
		this.r.onDown.add(this.resetBoard, this, 10);
		this.r.onDown.add(this.draw, this, 0, this.houses, this.sites);

		this.esc = this.input.keyboard.addKey(Phaser.Keyboard.ESC);
		this.esc.onDown.add(this.menu, this);
	},

	leftClick: function(){
		var x = this.input.activePointer.x;
		var y = this.input.activePointer.y;

		var latticePoint = this.latticePosition(x,y);

		if(Mathf.distance(latticePoint.x, latticePoint.y, x/this.cellSize, y/this.cellSize) < this.latticeRange){
			if(this.siteMode){

				if(!this.removeSite(latticePoint)){
					this.sites.push(latticePoint);
					Logger.debug("Site added at point " + latticePoint);
				}
			}
			else{
				if(!this.removeHouse(latticePoint)){
					this.houses.push(latticePoint);
					Logger.debug("House added at point " + latticePoint);
				}
			}
		}

		Logger.debug("sites" + this.sites);
		Logger.debug("houses" + this.houses);
	},

	rightClick: function(){
		this.siteMode = !this.siteMode;
		Logger.debug(this.siteMode);
	}
};
