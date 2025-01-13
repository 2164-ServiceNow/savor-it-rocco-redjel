let savorIt = angular.module("savorIt", ["ngRoute"]);

savorIt.config([
  "$routeProvider", '$locationProvider',
  function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix("");
    $routeProvider
      // .when("/", {
      //   templateUrl: "../views/index.html",
      //   controller: "HomeController",
      // })
      .when("/search", {
        templateUrl: "../views/search.html",
        controller: "SearchController",
      })
      .when("/categories",{
        templateUrl: "../views/categories.html",
        controller: "CategoriesController"
      })
      .when("/random",{
        templateUrl: "../views/random.html",
         controller: "RandomController"
      })
      .otherwise({
        redirectTo: "/",
      });
  },
]);



savorIt.controller("HomeController", [
  "$scope",
  function ($scope) {
    $scope.message = "hello from the controller";
  },
]);

savorIt.controller("SearchController",["$scope", function($scope){

}])
savorIt.controller("CategoriesController",["$scope", function($scope){

}])
savorIt.controller("RandomController",["$scope", function($scope){

}])

