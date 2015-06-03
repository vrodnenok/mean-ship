/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Region = require('../api/region/region.model');
var Kind = require('../api/kind/kind.model');
var Account = require('../api/account/account.model');

Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.',
    active: true
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.',
    active: true
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html',
    active: true
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability',
    active: true
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.',
    active: true
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators',
    active: true
  });
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});

Account.find({}).remove(function() {
  Account.create({
    provider: 'fh',
    username: 'chart@vrodnenok.in.ua',
    email: 'chart@vrodnenok.in.ua',
    smtp: '194.0.200.218',
    password: '8102977aa'
  }, {
    provider: 'ukr',
    username: 'victor.r@ukr.net',
    email: 'victor.r@ukr.net',
    smtp: 'smtp.ukr.net',
    password: '8102977aa'
  } ,{
    provider: 'gmail',
    username: 'charter759@gmail.com',
    smtp: 'smtp.gmail.com',
    email: 'charter759@gmail.com',
    password: '5875745aa!'
  }, function() {
      console.log('finished populating accounts');
    }
  );
});

Kind.find({}).remove(function(){
  Kind.create(
    {
      name: 'Dry/bulk'
    },
    {
      name: 'Tanker'
    },
    {
      name: 'MPP'
    },
    {
      name: 'Heavy-lift'
    },
    {
      name: 'Dry/river'
    }
  );
});

Region.find({}).remove(function() {
  Region.create(
  {
    name: "Russia"
  },
  {
    name: "North Europe"
  },
  {
    name: "Greece"
  },
  {
    name: "Med"
  },
  {
    name: "Turkey"
  },
  {
    name: "Asia"
  },
  {
    name: "Africa"
  },
  {
    name: "Black sea"
  },
  {
    name: "Ukraine"
  }
  );
});
