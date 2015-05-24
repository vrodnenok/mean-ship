'use strict'

angular.module 'meanShipApp'
.config ($stateProvider) ->
  $stateProvider
    .state "mailer",
      url: '/mailer'
      templateUrl: 'app/mailer/mailer.html'
      controller: 'MailerCtrl'
    .state 'mailer.new_circular',
      url: '/mailer/new_circular'
      views:
        "mailerViews":
          templateUrl: "app/mailer/new_circular.html"
    .state 'mailer.import',
      url: '/mailer/import'
      views:
        'mailerViews':
          templateUrl: "app/mailer/import.html"
