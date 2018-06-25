const express = require('express');
const router  = express.Router();
const db = require('../models/index');

router.get('/', (req, res) => {
  db.user.findAll().then((users) => {
    res.render('users/index', {
      title: 'User List',
      users: users
    });
  });
});

router.get('/new', (req, res) => {
  res.render('users/new', {
    title: 'New User',
    error: req.query.error ? 'Username and Email is required' : '',
  });
});

router.post('/', (req, res) => {
  if (req.body.username === '' || req.body.email === '') {
    res.redirect('/users/new?error=1');
    return
  }

  db.user.create({
    username: req.body.username,
    email: req.body.email
  }).then(() => {
    res.redirect('/users');
  });
});

router.get('/:id', (req, res) => {
  db.user.findOne({
    where: {
      id: req.params.id
    }
  }).then((user) => {
    res.render('users/show', {
      title: 'Show User',
      user: user
    });
  });
});

router.get('/:id/destroy', (req, res) => {
  db.user.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.redirect('/users');
  });
});

module.exports = router;
