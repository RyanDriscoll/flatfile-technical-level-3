# Flatfile Level 3 Technical Take-home

Welcome to the Flatfile Technical Challenge!

This challenge is based around a [Trello](https://trello.com/en-US) clone. It involves adding features, finding bugs, and putting up a PR. The front-end is written in [React](https://reactjs.org/), the server in [NestJS](https://nestjs.com/), and the database is [Postgres](https://www.postgresql.org/).

At Flatfile we [value work/life balance](https://flatfile.io/careers/). This assessment is not timed and we don't expect you to design a production ready application. We're more interested in your approach, so don't get too caught up on how much time you're taking. Have fun with it! Beyond being fun we also want this challenge to be informative, realistic, and well defined. For these reasons feedback is very much welcomed.

:warning: Before starting, fork this repository to your personal Github or Gitlab account.

## Setup

### Prerequisites

[Docker version 20](https://www.docker.com/products/docker-desktop) is the supported platform for interacting with this challenge. If you aren't comfortable running Docker it will not be held against you and it is acceptable to run the application natively.

[NodeJS](https://nodejs.org/en/download/) is suggested but not required.

### Start the application

To start the application, run the following:

```bash
docker compose up -d
```

To view the application logs, run the following:

```bash
docker compose logs -f
```

The web application is serving off of [http://localhost:3000](http://localhost:3000)

The API server is serving off of [http://localhost:3001](http://localhost:3001)

### Run tests with coverage

To determine coverage for both the client and server, run:

```bash
npm test -- --coverage
```

...in the respective directories.

### Run Prettier

To run prettier against application code for both the client and server, run:

```bash
npm run lint:prettier:fix
```

...in the respective directories.

### Create a migration

From the `server` directory, run the following to create a new migration script:

```bash
npm run migration:create NameOfTheMigration
```

### Run a migration

From the `server` directory, run the following to run all migrations:

```bash
npm run migration
```

## Instructions

1. Fork this repository to your personal Github or Gitlab account
2. Complete one of the three features listed below.
3. Identify bugs and inefficiencies
4. Once complete, open up a PR

You may utilize a third-party library, though it isn't required to do so.

After you complete and submit your take home there will be a follow-up, in personal technical interview where you will present your PR. This is an informal and conversational style presentation where you can talk through your thoughts and we can ask you additional questions. We keep an extra 10 minutes open at the end for you to ask us questions about Flatfile, so have a list ready if you have unanswered questions.

### Requirements

All commits and branches must follow the [conventional commit messages](https://www.conventionalcommits.org/en/v1.0.0/#summary) standard.

All features must have 50% test coverage in the client and server.

### Feature 1 - Card drag/drop

#### Description

A card can be dragged and dropped from one section to another or into another card as a subtask.

#### Acceptance Criteria

* A card can be dragged and dropped from one section to another
* A card can be dragged and dropped into another card as a subtask
* A card with a subtask has an icon indicating so
* A card with subtasks can be opened in a modal view where the subtasks are listed

### Feature 2 - Card details

#### Description

A card has a detailed view that contains a title, description, and images.

#### Acceptance Criteria

* A card's details can be opened in a modal view
* A card's modal view contains editable fields (details)
  * Title
  * Description
  * Images
    * Limit to 3 images

### Feature 3 - Multiple boards

#### Description

The real Trello application allows sections and cards to be part of a [board](https://trello.com/guide/create-a-board).

Implement a "boards" feature that meets the needs of the following scenario: Customers have multiple teams each with their own set of cards. Having one board is hard to manage when teams are working towards separate goals. Allow each team to have their own board which contains their own set of cards.

#### Acceptance Criteria

* Each card is associated with one board
* Sections remain the same between boards
* Board names are unique
* Users can
  * Create new boards
  * Switch between the different boards
