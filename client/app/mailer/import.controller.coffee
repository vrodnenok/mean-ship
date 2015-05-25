'use strict'

angular.module 'meanShipApp'
.controller 'ImportContactsCtrl', ($scope, $http) ->
  $http.get("/api/regions").success (regions) ->
    $scope.regions = regions
    console.log $scope.regions.length
  $http.get("/api/sizes").success (sizes) ->
    $scope.sizes = sizes
  $scope.handleSubmitImportnBtn = () ->
    console.log($scope.importForm)
