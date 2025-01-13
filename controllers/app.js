let savorIt = angular.module("savorIt", ["ngRoute"]);

savorIt.config([
  "$routeProvider", '$locationProvider',
  function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix("");
    $routeProvider
      .when("/home", {
        templateUrl: "../views/home.html",
        controller: "HomeController",
      })
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
        redirectTo: "/home",
      });
  },
]);


