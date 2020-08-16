const mongoose = require('mongoose');

// Declaring the Schema of the Mongo model
const personSchema = new mongoose.Schema({
    name:{
        type:String
    },
    age:{
        type:Number
    },
    gender:{
        type:String
    },
    mobile_number:{
        type:String
    },
    location:{
        type:String
    },
    agegroup:{
        type:String
    }
});

//Export the model
var Person = mongoose.model('Person', personSchema);
module.exports = Person;