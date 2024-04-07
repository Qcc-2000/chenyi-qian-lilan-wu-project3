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
API
  [user]
    post: /signup {username, password}
    post: /login
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
