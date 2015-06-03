angular.module "meanShipApp"
.controller "CircularsCtrl", ($scope, $http, $state) ->

  console.log "CircularsCtrl is speaking"

  $http.get("/api/circulars").success (circulars) ->
    $scope.circulars = circulars

  $scope.findCircular = (filter) ->
    console.log filter
    $http.post("/api/circulars/filter", {"filter":$scope.circularFilter}).success (circulars) ->
      $scope.circulars = circulars
