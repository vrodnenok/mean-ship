angular.module 'meanShipApp'
.controller 'ContactsCtrl', ($scope, $http, $location) ->

  console.log "contacts controller is speakinghhhhhhhhhhhh"

  $http.get ("/api/contacts")
    .success (data) ->
      $scope.contacts = data
      for contact in data
        console.log contact

  $scope.findContacts = (filter) ->
    console.log filter
    $http.post("/api/contacts/filter", {filter:$scope.contactsFilter})
      .success (data) ->
        $scope.contacts = data

  $scope.deleteContact = (contact) ->
    $http.delete('/api/contacts/'+contact._id)
      .success (data) ->
        console.log('deleted: ' + contact.email)
        $scope.findContacts($scope.contactsFilter)

  $scope.updateContact = (contact) ->
    $http.put('/api/contacts/'+contact._id, contact)
      .success (data) ->
        console.log('updated: ' + contact.email)
        $scope.findContacts($scope.contactsFilter)
