angular.module('savorIt', [
  'ngRoute',
  'service',
  'recipe',
  'home',
  'search',
  'categories',
  'random'
]).config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when("/home", {
        templateUrl: "./components/home/home.html",
        controller: "HomeController",
      })
      .when("/search", {
        templateUrl: "./components/search/search.html",
        controller: "SearchController",
      })
      .when("/categories",{
        templateUrl: "./components/categories/categories.html",
        controller: "CategoriesController"
      })
      .when("/random",{
        templateUrl: "./components/random/random.html",
         controller: "RandomController"
      })
      .otherwise({
        redirectTo: "/home",
      });
      
    $locationProvider.hashPrefix("");
    $locationProvider.html5Mode({
      enabled:true,
      requireBase:true
    })
  })
  .directive('myHeader', function(){
    return{
      restrict: 'E',
      templateUrl:'./shared/myHeader.html'
    }
  })
  .directive('myFooter', function(){
    return{
      restrict: 'E',
      templateUrl:'./shared/myFooter.html'
    }
  });


