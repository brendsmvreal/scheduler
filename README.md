# Interview Schedualer

## Project Description

Interview Schedulr is a single page application designed to allow students to book appointments with an interviewer of their choice any work day.
In addition to that, students have the ability to edit, or even delete their appointments if they wish.<br />
The data is available and new data is collected using PostgresSQL on the backend.<br />
The project also uses Storybooks to test every component individualy making sure that the action and css are as desired.
Cypress and Jest frameworks are also used to ensure further testing to provide expected results.

## Gifs/Screenshot

#### Create, Edit, Update and Delete an interview.

<img src="https://media4.giphy.com/media/Ri8OoIqQWyjsAGpMEk/giphy.gif" width="480px" height="auto"></img>

#### Main page

<img src="https://github.com/brendsmvreal/scheduler/blob/master/media/mainpage.png" width="720px" height="auto"></img>

#### Appoitment booked

<img src="https://github.com/brendsmvreal/scheduler/blob/master/media/savingappt.png" width="720px" height="auto"></img>

## Setup

### Scheduler-api

- Scheduler api should be installed by forking and cloning [schedualer-api server](https://github.com/lighthouse-labs/scheduler-api).
- Follow with the README file.
- Run the api server on a separate terminal using the command `npm start`.

### Scheduler

- Fork and Clone this repository.
- Install dependencies using `npm install`.
- Start the server using `npm start`(Make sure you start the api as well so that the data renders).

### Storybooks

- Type `npm run storybooks`.

### Jest Test Framwork

- Type `npm test` in the terminal.

## Dependencies

- axios
- classnames
- normalize.css
- react
- react-dom
- react-scripts
