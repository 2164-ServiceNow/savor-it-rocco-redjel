angular.module("search").service("SearchService", [
  "$http",
  function ($http) {
    const baseUrl = 'https://www.themealdb.com/api/json/v1/1';

    this.searchByName = function (name) {
      console.log("get by name called")
     return $http.get(`${baseUrl}/search.php?s=${name}`);
    };

    this.getAreas = function () {
      return $http.get(`${baseUrl}/list.php?a=list`);
    };

    this.getByArea = function (area) {
      console.log("get by area called")
      return $http.get(`${baseUrl}/filter.php?a=${area}`);
    };
  }
]);
