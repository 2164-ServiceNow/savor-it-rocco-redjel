angular
.module("search", [])
.controller(
  "SearchController", [
  "$scope",
  "RecipeService",
  "AreaService",
  function ($scope, RecipeService, AreaService) {
    $scope.searchValue = '';
    $scope.selectedArea = '';
    $scope.errorMessage = '';
    $scope.areas = [];
    $scope.foods = [];

    $scope.init = function(){
      const areasPromise = AreaService.getAreas();
      areasPromise
        .then(function(response){
          if(response.data.meals){
            $scope.areas = response.data.meals.map(function(meal){
              return meal.strArea;
            })
          }
        })
        .catch(function(response){
            $scope.errorMessage = "Failed to load areas."
        });
    };

    $scope.search = function () {
      $scope.foods = [];
      $scope.errorMessage = '';

      if(!$scope.selectedArea && !$scope.searchValue){
        $scope.errorMessage = 'Please provide a name or select an area to search';
        return;
      }

      const searchPromise = $scope.searchValue ? 
         RecipeService.getByName($scope.searchValue) :
         RecipeService.getByArea($scope.selectedArea);
      searchPromise
        .then(function (response) {
          if (response.data.meals) {
            $scope.foods = response.data.meals;
          } else {
            $scope.errorMessage = "No food found.";
          }
        })
        .catch(function () {
          $scope.result = "An error accured when trying to get data.";
        });
    };

    $scope.init();
  },
]);
