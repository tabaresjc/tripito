'use strict';

angular.module('tripito.viewLocation', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/location', {
    templateUrl: 'viewLocation/index.html',
    controller: 'ViewLocation1Ctrl'
  });
}])

.controller('ViewLocation1Ctrl', ['$scope', '$http', function($scope, $http) {
  $scope.header = {
    name: {name: "Name", sortable:'true', width: '20%'},
    address: {name: "Address", sortable:'true', width: ''},
    owner_name: {name: "Owner", sortable:'true', width: '20%'}
  };

  $http.get('viewLocation/data.json').then(function(res){
    $scope.locations = res.data;
    for (var i = 0; i < $scope.locations.length; i++) {
      $scope.locations[i].owner_name = $scope.locations[i].owner.name;
    };
  });

  $scope.sort = {
    column: 'name',
    descending: false
  };

  $scope.selectedCls = function(column) {
    var cls_name = '';
    if(column == $scope.sort.column) {
      cls_name = 'sort-' + $scope.sort.descending
    }
    return cls_name;
  };

  $scope.changeSorting = function(column) {
    var sort = $scope.sort;
    if (sort.column == column) {
        sort.descending = !sort.descending;
    } else {
        sort.column = column;
        sort.descending = false;
    }
  };
}]);