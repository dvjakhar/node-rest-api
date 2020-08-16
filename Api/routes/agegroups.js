//Define age groups
module.exports = function(age){
    if(age<0)
        return "invalid age";
    else if(age>0 && age<=14)
        return "children";
    else if(age<=24)
        return "youth";
    else if(age<=64)
        return "adult";
    else
        return "senior";
};