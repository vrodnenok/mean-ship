"use strict"

angular.module "meanShipApp"
.controller "NewCircularCtrl", ($scope, $http) ->
  $http.get("/api/accounts").success (accounts) ->
    $scope.accounts = accounts
  .error (err) ->
    console.log err
  $scope.handleSubmitCircularBtn = () ->
    $http.post("/api/circulars", $scope.circularForm)
    .success (data) ->
      console.log(data)
    .error (data) ->
      console.log(data)
