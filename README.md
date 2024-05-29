## Frontend Instructions:

Setting up the frontend environment:

1. cd into the lang2views-frontend directory.
2. Type "npm i" into the terminal. This installs the dependencies.

Running the frontend website:

1. Type "npm run dev". This runs the web app.

## Backend Instructions

Setting up the backend environment:

1. cd into the lang2views-backend directory.
2. Type "npm i" into the terminal. This installs the dependencies.

Running the server:

1. cd into the lang2views-backend directory.
2. Type "npm run build" to build the app.
3. Type "npm run start" to run the server.

OR 

3. Type "npm run detached" to run the server in detached mode.

Running tests:

1. cd into the lang2views-backend directory.
2. Type "npm run test" to run all jest tests inside the test folder

Stopping the server when run in detached mode:

1. cd into the lang2views-backend directory.
2. Type "pkill -f src/app.js" to kill all processing running the server

---

To run both the backend and the frontend, make sure you run the backend in detached mode so you can run the frontend afterwards.