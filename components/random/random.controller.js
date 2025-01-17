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
      console.log('promise result: ', randomPromise)
      randomPromise
        .then(function (response) {
          console.log('response : ', response)
          const data = response.data.meals[0];
          console.log('data', data)
          $scope.recipeName = data.strMeal;
          console.log('random : ', $scope.recipeName);
        })
        .catch(function () {
          console.log('error eccured when trying to retrive promise')
          $scope.errorMessage = "A random recipe could not be retrieved";
        })
        .finally(function () {
          $scope.loading = false;
        });
    };
    $scope.randomSearch();
  },
]);
