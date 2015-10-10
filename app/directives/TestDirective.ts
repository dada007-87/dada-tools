class TestDirective implements ng.IDirective {
    public static getInstance(): any {
        return {
            restrict: "AE",
            replace: true,
            scope: true,
            bindToController: {
                item: "=testItem",
            },
            controller: "TestItemController",
            controllerAs: "testItem",
            templateUrl: "app/templates/test/test-item.html",
            link: function ($scope, $elem, $attrs, cd) {
                console.log("Test Directive");
            }
        };
    }
}