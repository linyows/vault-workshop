const express = require('express');
const router = express.Router();
const db = require('../models/index');

router.get('/', function(req, res, next) {
  db.user.findAll().then((users) => {
    res.render('users/index', {
      title: 'Welcome to Hashicorp Vault Workshop.',
      users: users
    });
  });
});

module.exports = router;
