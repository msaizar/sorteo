define(['jquery', 'knockout', 'amplify', 'game/models/Player'], function($, ko, amplify, Player) {
    return function Game() {
    	var self = this;
    	self.playerQuantity = ko.observable(0);
        
        
    	self.players = ko.observableArray([]);
    	self.randomizedOrder = ko.observableArray([]);


    	self.selectedPlayers = ko.computed(function() {
            return ko.utils.arrayFilter(self.players(), function(item) {
    			return (item.checked() == true);
            });
    	});
        
    	self.selectedRandomizedPlayers = ko.computed(function() {
            return ko.utils.arrayFilter(self.randomizedOrder(), function(item) {
    			return (item.checked() == true);
            });
    	});
        
        if (amplify.store("sorteo_players") != undefined) {
            ko.utils.arrayForEach(JSON.parse(amplify.store("sorteo_players")), function(player) {
                self.players.push(new Player(player.name, player.checked));
            });
        }
        
        if (amplify.store("sorteo_random") != undefined) {
            ko.utils.arrayForEach(JSON.parse(amplify.store("sorteo_random")), function(player) {
                ko.utils.arrayForEach(self.players(), function(item) {
                    if (item.name() == player.name) {
                        self.randomizedOrder.push(item);  
                    }
                });
            });
        }

        self.shuffle = function(array) {
          var currentIndex = array.length
            , temporaryValue
            , randomIndex
            ;

          // While there remain elements to shuffle...
          while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
          }

          return array;
        }	
    

        self.randomize = function() {
            var jsonPlayers = ko.toJSON(self.players());
            var shuffled = self.shuffle(self.selectedPlayers());
            self.randomizedOrder(shuffled);
            var jsonRandom = ko.toJSON(self.randomizedOrder()); 
            console.log(jsonPlayers);           
            amplify.store("sorteo_players", jsonPlayers);
            amplify.store("sorteo_random", jsonRandom);
            
        }
	
    	self.addPlayer = function() {
            var player = new Player('Player ' + (self.players().length+1), true);
    		self.players.push(player);
    	}
	
    	self.removePlayer = function(player) {
    		self.players.remove(player);
    	}
	
    	self.removeAllPlayers = function() {
    		self.players([]);
    	}
        

        
		

		  
        
    }

});