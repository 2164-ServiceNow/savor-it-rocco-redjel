angular.module("search", []).controller("SearchController", [
  "$scope",
  "SearchService",
  function ($scope, SearchService) {
    $scope.message = "hi from searchcontroller";
    $scope.searchValue = "";
    // $scope.foods = "";
    $scope.search = function () {
      const searchPromise = SearchService.searchByName($scope.searchValue);
      searchPromise
        .then(function (response) {
          if (response.data.meals) {
            console.log("inside if")
            $scope.foods = response.data.meals;
          } else {
            $scope.foods = "no food found";
          }
        })
        .catch(function () {
          $scope.result = "error";
        });
    };
  },
]);
