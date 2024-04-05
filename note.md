- User：

  - userName (P)
  - password

- Password:

  - passwordId (P)
  - userName
  - url
  - password

- Message:

  - messageId (P)
  - senderName
  - recieverName

- Share:

  - shareId (P)
  - owner
  - sharer

- API
  post: /signup
  post: /login
  post: /logout
  get: /messages
  get: /passwords
  post: /addPassword
  delete: /deletePassword/:passwordId
  put: /updatePassword/:passwordId
  post: /message/:messageId?accept=true
  post: /message/:meesageId?accept=false
