# 330-final-project

## Update:
   What has been done so far:
   - started setting up some files
      - reused code from week 5's assignment for user and login.
      - set up package.json and the necessary dependencies
      - express server and mongo connection are set up

   What still needs to be done:
   - most of the functionality
   - incorporating frontend to the backend
   - need to fill up database with the data I will be using from the API

## Proposal (stretch goal)
   notes after meeting:
   <br>
   - need mongo and CRUD, need additional thing
   - allow users to save posts
   - my database can have the saved posts
   - API allows people to write comments for the job post/company
   - allow users to have additional information
   - [extend the data thats already available]
   - have a field for "flagged" for users
   - CRUD route for admin to edit users

1. A description of the scenario your project is operating in.
   <br>
   - Extension of my final project
   - Job search app using external api (Adzuna) and google maps api

2. A description of what problem your project seeks to solve.
   <br>
   - Search and store job posts

3. A description of what the technical components of your project will be, including: the routes, the data models, any external data sources you'll use, etc.
   <br>
   - Mongo, react, next.js

4. Clear and direct call-outs of how you will meet the various project requirements.
   <br>
   - [Similar to the 1st proposal]
   - I will use an external API
   - Authentication and Authorization
   - 2 sets of CRUD routes
      - Users:
         - POST - signup and create new users
         - POST - signin
         - POST - change password
         - GET - get users
      - Job Posts:
         - GET - get job posts
         - POST - save job post to saved list
         - PUT - update job posts in saved list
   - Text search, aggregations, and lookups
      - search for blog posts using mongoose
   - Tests for all the CRUD routes
      - I will attempt TDD if possible
   - A saved Postman collection
   - Front end will be using react and next.js

5. A timeline for what project components you plan to complete, week by week, for the remainder of the class.
   <br>
   week 1: get back-end mongo set up
   week 2: get functional prototype ready
   week 3: set up react and next.js
   week 4: clean up any issues and bugs
