/// <reference path="../typings/tsd.d.ts" />

//CONTROLLERS
/// <reference path="controllers/DateController.ts" />
/// <reference path="controllers/PageController.ts" />
/// <reference path="controllers/HomeController.ts" />

//DIRECTIVES

//FILTERS
/// <reference path="filters/MomentFilter.ts" />

//MODELS
/// <reference path="models/ITest.ts" />

//SERVICES
/// <reference path="services/PageService.ts" />

(function () {
    // Main module
    var app: ng.IModule = angular.module("test", ["ngRoute"]);

    // Libraries
    app.constant("moment", moment);

    // Services
    //app.service("TestService", TestService);
    app.service("PageService", PageService);


    // Controllers
    app.controller("DateController", DateController);
    app.controller("PageController", PageController);
    app.controller("HomeController", HomeController);

    // Directives
    //app.directive("test", TestDirective.getInstance);

    // Filters
    app.filter("moment", MomentFilter.getInstance);

    // Routing configuration
    app.config(function ($routeProvider: ng.route.IRouteProvider, $locationProvider: ng.ILocationProvider): void {
        $routeProvider
            .when("/", { templateUrl: "app/views/home.html", controller:"HomeController", controllerAs:"home" })
            .when("/date", { templateUrl: "app/views/date.html", controller:"DateController", controllerAs:"date" })
            .otherwise({ templateUrl: "app/views/home.html", controller: "HomeController", controllerAs: "home" });

        $locationProvider.html5Mode(true);
        
    });
    
})();