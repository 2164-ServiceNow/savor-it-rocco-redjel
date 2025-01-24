angular.module("recipe", []).directive("recipe", [
  "RecipeService",
  "IngredientService",
  function (RecipeService, IngredientService) {
    return {
      restrict: "E",
      templateUrl: "components/recipe/recipe.html",
      scope: {
        recipeName: "=",
      },
      controller: function ($scope) {
        $scope.recipe = null;
        $scope.ingredients = [];
        $scope.errorMessage = "";

        $scope.$watch("recipeName", function (newRecipeName) {
          if (newRecipeName) {
            RecipeService.getByName(newRecipeName)
              .then(function (response) {
                const recipe = response.data.meals[0];
                $scope.recipe = recipe;
                $scope.ingredients =
                  IngredientService.getRecipeIngredientsWithMeasures(recipe);
              })
              .catch(function () {
                $scope.errorMessage = "A recipe could not be retrieved";
              });
          }
        });
      },
    };
  },
]);
