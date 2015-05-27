angular.module "meanShipApp"
.controller "CircularsCtrl", ($scope, $http, $state) ->
  console.log "CircularsCtrl is speaking"
  $http.get("/api/circulars").success (circulars) ->
    $scope.circulars = circulars
