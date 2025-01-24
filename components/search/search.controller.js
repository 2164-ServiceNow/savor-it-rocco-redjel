angular.module("search", []).controller("SearchController", [
  "$scope",
  "RecipeService",
  "AreaService",
  "IngredientService",
  function ($scope, RecipeService, AreaService, IngredientService) {
    $scope.nameValue = "";
    $scope.ingredientValue = "";
    $scope.selectedArea = "";
    $scope.errorMessage = "";
    $scope.areas = [];
    $scope.recipes = [];

    $scope.init = function () {
      const areasPromise = AreaService.getAreas();
      areasPromise
        .then(function (response) {
          if (response.data.meals) {
            $scope.areas = response.data.meals.map(function (meal) {
              return meal.strArea;
            });
          }
        })
        .catch(function () {
          $scope.errorMessage = "Failed to load areas.";
        });
    };

    $scope.search = function () {
      $scope.recipes = [];
      $scope.errorMessage = "";

      if (!$scope.selectedArea && !$scope.nameValue && !$scope.ingredientValue) {
        $scope.errorMessage =
          "Please provide a name, ingredient or select an area to search";
        return;
      }

      getSearchResult($scope.nameValue, $scope.ingredientValue, $scope.selectedArea)
        .then(function(response){
          let recipes = response.data.meals;
          if(!recipes || !recipes.length){
            $scope.errorMessage = "No Recipes Found";
            return;
          }
          return getRecipes(recipes)
            .then(function(fullDetailedRecipes){
              let filteredRecipes = filterRecipes(
                fullDetailedRecipes
                  .filter(fullDetailedRecipe => 
                    fullDetailedRecipe !== null),
                  $scope.nameValue,
                  $scope.ingredientValue,
                  $scope.selectedArea
              )
              if(!filteredRecipes || !filteredRecipes.length){
                $scope.errorMessage = "No Recipes Found";
              }else{
                $scope.recipes = filteredRecipes;
              }
            })
            .catch(function(){
              $scope.errorMessage = "An error occured when searching for recipes."
            })
        })
        .catch(function(){
          $scope.errorMessage = "An error occured when searching for recipes.";
        })
    };

    let getSearchResult = function (name, ingredient, area){
      return name ? 
              name.length == 1 ? 
                RecipeService.getByFirstLetter(name) : 
                RecipeService.getByName(name) : 
              area ?
                RecipeService.getByArea(area) : 
                RecipeService.getByIngredient(ingredient);
    }

    function getRecipes(recipes){     
      return Promise.all(
        recipes.map(recipe =>
          getRecipeAllDetails(recipe.strMeal)
            .then(function(detailedRecipe){
              return detailedRecipe;
            })
            .catch(function(){
              return null;
            })
        )
      );
    }

    function getRecipeAllDetails(recipeName){
      return RecipeService.getByName(recipeName)
      .then(function(response){
        return response.data.meals[0]; 
      })
      .catch(function(){
        return null;
      })
    }

    function filterRecipes(recipes, name, ingredient, area){
      if (!recipes) return null;
      let filteredByNameRecipes = filterRecipesByName(recipes, name);
      let filteredByIngredientRecipes = filterRecipesByIngredient(filteredByNameRecipes, ingredient);
      let filteredByAreaRecipes = filterRecipesByArea(filteredByIngredientRecipes, area);
      return filteredByAreaRecipes;
    }

    let filterRecipesByName = function(recipes, name){
      if(!recipes) return  null;
      if(!name) return recipes;
      let results = [];
      for(let recipe of recipes){
        if(recipe.strMeal.includes(name))
          results.push(recipe);
      }
      return results;
    }

    let filterRecipesByIngredient = function(recipes, ingredient){
      if(!recipes) return  null;
      if(!ingredient) return recipes;
      let results = [];
      for(let recipe of recipes){
        let ingredients = IngredientService.getRecipeIngredients(recipe);
        if (ingredients.some(recipeIngredient => recipeIngredient.toLowerCase().includes(ingredient.toLowerCase()))) {
          results.push(recipe);
        }
      }
      return results;
    }

    let filterRecipesByArea = function(recipes, area){
      if(!recipes.length) return  null;
      if(!area) return recipes;
      let results = [];
      for(let recipe of recipes){
        if(recipe.strArea === area){
          results.push(recipe);
        }
      }
      return results;
    }

    $scope.init();
  },
]);
