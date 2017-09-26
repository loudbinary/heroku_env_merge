const _ = require('lodash');
const exec = require('execa');

function getValues(){
    let returnVals = []
    _.forEach(process.env,(value,key)=>{
        if (_.includes(key,'HEROKU_ENV_')) {
            let tmpKey = _.replace(key,'HEROKU_ENV_','');
            returnVals.push( {
                key: tmpKey,
                value: value
            })
        }
    })
    if (returnVals.length ===0){
        console.log('No environment variables matching HEROKU_ENV_* - exiting');
        process.exit(0);
    } else {
        return returnVals;
    }

}

function unsetValues(key){
    console.log('Unsettings Heroku setting', key);
    return exec.sync('heroku',['config:unset','--app',process.env.HEROKU_APP_NAME,key]);
}

function setHerokuEnvValues(item){
    let key = Object(item).key;
    let value = Object(item).value;
    console.log('Aplying Heroku Setting', key, '=', value);
    return exec.sync('heroku',['config:set','--app', process.env.HEROKU_APP_NAME,key + '=' + value]);
}
module.exports.getHerokuEnv = getValues;
module.exports.unsetHerokuEnvValue = unsetValues;
module.exports.setHerokuEnvValue = setHerokuEnvValues;
