# Secret Manager

## backend todos

- [ ] docs

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
