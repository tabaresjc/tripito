'use strict';

// Declare app level module which depends on views, and components
angular.module('tripito', [
  'ngRoute',
  'tripito.view1',
  'tripito.view2',
  'tripito.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
