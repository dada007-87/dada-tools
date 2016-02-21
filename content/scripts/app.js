var DateController = (function () {
    function DateController($scope, moment, PageService) {
        var _this = this;
        this.$scope = $scope;
        this.moment = moment;
        this.PageService = PageService;
        this.defaultFormat = "DD/MM/YYYY";
        this.unitOptions = [
            { "label": "millisecondi", "value": "milliseconds" },
            { "label": "secondi", "value": "seconds" },
            { "label": "minuti", "value": "minutes" },
            { "label": "ore", "value": "hours" },
            { "label": "giorni", "value": "days" },
            { "label": "settimane", "value": "weeks" },
            { "label": "mesi", "value": "months" },
            { "label": "anni", "value": "years" }
        ];
        this.defaultUnit = { "label": "giorni", "value": "days" };
        this.from = new Date();
        this.to = new Date();
        this.unitDifference = this.defaultUnit;
        this.initialDate = new Date();
        this.addend = 0;
        this.unitAddend = this.defaultUnit;
        this.init = function () {
            var date = _this;
            date.$scope.$watch("date.from", function (value) {
                date.calculateDifferenceBetweenDates();
            });
            date.$scope.$watch("date.to", function (value) {
                date.calculateDifferenceBetweenDates();
            });
            date.$scope.$watch("date.unitDifference", function (value) {
                date.calculateDifferenceBetweenDates();
            });
            date.$scope.$watch("date.initialDate", function (value) {
                date.calculateAddToDate();
            });
            date.$scope.$watch("date.addend", function (value) {
                date.calculateAddToDate();
            });
            date.$scope.$watch("date.unitAddend", function (value) {
                date.calculateAddToDate();
            });
        };
        this.calculateDifferenceBetweenDates = function () {
            _this.from = typeof _this.from != "undefined" && _this.from != null ? _this.from : new Date();
            _this.to = typeof _this.to != "undefined" && _this.to != null ? _this.to : new Date();
            _this.unitDifference = typeof _this.unitDifference != "undefined" && _this.unitDifference != null ? _this.unitDifference : _this.defaultUnit;
            var from = _this.moment(_this.from);
            var to = _this.moment(_this.to);
            _this.differenceBetweenDates = _this.moment(to).diff(from, _this.unitDifference.value);
        };
        this.calculateAddToDate = function () {
            _this.initialDate = typeof _this.initialDate != "undefined" && _this.initialDate != null ? _this.initialDate : new Date();
            _this.addend = typeof _this.addend != "undefined" && _this.addend != null ? _this.addend : 0;
            _this.unitAddend = typeof _this.unitAddend != "undefined" && _this.unitAddend != null ? _this.unitAddend : _this.defaultUnit;
            var initialDate = _this.moment(_this.initialDate).hours(0).minutes(0).seconds(0).milliseconds(0);
            var addend = _this.addend;
            var finalDate = initialDate.add(addend, _this.unitAddend.value);
            _this.finalDate = finalDate.toDate();
        };
        console.log("DateController");
        this.PageService.setTitle("Date");
        this.init();
    }
    return DateController;
})();
var PageController = (function () {
    function PageController(PageService) {
        this.PageService = PageService;
        console.log("PageController");
        this.service = this.PageService;
    }
    return PageController;
})();
var HomeController = (function () {
    function HomeController(PageService) {
        this.PageService = PageService;
        console.log("HomeController");
        this.PageService.title = "Home";
    }
    return HomeController;
})();
var MomentFilter = (function () {
    function MomentFilter() {
    }
    MomentFilter.getInstance = function (moment) {
        return function (dateString, format) {
            moment.locale('it');
            return moment(dateString).format(format);
        };
    };
    return MomentFilter;
})();
var PageService = (function () {
    function PageService() {
        var _this = this;
        this.setTitle = function (newTitle) {
            _this.title = newTitle;
        };
    }
    return PageService;
})();
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
    var app = angular.module("test", ["ngRoute"]);
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
    app.config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when("/", { templateUrl: "app/views/home.html", controller: "HomeController", controllerAs: "home" })
            .when("/date", { templateUrl: "app/views/date.html", controller: "DateController", controllerAs: "date" })
            .otherwise({ templateUrl: "app/views/home.html", controller: "HomeController", controllerAs: "home" });
        $locationProvider.html5Mode(false);
    });
})();
