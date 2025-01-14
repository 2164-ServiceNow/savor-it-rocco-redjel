angular.module('home', [])
.controller('HomeController', [
  '$scope',
  function($scope){
    $scope.message = "hello frome home!!!!!!!!";
  }
])