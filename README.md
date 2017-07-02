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

# Phrases

Anmeldung

- Sind Sie aus Duisburg?
- Wieviele Personen leben in ihrem Haushalt?
- Haben Sie Kinder?
- Wie alt sind die Kinder?
- Haben Sie volljährige Kinder?
- Sind Sie beim Arbeitsamt gemeldet?
- Möchten Sie in Hochfeld oder in Marxloh einkaufen?

Ausgabe

- Haben Sie ein Gefrierfach?
- Essen Sie Fleisch?
- Essen Sie Schweinefleisch?
- Haben Sie eine Allergie?
- Das muß in 2 Tagen gegessen werden.
- Das Mindesthaltbarkeitsdatum läuft heute ab.

# License

This code is free as in beer.

# Copyright

- Nevercodealone.de
- 9elements.com

