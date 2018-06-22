# partygoer


[DOCUMENTATION](docs)

[DEMO](https://partygoer.surge.sh)


## Installation
-----

You need to have installed NodeJs with npm and MongoDB


### Configuration the env file

Create an .env file at the project root with the following environment variables setted:

-Port:

```
PORT =3000
```

-MongoDB path and database:

```
DB_URL=mongodb://localhost:XXXX/NAME_DB
```

-Secret word (passport encrypt user's passwords)

```
SECRET=XXXXXXXX
```

### To run the server

```
$ npm start
```

All dependencies will be installed automatically.

## API
----

The server has multiple API endpoints using several routes:

- ````/api```` -> Serves the internal data the users and events.
- ```/auth```->Serves the authentification options, register and login.

