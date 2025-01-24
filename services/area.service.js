angular.module("service").service("AreaService", [
    "$http",
    function ($http) {
      const baseUrl = 'https://www.themealdb.com/api/json/v1/1';
  
      this.getAreas = function () {
        return $http.get(`${baseUrl}/list.php?a=list`);
      };
    }
  ]);