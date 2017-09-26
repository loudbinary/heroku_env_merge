const herokuValues = require('../libs/heroku').getHerokuEnv();
const heroku = require('../libs/heroku');
const Promise = require('bluebird');

const _ = require('lodash');
var commandExists = require('command-exists').sync;

let foundTerminus = commandExists('terminus');
let foundHeroku= commandExists('heroku');

function unsetVars(){
    return new Promise((resolve)=>{
        let results = _.forEach(herokuValues,(item)=>{
            heroku.unsetHerokuEnvValue(Object(item).key);
        })
        resolve(results);
    })
}

function setVars(){
    return new Promise((resolve)=>{
        let results = _.forEach(herokuValues,(item)=>{
            heroku.setHerokuEnvValue(item);
        })
        resolve(results);
    })
}
if (foundTerminus && foundHeroku && !_.isNil(process.env.HEROKU_APP_NAME)){
    console.log('Unsettings variables');
    unsetVars()
        .then(()=>{
            console.log('Completed removed variables, adding in requested new replacement variables.')
        })
        .then(()=>{
            console.log('Assigned new Heroku environment variables now.');
        })
        .then(setVars())
        .then(()=>{
            console.log('Completed assigning new variables to Heroku application', process.env.HEROKU_APP_NAME);
        })

}

