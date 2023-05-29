# 330-final-project

## 1st proposal
notes after meeting:
   <br>
   - Needs more CRUD routes
   - [ideas] -> make it a forum, admin deletes a post
   - [ideas] -> blog object, comment object relating to each other

1. A description of the scenario your project is operating in.
   <br>
   - Blog

2. A description of what problem your project seeks to solve.
   <br>
   - Easy to use blog posts

3. A description of what the technical components of your project will be, including: the routes, the data models, any external data sources you'll use, etc.
   <br>
   - Mongo, reaxt, next.js

4. Clear and direct call-outs of how you will meet the various project requirements.
   <br>
   - Authentication and Authorization
   - 2 sets of CRUD routes
      - Users:
         - POST - signup and create new users
         - POST - signin
         - POST - change password
         - GET - get users
      - Blog Posts:
         - GET - get blog posts
         - POST - create new blog post
         - PUT - update blog posts
   - Text search, aggregations, and lookups
      - Search for blog posts using mongoose
   - Tests for all the CRUD routes
      - I will attempt TDD if possible
   - A saved Postman collection
   - Front end will be using react and next.js

5. A timeline for what project components you plan to complete, week by week, for the remainder of the class.
   <br>
   - Week 1: get back-end mongo set up
   - Week 2: get functional prototype ready
   - Week 3: set up react and next.js
   - Week 4: clean up any issues and bugs

## 2nd proposal (stretch goal)
   notes after meeting:
   <br>
   - need mongo and CRUD, need additional thing
   - allow users to save posts
   - my database can have the saved posts
   - API allows people to write comments for the job post/company
   - allow users to have additional information
   - [extend the data thats already available]

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
