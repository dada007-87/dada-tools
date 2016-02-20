/// <reference path="../scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../scripts/typings/angularjs/angular-route.d.ts" />
/// <reference path="../scripts/typings/jquery/jquery.d.ts" />

//CONTROLLERS
/// <reference path="controllers/DateController.ts" />
/// <reference path="controllers/TestController.ts" />
/// <reference path="controllers/TestItemController.ts" />

//DIRECTIVES
/// <reference path="directives/TestDirective.ts" />

//MODELS
/// <reference path="models/ITest.ts" />

//SERVICES
/// <reference path="services/TestService.ts" />

(function () {
    // Main module
    var app: ng.IModule = angular.module("test", ["ngRoute"]);
    
    // APIs
    //app.service("TestService", TestService);
    app.constant("moment", moment);

    // Controllers
    app.controller("DateController", DateController);
    app.controller("TestController", TestController);
    app.controller("TestItemController", TestItemController);

    // Directives
    app.directive("test", TestDirective.getInstance);

    // Routing configuration
    app.config(function ($routeProvider: ng.route.IRouteProvider, $locationProvider: ng.ILocationProvider): void {
        $routeProvider
            .when("/", { templateUrl: "app/views/home.html", controller:"TestController", controllerAs:"test" })
            .when("/date", { templateUrl: "app/views/date.html", controller:"DateController", controllerAs:"date" })
            .otherwise({ templateUrl: "app/views/home.html", controller: "TestController", controllerAs: "test" });

        $locationProvider.html5Mode(false);
        
    });
    
})();