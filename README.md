Demo api using Node.js

For adding a user

POST http://localhost:{PORT}/user/
{
    "name": "Federeico",
    "email": "Federeico@example.com",
    "address": "St 415"
}

if user is valid response would be 

{
    "success": true,
    "message": {
        "name": "Federeico",
        "email": "federeico@example.com",
        "address": "St 415"
    },
    "errors": []
}

if not response would be :
{
    "message": {},
    "success": false,
    "errors": [
        "Error: A user with this email already exists."
    ]
}
