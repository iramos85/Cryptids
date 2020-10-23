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
            name:'Skunk Ape',
            Description: 'large, foul-smelling, hairy, ape-like creature.  Runs upright on two legs, physically powerful',
            img: "https://i.pinimg.com/originals/f3/b8/1f/f3b81f52de2ff448f047bd95b92f5ebc.jpg",
            temperament:true
        },
        {
          name:'Chupacabra',
          Description: 'Reptile-like creature, leathery greenish-gray skin and sharp spines running down its back.  It is said to be approximately 3 to 4 feet (0.9 to 1.2 m) high, and stands and hops in a fashion similar to that of a kangaroo',
          img: "https://i.pinimg.com/originals/0d/71/46/0d7146bad69776c328caabcef5a6b9ef.jpg",
          temperament:true
        },
        {
          name:'Mothman',
          Description: 'large, dark and tall man with wings and large red glowing eyes',
          img: "https://allthatsinteresting.com/wordpress/wp-content/uploads/2017/05/the-mothman.png",
          temperament:false
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