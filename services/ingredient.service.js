angular.module("service").service("IngredientService", [
    "$http",
    function ($http) {
      const baseUrl = 'https://www.themealdb.com/api/json/v1/1';
  
      this.getIngredients = function () {
        return $http.get(`${baseUrl}/list.php?i=list`);
      };
    }
  ]);