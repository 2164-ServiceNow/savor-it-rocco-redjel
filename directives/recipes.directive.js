angular.module("recipes", []).directive("recipes", [
  "RecipeService",
  function (RecipeService) {
    return {
      restrict: "E",
      templateUrl: "components/recipe/recipes.html",
      scope: {
        recipes: "=",
      },
      controller: function ($scope) {
        $scope.$watch("recipes", function (recipes) {
          $scope.recipes = recipes;
          $scope.recipeName = "";
        });
        $scope.viewRecipeDetails = function (strMeal) {
          $scope.recipeName = "";
          const recipePromise = RecipeService.getByName(strMeal);
          recipePromise
            .then(function (response) {
              $scope.recipeName = response.data.meals[0].strMeal;
            })
            .catch(function () {
              console.error("an error occured");
            });
        };
      },
    };
  },
]);
