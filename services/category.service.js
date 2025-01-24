angular.module("service").service("CategoryService", [
    "$http",
    function ($http) {
      const baseUrl = 'https://www.themealdb.com/api/json/v1/1';
  
      this.getCategories = function () {
        return $http.get(`${baseUrl}/categories.php`);
      };
    }
  ]); 