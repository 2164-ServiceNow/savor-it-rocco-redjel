let savorIt = angular.module("savorIt", []);

savorIt.controller("HomeController", [
  "$scope",
  function ($scope) {
    $scope.message = "hello from the controller";
  },
]);
