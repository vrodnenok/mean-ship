'use strict'

angular.module 'meanShipApp'
.controller 'ImportContactsCtrl', ($scope, $http, $location) ->

  $http.get("/api/regions").success (regions) ->
    $scope.regions = regions
    console.log $scope.regions.length

  $http.get("/api/kinds").success (kinds) ->
    $scope.kinds = kinds

  $scope.handleSetDefaultsButton = () ->
    $scope.importForm.tonnage = 1000
    $scope.importForm.kind = $scope.kinds[0]._id
    $scope.importForm.region = $scope.regions[3]._id
    $scope.importForm.isBroker = true
    $scope.importForm.prefAccount = 'fh'
    console.log($scope.importForm.kind)

  $scope.handleSubmitImportnBtn = () ->
    $http.post("/api/contacts", $scope.importForm)
    .success (data) ->
      console.log data
      $scope.importForm = {}
    .error (data) ->
      console.log(data)
