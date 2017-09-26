const _ = require('lodash');


function getValues(){
    let returnVals = []
    _.forEach(process.env,(value,key)=>{
        if (_.includes(key,'HEROKU')) {
            returnVals.push( {
                key: key,
                value: value
            })
        }
    })
    return returnVals;
}

module.exports.getHerokuEnv = getValues;

