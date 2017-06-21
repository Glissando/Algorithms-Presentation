BasicApp.Lemonade = function(app){
	this.sites = [];
	this.houses = [];
	this.siteMode = true;
	this.cellSize = 30; //Side length of a grid
	this.diameter = Math.sqrt(this.cellSize);
	this.latticeRange = this.diameter+2;
	this.run = null;
	this.p = null;
	this.esc = null;

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

		this.addKeys();
		this.addPointers();
	},

	update: function(){
			var pos = this.latticePosition(this.input.activePointer.x, this.input.activePointer.y);
			this.tooltip.setText("x: " + pos.x + " y: " + pos.y);

			graphics.width = this.width;
			graphics.height = this.height;
	},

	render: function(){
		this.draw();
	},

	shutdown: function(){
		this.tooltip.renderable = false;
	},

	draw: function(houses, sites){
		console.log("drawed");
		graphics.clear();
		this.drawLattice();
		this.drawIntersections();
		this.drawLocations();
	},

	drawLattice: function(){
		graphics.lineStyle(2, 0xffffff, 1);

		for(var i=0;i*this.cellSize < this.width;i++){
			var pos = this.cellSize * i;
			graphics.moveTo(pos, 0);
			graphics.lineTo(pos, this.height);
		}

		for(var i=0;i*this.cellSize < this.height;i++){
			var pos = this.cellSize * i;
			graphics.moveTo(0, pos);
			graphics.lineTo(this.width, pos);
		}
	},

	drawIntersections: function(){
		graphics.lineStyle(2, 0xffd900);

		for(var i=0;i*this.cellSize < this.width;i++){
			var xPos = this.cellSize * i;
			for(var j=0;j*this.cellSize < this.height;j++){
				var yPos = this.cellSize * j;
				graphics.drawCircle(xPos, yPos, this.diameter);
			}
		}
	},

	drawLocations: function(houses, sites){
		//Draw sites
		for(var i=0;i<this.sites.length;i++){
			if(this.isHouseOverlap(this.sites[i])){
				graphics.beginFill(0xff0000);
				graphics.drawCircle(this.sites[i].x, this.sites[i].y, this.diameter-1);
			}
			else{
				graphics.beginFill(0x00FF00);
				graphics.drawCircle(this.sites[i].x, this.sites[i].y, this.diameter-1);
			}
		}

		//Draw houses
		for(var i=0;i<this.houses.length;i++){
			if(!this.isSiteOverlap(this.houses[i])){
				graphics.beginFill(0x0000FF);
				graphics.drawCircle(this.sites[i].x, this.sites[i].y)
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
				this.houses.splice(i,1);
				return true;
			}
		}

		return false;
	},

	removeSite: function(pos){
		for(var i=0;i<this.sites.length;i++){
			if(pos.equals(this.sites[i])){
				this.sites.splice(i,1);
				return true;
			}
		}

		return false;
	},

	findBestLocation: function(){
		var pos = bestLocation(this.houses,this.sites);
	},

	latticePosition: function(x, y){
		return new Phaser.Point(Math.round(x/this.cellSize), Math.round(y/this.cellSize));
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
		this.run.onDown.add(this.findBestLocation, this);

		this.p = this.input.keyboard.addKey(Phaser.Keyboard.P);
		this.p.onDown.add(this.menu, this);

		this.esc = this.input.keyboard.addKey(Phaser.Keyboard.ESC);
		this.esc.onDown.add(this.menu, this);
	},

	leftClick: function(){
		var x = this.input.activePointer.x;
		var y = this.input.activePointer.y;

		var latticePoint = this.latticePosition(x,y);

		if(Phaser.Point.distance(latticePoint, new Phaser.Point(x/this.cellSize,y/this.cellSize)) < this.latticeRange){
			if(this.siteMode){

				if(!this.removeSite(latticePoint)){
					this.sites.push(latticePoint);
				}
			}
			else{
				if(!this.removeHouse(latticePoint)){
					this.houses.push(latticePoint);
				}
			}
		}
	},

	rightClick: function(){
		this.siteMode = !this.siteMode;
	}
};
