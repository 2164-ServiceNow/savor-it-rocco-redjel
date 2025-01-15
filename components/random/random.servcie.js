angular.module("random").service("RandomService", [
  "$http",
  function ($http) {
    this.searchRandom = function () {
      return $http.get(` https://www.themealdb.com/api/json/v1/1/random.php`);
    };
  },
]);
