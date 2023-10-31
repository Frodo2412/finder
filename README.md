# finder
Repo for a project for University. WyeWorks is the client, students implement it.

## Table of Contents

* [Requirements](#requirements)
* [Setup](#setup)
* [Linting](#linting)
* [Tests](#tests)
* [Coverage](#coverage)
* [CI](#ci)
* [Deployment](#deployment)
* [API Endpoint Documentation](#apidocs)

## Requirements

Project presentation, which includes functional and non-functional requirements, can be found [here](https://docs.google.com/presentation/d/1N6uZvcd5Qhbu57ZmuHU9vGIsIKtV7Cw7cg0wIBEHyiU/edit#slide=id.p).

## Setup

### Homebrew & dependencies

Homebrew can be used for installing packages and system dependencies locally.
Instructions can be found [here](https://brew.sh/).

### Postgres

Postgres will be used as the relational database.
Install it using Homebrew by running:

```
$ brew install postgresql
```

### Ruby

This project needs `ruby` to be installed.
The right version of Ruby is stored in the `.ruby-version` file on the `finder/api` folder.
Currently, this application uses Ruby `v3.2.2`.

To manage different versions of `ruby`, different `ruby` version managers can be used:
- [chruby](https://github.com/postmodern/chruby)
- [rbenv](https://github.com/rbenv/rbenv)
- [rvm](https://rvm.io/)

Please follow their instructions on how to install them, and how to install the `ruby`
version required by the app.

### Gems

Install gems for the rails app:

```
$ cd finder/api
$ bundle install
```

### Rails

Install the rails version used on the `Gemfile.lock`:

```
$ sudo gem install rails -v VER.SI.ON
```

Currently, this application uses Rails `v7.0.7.2`.

### Frontend

React (`v18`) and Tailwind are used for the Frontend application, all together within a Next.js framework (`v13`).

Make sure to have the latest `npm` version (`v10`).
Then run:

```
$ cd finder/client
$ npm install
$ npm run build
```

Replace values from `.env.local.example` file with the correct ones, for example specifying the right URL for the local rails server.
Then rename the file to `.env.local`.

### Database

Setup local db and populate it with data:

```
$ cd finder/api
$ bundle exec rails db:setup
```

This last command does: `db:create db:schema:load db:seed`.
Last one, `db:seed` is the one that populates the database will `subjects` and `careers` data from a seed file.

### Start App Locally

Run `api` (BE) and `client` (FE) separately.
Since both Rails and Next.js use `3000` as the default port number, one of them had to be moved to another one.
Backend uses the port `3000`, and frontend the `3333`.

```
$ cd finder/api
$ bundle exec rails s
```

```
$ cd finder/client
$ npm run dev
```

Open the browser and navigate to `localhost:3333`.
Congratulations, you have successfully set up your machine for development!

## Linting

## Tests

## Coverage

## CI

## Deployment

## ApiDocs
