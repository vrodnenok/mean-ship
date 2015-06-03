'use strict';

var _ = require('lodash');
var Contact = require('./contact.model');

var validator = require('mailgun-email-validation');

exports.filter = function(req, res) {
  Contact.find({email: new RegExp(req.body.filter)}).limit(50).exec(function (err, contacts) {
    if(err) { return handleError(res, err); }
    return res.json(200, contacts);
  });
};

// Get list of contacts
exports.index = function(req, res) {
  Contact.find().limit(250).populate('region','name').exec(function (err, contacts) {
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
          req.body.email = validatedConts[index++];
          if (/gmail/.test(req.body.email)){ req.body.prefAccount = 'gmail'};
          Contact.create(req.body, function(err, contact){
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


  function mvalidator (index){
    console.log("In the begining Index = " + index);
    if (index < conts.length){
      validator.check(conts[index].trim(), function(err, valid){
          console.log("is '" + conts[index] + "' valid? " + valid);
            if(err) {
               console.log(err);
             } else {
               if (valid){
              validatedConts.push(conts[index]);
            } else {
              errors.push(conts[index]);
            }
            }
            console.log("Index =" + index);
            mvalidator(index + 1);
        });
    } else {
      console.log ('done with validation...');
      console.log("Invalid emails:");
      console.log(errors);
      return validatorFinish();
    }
  };

  var contacts = [];
  var errors = [];
  var contemp;
  var conts = req.body.email.split("\n");
  var validatedConts = [];
  mvalidator(0);
};

// Updates an existing contact in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Contact.findById(req.params.id, function (err, contact) {
    if (err) { return handleError(res, err); }
    if(!contact) { return res.send(404); }
    var updated = _.merge(contact, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
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
