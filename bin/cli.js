#!/usr/bin/env node
const path = require('path');
const heroku = require(path.join(path.resolve(__dirname,'..','libs','heroku')));
const herokuValues = heroku.getHerokuEnv();
const Promise = require('bluebird');

const _ = require('lodash');
var commandExists = require('command-exists').sync;

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

if (_.isNil(process.env.HEROKU_APP_NAME)){
    console.log('HEROKU_APP_NAME is not defined, unable to continue.  Please assign HEROKU_APP_NAME to match your Heroku application name');
}
else {
    if (foundHeroku){
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
}


