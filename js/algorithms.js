//Where is the best lemonade stand? Iterative algorithm backend
function bestLocation(houses, sites){
	var newSights = [];
	
	for(var i=0; i<sites.length; i++){
		var newSight = bestNeighbour(sites[i], houses);
		
		if(newSight.equals(sites[i])){
			return newSight;
		}
		
		newSights.push(newSight);
	}
	
	sites = newSights;
	return bestLocation(houses, sites);
}

function bestNeighbour(site, houses){
	neighbours = [
		site,
		new Phaser.Point(site.x,site.y+1),
		new Phaser.Point(site.x+1,site.y),
		new Phaser.Point(site.x,site.y-1),
		new Phaser.Point(site.x-1,site.y)
	];
	
	var bestScore = Number.POSITIVE_INFINITY;
	var index = 0;
	
	for(var i=0;i<neighbours.length;i++){
		var s = score(neighbours[i], houses);
		
		if(s < bestScore){
			bestScore = s;
			index = i;
		}
	}
	
	return neighbours[index];
}

function score(site, houses){
	var y = 0;
	
	for(var i=0;i<houses.length;i++){
		y += manhattanDistance(site, houses[i]);
	}
	
	return y;
}

function manhattanDistance(a,b){
	return Math.abs(a.x-b.x)+Math.abs(a.y-b.y);
}

//Where is the fake coin? Decrease and Conquer backend

function fakeCoin(coins){
	var isOdd = true;
	if(coins.length % 2 == 0){
		var isOdd = false;
	}
	
	var index = 0;
	var middle = 0;
	
	if(isOdd){
		middle = (coins.length-1)/2;
		if(weight(coins, 0, middle) < weight(coins, middle+1, coins.length)){
			//Fake coin in the right pile
			index = split(coins, middle+1, coins.length);
		}
		else{
			index = split(coins, 0, middle);
		}
	}
	else{
		middle = coins.length/2;
		if(weight(coins, 0, middle) < weight(coins, middle, coins.length)){
			//Fake coin in the right pile
			index = split(coins, middle, coins.length);
		}
		else{
			index = split(coins, 0, middle);
		}
	}
	
	if(index < 0){
		return middle;
	}
	else
		return index;
}

function split(coins, a, b){
	var length = b - a;
	var middle = a+(length/2);
	
	if(length > 2){
		if(weight(coins, a, middle) > weight(coins, middle, b)){
			return split(coins, a, middle);
		}
		else{
			return wsplit(coins, middle, b);
		}
	}
	else{
		if(coins[a] < coins[a+1])
			return a;
		else
			return -1;//Fake coin isn't here
	}
}

function isIndex(x){
	return x>-1;
}

function weight(coins, a, b){
	var y = 0;
	
	for(var i=a;i<b;i++){
		y += coins[i];
	}
	
	return y;
}

function generateCoins(size, normalWeight){
	var normalWeight = normalWeight || range(10, 20);
	
	var fakeWeight = normalWeight;
	/*while(fakeWeight == normalWeight){
		fakeWeight = range(10, 20);
	}*/
	
	fakeWeight = normalWeight + 1;
	
	var coins = [];
	for(var i=0;i<size;i++){
		coins.push(normalWeight);
	}
	
	coins.splice(range(0,size), 0, fakeWeight);
	
	return coins;
}

function range(a,b){
	return Math.floor(Math.random() * (b-a+1))+a;
}

//Which stack of coins is fake? Transform and Conquer example
function fakeStack(coins, normalWeight){
	var weight = 0;
	
	for(var i=0;i<coins.length;i++){
		weight += coins[i]*(i+1);
	}
	var count = (Math.pow(coins.length,2)+coins.length) / 2;
	
	var index = Math.abs(weight-(normalWeight*count));
	
	return index;
}