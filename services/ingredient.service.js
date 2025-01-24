angular.module("service").service("IngredientService", [
    "$http",
    function ($http) {
      const baseUrl = 'https://www.themealdb.com/api/json/v1/1';
  
      this.getIngredients = function () {
        return $http.get(`${baseUrl}/list.php?i=list`);
      };

      this.getRecipeIngredientsWithMeasures = function(recipe){
        const ingredients = [];

          for (let i = 1; i < 20; i++) {
            let ingredientPropName = `strIngredient${i}`;
            let measurePropName = `strMeasure${i}`;
            let ingredient = recipe[ingredientPropName];
            let measure = recipe[measurePropName];
            if (ingredient && ingredient.trim() !== "") {
              let instructionString = `${measure} ${ingredient}`.trim();
              ingredients.push(instructionString);
            }
          }

        return ingredients;
      }


      this.getRecipeIngredients = function(recipe){
        const ingredients = [];

          for (let i = 1; i < 20; i++) {
            let ingredientPropName = `strIngredient${i}`;
            let ingredient = recipe[ingredientPropName];
            if (ingredient && ingredient.trim() !== "") {
              ingredients.push(ingredient.trim());
            }
          }

        return ingredients;
      }
    }
  ]);