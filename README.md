# heroku_env_merge
* Requirements 
* heroku cli application must be installed. ```wget -qO- https://cli-assets.heroku.com/install-ubuntu.sh | sh```
* heroku cli must have been succesfully logged into prior to running this application. ```heroku login```
* Environment variable HEROKU_APP_NAME must be defined, as this is the application that will be updated. ```export HEROKU_APP_NAME=MY_APP_NAME```

How this works:

When the application is ran, any environment variable that matches 
* "HEROKU_ENV_" will be pulled into an array.
* "HEROKU_ENV_" will be stripped from each found environment variable, leaving remaining text as KEY
* Each environment variable found will be first unset at configure HEROKU_APP_NAME application
* Each environment variable found will be then set with designated values within HEROKU_APP_NAME application
Sets environment variables within Heroku application for any environment variable locally matching HEROKU_ 
