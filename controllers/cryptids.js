const express = require('express')
const router = express.Router()
const Cryptid = require('../models/cryptids.js')


const isAuthenticated = (req, res, next) =>  {
	if (req.session.currentUser) {
		return next()
	} else {
		res.redirect('/sessions/new')
	}
}

router.get('/new', (req, res) => {
	res.render('cryptids/new.ejs', { currentUser: req.session.currentUser })
})

router.post('/', (req, res) => {
	if (req.body.temperament === 'Aggressive') {
		req.body.temperament = true
	} else {
		req.body.temperament = false
	}
	Cryptid.create(req.body, (error, createdCryptid) => {
		res.redirect('/cryptids')
	})
})

router.get('/', (req, res)=>{
    Cryptid.find({}, (error, allCryptids)=>{
        res.render('cryptids/index.ejs', {
            cryptids: allCryptids,
						currentUser: req.session.currentUser
        })
    })
})

router.get('/seed', (req, res)=>{
    Cryptid.create([
        {
            name:'grapefruit',
            color:'pink',
            readyToEat:true
        },
        {
            name:'grape',
            color:'purple',
            readyToEat:false
        },
        {
            name:'avocado',
            color:'green',
            readyToEat:true
        }
    ], (err, data)=>{
        res.redirect('/cryptids');
    })
});

router.get('/:id', isAuthenticated, (req, res) => {
	Cryptid.findById(req.params.id, (err, foundCryptid) => {
		res.render('cryptids/show.ejs', {
		cryptid: foundCryptid,
		currentUser: req.session.currentUser
		})
	})
})


router.get('/:id/edit', (req, res) => {
  Cryptid.findById(req.params.id, (err, foundCryptid) => {
    res.render('cryptids/edit.ejs', {
      cryptid: foundCryptid,
			currentUser: req.session.currentUser
    })
  })
})


router.put('/:id', isAuthenticated, (req, res) => {
	if (req.body.temperament === 'Aggressive') {
		req.body.temperament = true
	} else {
		req.body.temperament = false
	}
  Cryptid.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedModel) => {
    res.redirect('/cryptids')
  })
})


router.delete('/:id', isAuthenticated, (req, res) => {
  Cryptid.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect('/cryptids')
  })
})


module.exports = router