angular.module 'meanShipApp'
.controller 'ContactsCtrl', ($scope, $http, $location, $mdDialog) ->

  $scope.accs = ['ukr', 'fh', 'gmail', 'mg']

  console.log "contacts controller is speakinghhhhhhhhhhhh"

  $http.get ("/api/contacts")
  .success (data) ->
    $scope.contacts = data

  $http.get ("/api/regions")
  .success (data) ->
    $scope.regions = data

  $scope.findContacts = (filter) ->
    console.log filter
    $http.post("/api/contacts/filter", {filter:$scope.contactsFilter})
      .success (data) ->
        $scope.contacts = data

  $scope.showDeleteContactDialog = (contact) ->
    confirm = $mdDialog.confirm()
    .parent(angular.element(document.body))
    .title('Are you sure?')
    .ok('Yes, please!')
    .cancel('No, keep it!')
    .targetEvent(contact)
    $mdDialog.show(confirm).then (->
          console.log "lets delete it"
          deleteContact(contact)),->
        $scope.alert(contact.email + " will stay here for now")

  deleteContact = (contact) ->
    $http.delete('/api/contacts/'+contact._id)
    .success (data) ->
      console.log('deleted: ' + contact.email)
      $scope.findContacts($scope.contactsFilter)

  $scope.updateContact = (contact) ->
    for region in $scope.regions
      if region.name == contact.region.name
        contact.region = region._id
    # contact.region = contact.region._id
    $http.put('/api/contacts/'+contact._id, contact)
      .success (data) ->
        console.log('updated: ' + contact.email)
        $scope.findContacts($scope.contactsFilter)
