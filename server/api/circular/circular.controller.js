'use strict';

var _ = require('lodash');
var Circular = require('./circular.model');

var Contact = require('../contact/contact.model');
var Account = require('../account/account.model');
var mailgun = require('mailgun-js')({
    apiKey: 'key-e9c756c3c7b6015cbe04871d2aff2bf7',
    domain: 'vrodnenok.in.ua'
  });

var contactsToSend = [];

// Get list of circulars
exports.filter = function(req, res) {
  console.log(req.body);
  if (req.body.filter === "") return;
  var query = "//"+req.body.filter+"//";
  Circular.find({subj: new RegExp(req.body.filter, "i")}).sort('-updatedAt').limit(100).exec(function (err, circulars) {
    if(err) { return handleError(res, err); }
    return res.json(200, circulars);
  });
};

// sends circular to selected email group
function sendMail(req, res){

  Contact.find().skip(197).exec(function(err, contacts){

    var sendMailIterator = function(i){
      if (i<contacts.length){
        mOptions.to=contacts[i].email;
        mailgun.messages().send(mOptions, function(error, info){
        if(error) {console.log("there was an error" + error);}
        console.log("sending to ... " + mOptions.to);
        console.log(info);
        sendMailIterator(i+1);
        }
        );
        }
      return;
    }

    var mOptions = {
      from: "Victor Rodnenok <chart@vrodnenok.in.ua>",
      to: "Victor Rodnenok <chart@vrodnenok.in.ua>",
      subject: req.body.subj,
      text: req.body.text,
      html: req.body.html
    }

    if(err) { return handleError(res, err);}
    sendMailIterator(0);
  });
};


// Get list of circulars
exports.index = function(req, res) {
  console.log(req.body);
  Circular.find({}).sort('-updatedAt').limit(10).exec(function (err, circulars) {
    if(err) { return handleError(res, err); }
    return res.json(200, circulars);
  });
};

// Get a single circular
exports.show = function(req, res) {
  Circular.findById(req.params.id, function (err, circular) {
    if(err) { return handleError(res, err); }
    if(!circular) { return res.send(404); }
    return res.json(circular);
  });
};

// Creates a new circular in the DB.
exports.create = function(req, res) {
  req.body._id = null;
  Circular.create(req.body, function(err, circular) {
    if(err) { return handleError(res, err); }
    return res.json(201, circular);
  });
  sendMail (req, res);
};

// Updates an existing circular in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Circular.findById(req.params.id, function (err, circular) {
    if (err) { return handleError(res, err); }
    if(!circular) { return res.send(404); }
    var updated = _.merge(circular, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, circular);
    });
  });
};

// Deletes a circular from the DB.
exports.destroy = function(req, res) {
  Circular.findById(req.params.id, function (err, circular) {
    if(err) { return handleError(res, err); }
    if(!circular) { return res.send(404); }
    circular.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
