BasicApp.Lemonade = function(app){
	this.sites = [];
	this.houses = [];
	this.siteMode = true;
	this.cellSize = 50; //Side length of a grid
	this.diameter = Math.sqrt(this.cellSize);
	this.latticeRange = this.diameter+2;
	this.run = null;
	this.p = null;
	this.esc = null;
};

BasicApp.Lemonade.prototype = {
	
	create: function(){
		
		this.addKeys();
		this.addPointers();
	},
	
	render: function(){
		this.drawLattice();
	},
	
	shutdown: function(){
		
	},
	
	drawLattice: function(){
		for(var i=0;i*cellSize < app.screen.width;i++){
			var pos = cellSize * i;
			app.debug.geom(new Phaser.Line(pos, 0, pos, app.screen.height));
		}
		
		for(var i=0;i*cellSize < app.screen.height;i++){
			var pos = cellSize * i;
			app.debug.geom(new Phaser.Line(0, pos, app.screen.width, pos));
		}
	},
	
	drawIntersections: function(){
		graphics.lineStyle(2, 0xffd900);
		
		for(var i=0;i*cellSize < app.screen.width;i++){
			var xPos = cellSize * i;
			for(var j=0;j*cellSize < app.screen.height;j++){
				var yPos = cellSize * j;
				graphics.drawCircle(xPos, yPos, this.diameter);
			}
		}
	},
	
	drawSites: function(){
		graphics.beginFill(0xFF0000, 1);
		for(var i=0;i<this.sites.length;i++){
			graphics.drawCircle(sites[i].x, sites[i].y, this.diameter);
		}
	},
	
	drawHouses: function(){
		graphics.beginFill(0xFFFF00, 1);
		for(var i=0;i<this.houses.length;i++){
			graphics.drawCircle(this.houses[i].x, this.houses[i].y, this.diameter);
		}
	},
	
	findBestLocation: function(){
		var pos = bestLocation(this.houses,this.sites);
	},
	
	latticePosition: function(x, y){
		return new Phaser.Point(Math.round(x/this.cellSize)*this.cellSize, Math.round(y/this.cellSize)*this.cellSize);
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
		this.run.onDown.add(this.findBestLocation, this);
		
		this.p = app.input.keyboard.addKey(Phaser.Keyboard.P);
		this.p.onDown.add(this.menu, this);
		
		this.esc = app.input.keyboard.addKey(Phaser.Keyboard.ESC);
		this.esc.onDown.add(this.menu, this);
	},
	
	leftClick: function(){
		var x = app.input.activePointer.x;
		var y = app.input.activePointer.y;
		
		var latticePoint = this.latticePosition(x,y);
		
		if(Phaser.Point.distance(latticePoint, new Phaser.Point(x,y)) < this.latticeRange){
			if(this.siteMode){
				this.sites.push(latticePoint);
			}
			else{
				this.houses.push(latticePoint);
			}
		}
	},
	
	rightClick: function(){
		this.siteMode = !this.siteMode;
	}
};