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
.controller('MainCtrl', function($scope, $http, dataFetcher, dataContainer) {
  $scope.header = {
    name: {name: "Name", sortable:'true', width: '30%'},
    address: {name: "Address", sortable:'true', width: ''},
    owner_name: {name: "Owner", sortable:'true', width: '30%'}
  };
  $scope.locations = dataContainer.list();
  if(!$scope.locations.length) {
    // this is the only time that json file should be loaded
    dataFetcher.getData().then(function(result){
      for (var i = 0; i < result.data.length; i++) {
        dataContainer.add(result.data[i]);
      };
      $scope.locations = dataContainer.list();
    });
  }

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
})


.service('dataFetcher', function ($http) {
  this.getData = function()
  {
    return $http.get('data/items.json');      
  }
})

.factory('dataContainer', function() {
    var items = [];
    var dataContainer = {};

    dataContainer.add = function(item) {
      if(!item.id) {
        item.id = 1;
        if(items.length) {
          item.id = items[items.length - 1].id + 1;
        }
      }
      // this is neccesary, to make owner's name sortable
      item.owner_name = item.owner.name;
      items.push(item);
    };
    dataContainer.list = function() {
        return items;
    };
    dataContainer.getItem = function(itemId) {
      var item = {};
      for (var i = 0; i < items.length; i++) {
        if(items[i].id == itemId) {
          item = items[i];
          break;
        }
      };
      return item;
    };

    return dataContainer;
})


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