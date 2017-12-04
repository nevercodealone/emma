# README

## Requirements

- [Docker](https://www.docker.com/) with `docker-compose`

a valid Google API key in .env (do not commit) or environment 'GOOGLE_API_KEY'.

## start

```
docker-compose up --build
# starts the devserver, point a browser to http://localhost:3000
```

## Dump the database

There is the new and convenient way to dump the current production database.
Just say:

```
bundle exec cap production dump:down
```

This should give you a file called gymbot.dump.tar in the projects main directory.
To import this dump run

```
bundle exec rake db:restore
```

# License

This code is free as in beer.

# Copyright

- [Nevercodealone.de](http://nevercodealone.de)
- [9elements.com](http://9elements.com)

