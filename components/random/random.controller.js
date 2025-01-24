angular.module("random", []).controller("RandomController", [
  "$scope",
  "RecipeService",
  function ($scope, RecipeService) {
    $scope.errorMessage = "";
    $scope.loading = false;
    $scope.recipeName = "";
    $scope.randomSearch = function () {
      $scope.loading = true;
      $scope.errorMessage = "";
      const randomPromise = RecipeService.getRandom();
      randomPromise
        .then(function (response) {
          const data = response.data.meals[0];
          $scope.recipeName = data.strMeal;
        })
        .catch(function () {
          $scope.errorMessage = "A random recipe could not be retrieved";
        })
        .finally(function () {
          $scope.loading = false;
        });
    };
    $scope.randomSearch();
  },
]);
