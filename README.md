# README

## Requirements

- Ruby 2.4.0
- Postgres for database

a valid Google API key in .env (do not commit) or environment 'GOOGLE_API_KEY'.

## start

```
bundle install
rake db:create # create databases
rake db:migrate # migrate databases - might be done again after a git pull
rails s # starts the devserver, point a browser to http://localhost:3000
./bin/webpack-dev-server # starts webpack dev server in a seperate terminal window
```

# License

This code is free as in beer.

# Copyright

- Nevercodealone.de
- 9elements.com

