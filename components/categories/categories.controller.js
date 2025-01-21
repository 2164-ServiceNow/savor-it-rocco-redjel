angular.module("categories", []).controller("CategoriesController", [
  "$scope",
  "CategoryService",
  "RecipeService",
  function ($scope, CategoryService, RecipeService) {
    $scope.errorMessage = "";
    $scope.selectedCategory = "";
    $scope.recipes = [];
    $scope.recipeName = "";
    $scope.categories = [];
    $scope.init = function () {
      $scope.errorMessage = "";
      $scope.recipeName = "";
      const categoryPromise = CategoryService.getCategories();
      categoryPromise
        .then(function (response) {
          $scope.categories = response.data.categories;
        })
        .catch(function () {
          $scope.errorMessage = "An error accured when trying to get data.";
        });
    };
    $scope.viewMeals = function (strCategory) {
      $scope.recipes = [];
      $scope.recipeName = "";
      $scope.selectedCategory = strCategory;
      const recipesPromise = RecipeService.getByCategory(strCategory);
      recipesPromise
        .then(function (response) {
          $scope.recipes = response.data.meals;
          console.log("scope.recip.", $scope.recipes);
        })
        .catch(function () {
          $scope.errorMessage = "Error fetching the recipes for that category";
        });
    };
    $scope.viewRecipeDetails = function (strMeal) {
      $scope.recipeName = "";
      const recipePromise = RecipeService.getByName(strMeal);
      recipePromise
        .then(function (response) {
          $scope.recipeName = response.data.meals[0].strMeal;
        })
        .catch(function (response) {
          console.error("an error occured");
        });
    };

    $scope.removeSelectedCategory = function () {
      $scope.selectedCategory = "";
      $scope.recipeName = "";
    };

    $scope.removeSelectedRecipeName = function () {
      $scope.recipeName = "";
    };

    $scope.init();
  },
]);
