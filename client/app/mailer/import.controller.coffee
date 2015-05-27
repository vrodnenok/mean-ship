'use strict'

angular.module 'meanShipApp'
.controller 'ImportContactsCtrl', ($scope, $http, $location) ->
  $http.get("/api/regions").success (regions) ->
    $scope.regions = regions
    console.log $scope.regions.length
  $http.get("/api/kinds").success (kinds) ->
    $scope.kinds = kinds
  $scope.handleSubmitImportnBtn = () ->
    $http.post("/api/contacts", $scope.importForm)
    .success (data) ->
      console.log data
      $scope.importForm = {}
    .error (data) ->
      console.log(data)
