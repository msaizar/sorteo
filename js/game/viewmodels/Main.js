define(['knockout', 'game/models/Game'], function(ko, Game) {
    return function MainViewModel() {
    	var self = this;
    	self.game = new Game();
        	
    	self.playersSelected = function() {
    		self.game.randomize();
    	}
        
        self.removePlayer = function(data) {
            self.game.removePlayer(data);
        }
        
        self.addPlayer = function() {
            self.game.addPlayer();
        }
	

	
        
        
	
    }
});
