define(['knockout'], function(ko) {

    return function Player(name, checked) {
    	var self = this;
    	self.name = ko.observable(name);
	    self.checked = ko.observable(checked);	
    }
});

		
	