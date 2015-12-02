'use strict';

angular.module('tripito.viewLocation', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/location', {
    templateUrl: 'viewLocation/index.html',
    controller: 'ViewLocation1Ctrl'
  });
}])

.controller('ViewLocation1Ctrl', ['$scope', function($scope) {
  $scope.header = {
    name: {name: "Name", sortable:'true', width: '20%'},
    address: {name: "Address", sortable:'true', width: ''},
    owner: {name: "Owner", sortable:'true', width: '20%'}
  };

  $scope.locations = [
    {name: '大文字山', address: '〒606-0001 京都府京都市左京区', owner: 'Juan Tabares'},
    {name: '四天王寺', address: '〒543-0051 大阪府大阪市天王寺区四天王寺1-11-18', owner: 'Juan Tabares'},
    {name: '清水寺', address: '〒605-0862 京都府京都市東山区清水一丁目294', owner: 'Juan Tabares'},
    {name: '三柱神社', address: '〒832-0826 福岡県柳川市三橋町高畑323-1', owner: 'Juan Tabares'},
    {name: '三柱神社', address: '大分県別府市小倉6', owner: 'Juan Tabares'},
  ];


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