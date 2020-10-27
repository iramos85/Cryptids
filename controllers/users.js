const bcrypt = require('bcrypt')
const express = require('express')
const users = express.Router()
const User = require('../models/users.js')

users.get('/new', (req, res) => {
  res.render('users/new.ejs', { currentUser: req.session.currentUser })
})

users.get('/:id', (req, res) => {
	User.findById(req.params.id, (err, foundUser) => {
		res.render('users/show.ejs', {
		user: foundUser,
		currentUser: req.session.currentUser
		})
	})
})

users.post('/', (req, res) => {
  //overwrite the user password with the hashed password, then pass that into our database
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  User.create(req.body, (err, createdUser) => {
    console.log('user is created', createdUser)
    res.redirect('/cryptids')
  })
})



module.exports = users