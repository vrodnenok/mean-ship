'use strict'

angular.module "meanShipApp"
.controller "EditContactCtrl", ($scope, $http, $stateParams) ->

  $scope.accs = ['ukr', 'fh', 'gmail', 'mg']

  $http.get("/api/kinds").success (kinds) ->
    $scope.kinds = kinds
  $http.get("/api/regions").success (regions) ->
    $scope.regions = regions
  $http.get("/api/accounts").success (accounts) ->
    $scope.accounts = accounts
    console.log accounts
  $http.get("/api/contacts/#{$stateParams.id}").success (contact) ->
    $scope.contactForm = contact

  $scope.handleSubmitContactBtn = () ->
    $http.post("/api/circulars", $scope.contactForm)
    .success (data) ->
      console.log(data)
    .error (data) ->
      console.log(data)
