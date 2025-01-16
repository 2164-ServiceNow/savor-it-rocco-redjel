angular.module("categories", []).controller("CategoriesController", [
  "$scope",
  "CategoryService",
  function ($scope, CategoryService) {
    $scope.catMessage = "hello frome categories!!!!!!!!";
    $scope.errorMessage = "";
    $scope.init = function () {
      $scope.errorMessage = "";
      const categoryPromise = CategoryService.getCategories();
      categoryPromise
        .then(function (response) {
          console.log(response);
          $scope.categories = response.data.categories;
        })
        .catch(function () {
          $scope.errorMessage = "An error accured when trying to get data.";
        });
    };
    $scope.init();
  },
]);
