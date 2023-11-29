In this you need to implement few feature mandatory:
1. Api Throttling
2. Rate limiter
3. Middleware 
4. Interceptor
Make a simple application with user authorization and authentication with session
management.
In which one user is allowed to login to one device at a time only.
After successful login, the user sends his details in response and performs some actions on Get,
Post, Put, Patch And Delete. 
Do a proper error handling which follows a specific error format
to send as response and same with success response each and every response should be well formatted 
Push it in github and make a CI/CD work flow. 
What all you are required to do in workflow is that whenever the code is pushed or merged to master branch, print a
success response.

Feature Implemented
1. Nest.js 
2. Moongodb connection 
3. Auth apis (register and login)
4. Global Interceptor For error catching and authorizing requests