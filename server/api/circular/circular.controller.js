'use strict';

var _ = require('lodash');
var async = require('async');
var Circular = require('./circular.model');

var Contact = require('../contact/contact.model');
var Account = require('../account/account.model');
var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');
var auth = {
  auth: {
    api_key: 'key-e9c756c3c7b6015cbe04871d2aff2bf7',
    domain: 'vrodnenok.in.ua'
  }
}

var nodemailerMailgun = nodemailer.createTransport(mg(auth));

var nodemailerGmail = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'charter759@gmail.com',
    pass: '5875745aa!'
  }
});

var nodemailerUkr = nodemailer.createTransport({
  host: 'smtp.ukr.net',
  port: 465,
  secure: true,
  auth: {
    user: 'victor.r@ukr.net',
    pass: '8102977aa'
  }
});

var nodemailerFh = nodemailer.createTransport({
  host: '194.0.200.218',
  port: 25,
  secure: false,
  ignoreTLS: true,
  auth: {
    user: 'chart@vrodnenok.in.ua',
    pass: '8102977aa'
  },
  tls: {
    ciphers: 'SSLv3'
  }
});

// Get list of circulars
exports.filter = function(req, res) {
  console.log(req.body);
  if (req.body.filter === "") return;
  var query = req.body.filter.toLowerCase();
  console.log(query);
  Circular.find({subj: new RegExp(query, "i")}).sort('-updatedAt').limit(100).exec(function (err, circulars) {
    if(err) { return handleError(res, err); }
    return res.json(200, circulars);
  });
};

// sends circular to selected email group
function sendMail(req, res){
  console.log("hmmm started?");
  Contact.find({})
  .where({active: true})
  .skip(0)
  .limit(30000)
  .exec(function(err, contacts){
    var sendMailIterator = function(contact, cbDone){
      console.log("sendmail started?");
        mOptions.to=contact.email;
        if (contact.prefAccount === 'gmail') {
          mOptions.from = "charter759@gmail.com";
          nodemailerGmail.sendMail(mOptions, function(error, info){
          if(error) {console.log("there was an error" + error);}
          console.log("sending to ... " + mOptions.to);
          console.log(info);
          cbDone(null);
          });
        } else if (contact.prefAccount === 'ukr') {
          mOptions.from = "victor.r@ukr.net";
          nodemailerUkr.sendMail(mOptions, function(error, info){
          if(error) {console.log("there was an error" + error);}
          console.log("sending to ... " + mOptions.to);
          console.log(info);
          cbDone(null);
        });
      } else if (contact.prefAccount === 'fh') {
          mOptions.from = "VR chart <chart@vrodnenok.in.ua>";
          nodemailerFh.sendMail(mOptions, function(error, info){
          if(error) {console.log("there was an error" + error);}
          console.log("sending to ... " + mOptions.to);
          console.log(info);
          cbDone(null);
        });
      }
        else {
          mOptions.from = "VR chart <chart@vrodnenok.in.ua>";
          nodemailerMailgun.sendMail(mOptions, function(error, info){
          if(error) {console.log("there was an error" + error);}
          console.log("sending to ... " + mOptions.to);
          console.log(info);
          cbDone(null);
          });
      }

  };
  var mOptions = {
    from: "Victor Rodnenok <chart@vrodnenok.in.ua>",
    to: "Victor Rodnenok <chart@vrodnenok.in.ua>",
    subject: req.body.subj,
    text: req.body.text,
    html: req.body.html
  }
  if(err) {
    console.log(err);
    //return handleError(res, err);
    }
  async.forEachLimit(contacts, 5, sendMailIterator, function(err){
    console.log('done sending');
  });
  }

  );

}


// Get list of circulars
exports.index = function(req, res) {
  console.log(req.body);
  Circular.find({}).sort('-updatedAt').limit(50).exec(function (err, circulars) {
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
  console.log('what is going on?');
  Circular.create(req.body, function(err, circular) {
    if(err) { return handleError(res, err); }
  });
  sendMail (req, res);
  return res.send(201, 'circular');
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
