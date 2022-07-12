const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gig');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//Get gig list
router.get('/', (req, res) => 
Gig.findAll()
.then(gigs => {
    res.render('gigs', {
        gigs
    });
})
.catch(err => console.log(err))
);
//display gig form

router.get('/add', (req,res) => res.render('add'));
router.get('/search', (req, res) => {
    const {term} = req.query;
    Gig.findAll({where: {technologies: {[Op.like]: '%' + term + '%' }}})
    .then(gigs => res.render('gigs', {gigs}))
    .catch(err => console.log(err));
});
//Add gig
router.post('/add', (req,res) => {
   
    let {title, technologies, budget, description, contact_email} = req.body;
    let errors = [];
    if(!title){
        errors.push({text: 'Please add a title'});
    }
    if(!technologies){
        errors.push({text: 'Please add a technologies'});
    }
    if(!description){
        errors.push({text: 'Please add a description'});
    }
    if(!contact_email){
        errors.push({text: 'Please add a contact_email'});
    }

    if(errors.length > 0){
        return res.render('add', {
            errors,
            title,
            technologies,
            budget, 
            description, 
            contact_email
        });
    }
    Gig.create({
        title,
        technologies,
        budget,
        description,
        contact_email
    })
    .then(res.redirect('/gigs'))
    .catch(err => console.log(err))
});

module.exports = router;