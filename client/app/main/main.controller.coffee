'use strict'

angular.module 'meanShipApp'
.controller 'MainCtrl', ($scope, $http, $location, socket, Auth) ->
  $scope.awesomeThings = []

  $scope.isLoggedIn = Auth.isLoggedIn
  $scope.isAdmin = Auth.isAdmin
  $scope.getCurrentUser = Auth.getCurrentUser
  $scope.user = Auth.getCurrentUser()

  $http.get('/api/things/').success (awesomeThings) ->
    awesomeThingsList = ""
    $scope.awesomeThings = awesomeThings
    socket.syncUpdates 'thing', $scope.awesomeThings

  $scope.addThing = ->
    return if $scope.newThing is ''
    $http.post '/api/things',
      name: $scope.newThing
    $location.path '/'

    $scope.newThing = ''

  $scope.toggleThing = (thing) ->
    msec = Date.parse thing.createdAt
    console.log msec
    $http.put '/api/things/'+thing._id,
      thing

  $scope.deleteThing = (thing) ->
    $http.delete '/api/things/' + thing._id

  $scope.$on '$destroy', ->
    socket.unsyncUpdates 'thing'
