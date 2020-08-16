const express = require('express');
const Person = require('../models/Person');
const router = express.Router();

//Adding a person to the database
router.post('/addPerson', function(req, res){
    Person.findOne({mobile_number: req.body.mobile_number}).lean().exec(function(err, foundperson){
        if(foundperson)
        {
            res.send([{message: "Person with that mobile number is already exist, please add a different mobile number"}]);
        }
        else
        {
            let person = new Person({
                name: req.body.name,
                age: req.body.age,
                gender: req.body.gender,
                mobile_number: req.body.mobile_number,
                location: req.body.location,
                agegroup: require('./agegroups')(req.body.age)
            });
            person.save(function(err, result){
                try {
                    res.send([{message: "Following person successfully added to the database"},result]);
                } catch (err) {
                    res.send([{message: "Error: An error has occured"}]);
                }
            });
        }
    });
    
});

//Find a specific person with id
router.get('/FindById/:personId', function(req, res){
    Person.findById(req.params.personId)
        .then(function(foundperson){
            res.status(200).send([{message:"Found person with that id"} ,foundperson]);
        })
        .catch(function(err){
            res.send([{message: "Not found any person with that id"}]);
        });
});

//Update a person by Id
router.post('/updateById/:personId', function(req, res){
    Person.findByIdAndUpdate(req.params.personId, req.body, function(err, result){
        if(err)
            res.send("Error: An error has occured");
        else
        {
            if(!result)
            {
                res.send([{message: "Can't update Person's date"}])
            }
            else
            {
                res.send([{message: "Person's data updated successfully"} ,result]);
            }
        }
            
    });
});

//Find same age group people
router.get('/findByAgeGroup/:agegroup', function(req, res){
    Person.find({agegroup: req.params.agegroup.toLowerCase()}).lean().exec(function(err, persons){
        if(err)
        {
            res.send("Error: An error has occured");
        }
        else
        {
            if(persons.length>0)
            {
                let personswithagegroup = [{"message": "Following persons found with that agegroup"}].concat(persons);
                res.send(personswithagegroup);
            }
            else
            {
                res.send([{message: "Can't find such person"}]);
            }
        }
        
    });
});

//Find same gender persons
router.get('/findByGender/:gender', function(req, res){
    Person.find({gender: req.params.gender}).lean().exec(function(err, persons){
        if(err)
        {
            res.send("Error: An error has occured");
        }
        else
        {
            if(persons.length>0)
            {
                let personswithgender = [{"message": "Following persons found with that gender"}].concat(persons);
                res.send(personswithgender);
            }
            else
            {
                res.send([{message: "Can't find person with that gender"}]);
            }
        }
        
    });
});

//Find same location people
router.get('/findByLocation/:location', function(req, res){
    Person.find({location: req.params.location}).lean().exec(function(err, persons){
        if(err)
        {
            res.send("Error: An error has occured");
        }
        else
        {
            if(persons.length>0)
            {
                let personswithlocation = [{"message": "Following persons found with that location"}].concat(persons);
                res.send(personswithlocation);
            }
            else
            {
                res.send([{message: "Can't find the person with that location"}]);
            }
        }
        
    });
});

module.exports = router;