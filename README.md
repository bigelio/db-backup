# db-backup

Mongodb backup script with nodejs.

This is a cron job script to backup mongodb database every mid-night.

## prerequisites

- nodejs/npm
- Mongo up and listening to port 27017 which is default port (for other port add new variable in .env file with name MONGO_PORT).

## Environments

After creating .env file with this command
```
cp .example.env .env
```

Add missing values to the variables.

## Scripts

```
node index.js
```
