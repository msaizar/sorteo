requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js/core',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        game: '../game',
    },
    shim: {
        'hashchange': {
            deps: ['jquery'],
            exports: 'jQuery.fn.hashchange.'
        },
        "amplify": {
            deps: ["jquery"],
            exports: "amplify"
        }
    },
});

requirejs(['knockout', 'pager', 'game/viewmodels/Main'],
function   (ko, pager, MainViewModel) {
    //jQuery, canvas and the app/sub module are all
    //loaded and can be used here now.

    pager.Href.hash = '#!/';    
   	var MainViewModelObject = new MainViewModel();
    pager.extendWithPage(MainViewModelObject);
   	ko.applyBindings(MainViewModelObject)
    pager.start();

});
