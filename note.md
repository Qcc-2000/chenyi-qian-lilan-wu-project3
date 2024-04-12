```
json

User{
  username
  password
}


Password:{
  owner: string
  url: string,
  password: string,
  update_date: Date,
  shared_with : [
    username: string
  ]
}


Message{
  sender
  receiver
}
```

```
  [user]
    post: /signup {username, password}
    post: /login  {username, password}
    post: /logout
  [message]
    get: /messages/:username
    post: /messages  {sender, receiver}
    post: /message/:messageId   {accept: true}
  [password]
    get: /passwords/:username
    post: /passwords/ {owner, url, password}
    put: /password/:passwordId {url, password}
    delete: /password/:passwordId
```

https://blog.logrocket.com/documenting-express-js-api-swagger/#creating-api-model

https://www.mongodb.com/developer/languages/javascript/getting-started-with-mongodb-and-mongoose/#update-data

## How authentication works

### Backend

when user login, after the verification, it will use JWT to generate a token and send it to the frontend. In this project, we directly use `res.cookie("username", token);` to store the token in the browser cookie storage.

### Frontend

```js
fetch("https://example.com/api/protected/data", {
  method: "GET",
  credentials: "same-origin", // Include cookies in the request if the request is to the same origin
});
```
