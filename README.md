Requesting data:

Both the /signup and /login endpoints take username and password query parameters.

examples:

https://cs361authenticator-2718ea176011.herokuapp.com/signup?username=INSERT-USER-NAME&password=INSERT-PASSWORD
https://cs361authenticator-2718ea176011.herokuapp.com/login?username=INSERT-USER-NAME&password=INSERT-PASSWORD

both query parameters expect a string

The signup request will send the username and password to storage and the login request will validate the provided credentials

Receiving data:

Possible signup responses:
<status: 201, body: credentials already exist>, 
<staus: 500, body: Server side error, please retry>, 
<status: 201, body: success>,
<status: 500, body: fail>

The top 2 responses correspond to checking if the signup credentials already exist, and the bottom 2 respond to a request to add the credentials to storage.

Possible login responses:
<status: 201, body: valid>, 
<status: 201, body: invalid>,
<status: 500, body: Server side error, please retry>

The response will be 'valid' if the credentials exist in storage and 'invalid' if the credentials do not exist.

signup endpoint:
![image](https://github.com/alexeyjleeper/authentication_microservice/assets/144415710/a8067fb5-dba8-4ec7-80a8-297e256f0d63)

login endpoint:
![image](https://github.com/alexeyjleeper/authentication_microservice/assets/144415710/7d88c493-a96e-498c-9b9b-16c2621df9f6)

