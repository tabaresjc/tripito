'use strict';

angular.module('tripito.version', [
  'tripito.version.interpolate-filter',
  'tripito.version.version-directive'
])

.value('version', '0.1');
