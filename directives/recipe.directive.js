angular.module("recipe", []).directive("recipe", [
    "RecipeService",
    "IngredientService",
    function(RecipeService, IngredientService){
        return{
            restrict: 'E',
            templateUrl: 'components/recipe/recipe.html',
            scope: {
                recipeName: "=",
            },
            controller: function($scope){
                $scope.recipe = null;
                $scope.ingredients = [];
                $scope.errorMessage = '';
                
                $scope.$watch("recipeName", function(newRecipeName){
                    console.log('directive of recipe : ', newRecipeName)
                    if(newRecipeName){
                        RecipeService.getByName(newRecipeName)
                            .then(function(response){
                                const recipe = response.data.meals[0];
                                console.log('recipe : ' , recipe);
                                $scope.recipe = recipe;
                                $scope.ingredients = IngredientService.getIngredientsOfRecipe(recipe);
                            })
                            .catch(function(){
                                $scope.errorMessage = "A recipe could not be retrieved";
                            });
                    }
                })
            }
        }
    }
])