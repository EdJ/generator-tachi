var TachiHandler = require('Tachi');

var routeData = {
    routes: [{
            url: '/',
            data: {
                controller: 'DefaultController',
                action: 'index'
            }
        }
    ],
    defaultRoute: '/'
};

var settings = {
    port: 8080
};

var handler = new TachiHandler(settings, routeData);
handler.start();
