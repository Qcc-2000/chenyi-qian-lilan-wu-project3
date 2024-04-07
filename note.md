```
json

User{
  username
  password
}


Password:{
  owner: string
  url: string,
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
