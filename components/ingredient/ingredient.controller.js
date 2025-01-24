angular.module("ingredient", []).controller("IngredientController", [
  "$scope",
  "IngredientService",
  function ($scope, IngredientService) {
    $scope.errorMessage = "";
    $scope.searchInput = "";
    $scope.ingredient = null;
    $scope.imageSrc = "";

    $scope.search = function () {
      $scope.errorMessage = "";
      $scope.ingredient = null;
      $scope.imageSrc = "";
      let ingredientsResult = [];
      IngredientService.getIngredients().then(function (response) {
        ingredients = response.data.meals;
        ingredientsResult = ingredients.filter((ingredient) =>
          ingredient.strIngredient.toLowerCase().includes($scope.searchInput.toLowerCase()) &&
          ingredient.strDescription  !== null &&  ingredient.strDescription  !== ""
        );

        if (!ingredientsResult || !ingredientsResult.length) {
          $scope.errorMessage =
            "Could not find the ingredient you searched for.";
        } else {
          let ingredient = ingredientsResult[0];
          $scope.ingredient = ingredient;
          $scope.imageSrc = IngredientService.getIngredientImageSrc(
            ingredient.strIngredient
          );
        }
      });
    };
  },
]);
