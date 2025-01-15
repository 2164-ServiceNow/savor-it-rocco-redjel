angular.module("random", []).controller("RandomController", [
  "$scope",
  "RandomService",
  function ($scope, RandomService) {
    $scope.errorMessage = "";
    $scope.recipe = null;
    $scope.ingredients = [];
    $scope.loading = false;
    $scope.randomSearch = function () {
      $scope.loading = true;
      $scope.errorMessage = "";
      $scope.recipe = null;
      $scope.ingredients = [];
      const randomPromise = RandomService.searchRandom();
      randomPromise
        .then(function (response) {
          const data = response.data.meals[0];
          $scope.recipe = data;
          $scope.ingredients = [];
          for (let i = 1; i < 20; i++) {
            let ingredientPropName = `strIngredient${i}`;
            let measurePropName = `strMeasure${i}`;
            let ingredient = data[ingredientPropName];
            let measure = data[measurePropName];
            if (ingredient && ingredient.trim() !== "") {
              let instructionString = `${measure} ${ingredient}`.trim();
              $scope.ingredients.push(instructionString);
            }
          }
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
