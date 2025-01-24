angular.module("service")
    .service("RecipeService", [
    "$http",
    function ($http) {
      const baseUrl = 'https://www.themealdb.com/api/json/v1/1';
  
      this.getByName = function (name) {
       return $http.get(`${baseUrl}/search.php?s=${name}`);
      };
  
      this.getByArea = function (area) {
        return $http.get(`${baseUrl}/filter.php?a=${area}`);
      };

      this.getRandom = function () {
        return $http.get(`${baseUrl}/random.php`);
      };

      this.getByFirstLetter = function(firstLetter){
        return $http.get(`${baseUrl}/search.php?f=${firstLetter}`)
      };

      this.getById = function (id) {
        return $http.get(`${baseUrl}/lookup.php?i=${id}`);
       };

       this.getByIngredient = function(ingredient){
        return $http.get(`${baseUrl}/filter.php?i=${ingredient}`);
       };

       this.getByCategory = function(category){
        return $http.get(`${baseUrl}/filter.php?c=${category}`);
       };

       this.getAllRecipes = function(){
        return $http.get(`${baseUrl}/search.php?s=`)
       }
    }
  ]);
  