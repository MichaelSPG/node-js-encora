Demo api using Node.js

Crear una aplicación en Express
1. Post => JSON con la información de un usuario, 
 El nombre debe tener mas de 6 caracteres y no debe tener caracteres especial, 
 es requerido el email. 
 Opcionalmente una dirección. 
 Agregar este objeto a un archivo JSON físico en el disco, no debe permitir elementos duplicados. '

3. GET => un método que me permita obtener los elementos guardados en el archivo JSON físico.

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

GET http://localhost:{PORT}/user
sample is GET http://localhost:{PORT}/user?limit=1&page=2
response could be
{
    "success": true,
    "message": [],
    "errors": []
}
or
{
    "success": true,
    "message": [
        {
            "id": "b7226e85-a54b-48ff-857c-31c6f2e9b2c8",
            "name": "Federeico",
            "email": "federeico@example.com",
            "address": "St 415"
        }
    ],
    "errors": []
}
