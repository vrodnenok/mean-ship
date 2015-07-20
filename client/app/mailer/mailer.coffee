'use strict'

angular.module 'meanShipApp'
.config ($stateProvider) ->
  $stateProvider
    .state "mailer",
      url: '/mailer'
      templateUrl: 'app/mailer/mailer.html'
      controller: 'MailerCtrl'
    .state 'mailer.new_circular',
      url: '/new_circular'
      views:
        "mailerViews":
          templateUrl: "app/mailer/new_circular.html",
          controller: "NewCircularCtrl"
    .state 'mailer.import',
      url: '/import'
      views:
        'mailerViews':
          templateUrl: "app/mailer/import.html"
          controller: "ImportContactsCtrl"
    .state 'mailer.circulars',
      url: '/circulars'
      views:
        'mailerViews':
          templateUrl: "app/mailer/circulars.html"
          controller: "CircularsCtrl"
    .state 'mailer.edit_contact',
      url: '/edit_contact/:id'
      views:
        'mailerViews':
          templateUrl: "app/mailer/edit_contact.html"
          controller: 'EditContactCtrl'
    .state 'mailer.edit_circular',
      url: '/edit_circular/:id'
      views:
        'mailerViews':
          templateUrl: "app/mailer/new_circular.html"
          controller: "EditCircularCtrl"
    .state 'mailer.contacts',
      url: '/contacts'
      views:
        'mailerViews':
          templateUrl: "app/mailer/contacts.html"
          controller: "ContactsCtrl"
