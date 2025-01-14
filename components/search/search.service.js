// angular.module('savorIt')
//     .service('SearchService', function(){
//         this.query = '';

//         this.setQuery = function(query){
//             this.query = query
//             console.log(`${query} from setQuery in the Service!`);
//         }

//         this.getQuery = function(){
//             return this.query
//         }
//     })
angular.module("search").service("SearchService", [
  "$http",
  function ($http) {
    const baseUrl = 'https://www.themealdb.com/api/json/v1/1';
    this.searchByName = function (name) {
     return $http.get(`${baseUrl}/search.php?s=${name}`);
    };
  }
]);
