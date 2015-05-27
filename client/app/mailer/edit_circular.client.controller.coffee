'use strict'

angular.module "meanShipApp"
.controller "EditCircularCtrl", ($scope, $http, $stateParams) ->
  $http.get("/api/kinds").success (kinds) ->
    $scope.kinds = kinds
  $http.get("/api/regions").success (regions) ->
    $scope.regions = regions
  $http.get("/api/accounts").success (accounts) ->
    $scope.accounts = accounts
  $http.get("/api/circulars/#{$stateParams.id}").success (circular) ->
    circular._id = "undefined"
    $scope.circularForm = circular
  $scope.handleSubmitCircularBtn = () ->
    $http.post("/api/circulars", $scope.circularForm)
    .success (data) ->
      console.log(data)
    .error (data) ->
      console.log(data)
