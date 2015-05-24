'use strict'

angular.module 'meanShipApp'
.controller 'NavbarCtrl', ($scope, $location, Auth) ->
  $scope.menu = [{
    title: 'Home'
    link: '/'},
    {title: 'Mailer'
    link: '/mailer'}
  ]
  $scope.isCollapsed = true
  $scope.isLoggedIn = Auth.isLoggedIn
  $scope.isAdmin = Auth.isAdmin
  $scope.getCurrentUser = Auth.getCurrentUser

  $scope.logout = ->
    Auth.logout()
    $location.path '/login'

  $scope.isActive = (route) ->
    route is $location.path()
