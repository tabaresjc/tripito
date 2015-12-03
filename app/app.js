'use strict';

// Declare app level module which depends on views, and components
angular.module('tripito', [
  'ngRoute',
  'tripito.location',
  'tripito.version'
])


// Declare the routing
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when("/", {
    templateUrl: 'location/index.html',
    controller: 'MainCtrl'
  }).
  otherwise({redirectTo: '/'});
}])


// Declare the starting point
.controller('MainCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.header = {
    name: {name: "Name", sortable:'true', width: '30%'},
    address: {name: "Address", sortable:'true', width: ''},
    owner_name: {name: "Owner", sortable:'true', width: '30%'}
  };

  $http.get('data/items.json').then(function(res){
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

  $scope.location = null;
}])

// ************************************************
// Google Map Reusable directive component 
// ************************************************
// <map data-latitude="34.1223"
//      data-longitude="212256"
//      data-scrollto="ID_OF_ELEMENT"
//      data-zoom="10"></map>
.directive('map', function(){
  return {
    transclude: true,
    restrict: 'E',
    link: function(scope, element, attrs) {
      var div = document.getElementById('location-map');
      var myPosition = new google.maps.LatLng(attrs.latitude, attrs.longitude);
      var mapOptions = {
        center: myPosition,
        zoom: parseInt(attrs.zoom),
      };
      var map = new google.maps.Map(div, mapOptions);

      var marker = new google.maps.Marker({
        position: myPosition,
        map: map,
      });

      if(attrs.scrollto) {
        var el = document.getElementById(attrs.scrollto);
        el.scrollIntoView(true);
      }
    },
    template: '<div id="location-map" class="map"><div ng-transclude></div></div>'
  };
});