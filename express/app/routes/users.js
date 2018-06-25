const db = require('../models/index');
const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  db.user.findAll().then((users) => {
    res.render('users/index', {
      title: 'Express Example',
      users: users
    });
  });
});

router.get('/new', (req, res) => {
  res.render('users/new', {
    title: 'New user',
  });
});

router.post('/', (req, res) => {
  db.user.create({
    username: req.body.username,
    email: req.body.email
  }).then(() => {
    res.redirect('/');
  });
});

router.get('/:user_id', (req, res) => {
  db.user.findOne({
    where: {
      id: req.body.user_id
    }
  }).then((user) => {
    res.render('users/show', {
      title: 'Show user',
      user: user
    });
  });
});

router.delete('/:user_id', (req, res) => {
  db.user.destroy({
    where: {
      id: req.params.user_id
    }
  }).then(() => {
    res.redirect('/');
  });
});

module.exports = router;
