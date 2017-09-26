const herokuValues = require('../libs/getHerokuVariables').getHerokuEnv();
var commandExists = require('command-exists');



commandExists('terminus', (err,commandExists)=>{
        if(commandExists){
            return true;
        } else {
            return false;
        }
})
