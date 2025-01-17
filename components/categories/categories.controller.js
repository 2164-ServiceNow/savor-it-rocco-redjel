angular.module("categories", []).controller("CategoriesController", [
  "$scope",
  "CategoryService",
  "RecipeService",
  function ($scope, CategoryService, RecipeService) {
    $scope.catMessage = "hello frome categories!!!!!!!!";
    $scope.errorMessage = "";
    $scope.selectedCategory = "";
    $scope.recipes = [];
    $scope.categories = [];
    $scope.init = function () {
      $scope.errorMessage = "";
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
    $scope.viewRecipeDetails = function(strMeal){
      console.log('View Recipe Details : ', strMeal);
      $scope.selectedRecipe = null;
      const recipePromise = RecipeService.getByName(strMeal);
      recipePromise
        .then(function(response){
          $scope.selectedRecipe = response.data.meals[0];
          console.log('prmise resule : ', $scope.selectedRecipe)
        })
        .catch(function(response){

        });
    }
    $scope.init();
  },
]);
