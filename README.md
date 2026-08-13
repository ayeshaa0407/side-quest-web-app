# Side Quest

## About the Project

Side Quest is a web-based good habit generator application designed to encourage users to take short, positive breaks from work or studying.

The application presents positive activities as "Side Quests". Users can randomly generate a Side Quest, choose whether to accept or reject it, and add accepted quests to their Quest Log. Accepted quests can then be completed to earn XP.

## Features

- Random Side Quest generator
- Accept or reject generated Side Quests
- Quest Log for storing accepted Side Quests
- Active and Completed quest statuses
- Ability to complete an active Side Quest
- XP rewards for completed Side Quests
- Total XP display
- Ability to delete Side Quests

## Technologies Used

- HTML - Used to create the structure of the web application.
- CSS - Used to style the application and create the cosy, video-game-inspired visual design.
- JavaScript - Used to implement the application's interactive functionality.
- Node.js - Used to run the server-side JavaScript application.
- Express.js - Used to create the web server and REST API routes.
- SQLite - Used to store accepted Side Quest information.
- sqlite3 - Used to allow the Node.js application to communicate with the SQLite database.
- CORS - Used to allow communication between the frontend and backend.
- Visual Studio Code - Used as the development environment.

## How the Application Works

When the user opens Side Quest, they can view their current total XP and generate a new Side Quest.

The generator randomly selects an activity from a collection of possible Side Quests. The user can either accept the generated quest or reject it.

When a Side Quest is accepted, it is sent to the backend and stored in the SQLite database with an Active status and an XP value.

Accepted Side Quests are displayed in the Quest Log. The user can complete an active quest, which changes its status to Completed. Completed quests contribute their XP to the user's total XP.

Users can also delete quests from the Quest Log.

## How to Run the Application

Node.js must be installed to run Side Quest.

The required packages can be installed using:

npm install

The server can then be started using:

node index.js

The application will run on:

http://localhost:3000

## Project Structure

The main project files are organised as follows:

- `public/index.html` - Contains the structure of the Side Quest webpage.
- `public/style.css` - Contains the styling and visual design.
- `public/script.js` - Contains the frontend functionality and interaction.
- `public/side-quest-bg.png` - Contains the background image used by the application.
- `index.js` - Contains the Node.js and Express server, database connection and API routes.
- `package.json` - Contains the project information, scripts and required dependencies.

## Project Purpose

Side Quest was created to encourage users to take short, positive breaks from work or studying.

The project also provided an opportunity to develop programming skills by creating a web application using frontend and backend technologies, database integration and REST API functionality.