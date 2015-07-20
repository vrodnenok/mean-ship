'use strict';

var _ = require('lodash');
var Contact = require('./contact.model');

var async = require('async');

var validator = require('mailgun-email-validation');

exports.filter = function(req, res) {
  Contact.find({email: new RegExp(req.body.filter.toLowerCase())}).populate('region').limit(25).exec(function (err, contacts) {
    if(err) { return handleError(res, err); }
    return res.json(200, contacts);
  });
};

// Get list of contacts
exports.index = function(req, res) {
  Contact.find().limit(10).populate('region','name').exec(function (err, contacts) {
    if(err) { return handleError(res, err); }
    console.log(contacts);
    return res.json(200, contacts);
  });
};

// Get a single contact
exports.show = function(req, res) {
  Contact.findById(req.params.id, function (err, contact) {
    if(err) { return handleError(res, err); }
    if(!contact) { return res.send(404); }
    return res.json(contact);
  });
};

// Creates a new contact in the DB.
exports.create = function(req, res) {
  var inserter = function(index){
    if (index < validatedConts.length){
      var contactTemp = _.cloneDeep(req.body);
          contactTemp.email = validatedConts[index];
          if ( validatedConts[index].indexOf("gmail") > -1 ){ contactTemp.prefAccount = 'gmail'}
          Contact.create(contactTemp, function(err, contact){
            if(err) {
               console.log(err);
             } else {
              contacts.push(contact.email);
            }
            console.log('index =  '+index+" , running = ");
            inserter(index+1);
        });
    } else {
      return inserterFinish();
    }
  };

  function inserterFinish(){
    console.log ('Contacts added: ' + contacts.length);
    return res.send('Correct: ' + contacts.length + '; failed: ' + errors.length);
  }

  function validatorFinish(){
    console.log ('Contacts validated: ' + validatedConts.length);
    return inserter(0);
  }


  function mvalidator (contact, cbDone){
    console.log("In the begining Index = ");
      validator.check(contact.trim(), function(err, valid){
          console.log("is '" + contact + "' valid? " + valid);
            if(err) {
               console.log(err);
             } else {
               if (valid){
              validatedConts.push(contact);
            } else {
              errors.push(contact);
            }
            }
          cbDone(null);
        });
    }

  var contacts = [];
  var errors = [];
  var contemp;
  var conts = req.body.email.split("\n");
  var validatedConts = [];
  async.forEachLimit(conts, 15, mvalidator, function(err){
    console.log(validatedConts);
    inserter(0);
  });
};

// Updates an existing contact in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Contact.findById(req.params.id, function (err, contact) {
    console.log(contact);
    if (err) { return handleError(res, err); }
    if(!contact) { return res.send(404); }
    var updated = _.merge(contact, req.body);
    console.log(updated);
    updated.save(function (err) {
      if (err) { console.log(err); }
      return res.json(200, contact);
    });
  });
};

// Deletes a contact from the DB.
exports.destroy = function(req, res) {
  Contact.findById(req.params.id, function (err, contact) {
    if(err) { return handleError(res, err); }
    if(!contact) { return res.send(404); }
    contact.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
