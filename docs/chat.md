# Chat

Each chat message is stored as a single document. This allows us to push new messages to the client via `changes` api.

We use `urn:ott:chat:$GROUP_ID:msgs:$TIMESTAMP` as `_id`. This keeps the order of the messages, but also allows us to 
filter for a single target group.

The default `GROUP_ID` is `public` for the public chat.

**Example: Simple Chat Message** 
```json5
{
  _id: "urn:ott:chat:$GROUP:msg:$MESSAGE_TIMESTAMP",
  message: "Plain text chat message",
  timestamp: 123123123, // Unix EPOCH
  
  // Author is automatically added by server
  author: {
    name: "John Doe",
    id: "cryptical:userid:123234345" 
  }
}
```  

## Macros

You can add a macro to a message. Set `macro` to a well-known identifier. A macro can consume / modify any part of the
message object. It's recommended to use a `command` or `params` object to pass arguments to a macro. 

Macros are executed on server side. The result of a macro is added to the message before storing in the database.

**Example: Role dice** 
```json5
{
  _id: "urn:ott:chat:$GROUP:msg:$MESSAGE_TIMESTAMP",
  timestamp: 123123123, // Unix EPOCH

  macro: "role_dice",
  command: "4d6",
  
  // Author is automatically added by server
  author: {
    name: "John Doe",
    id: "cryptical:userid:123234345" 
  }
}
```  

**Example: Role dice (after execution)** 
```json5
{
  _id: "urn:ott:chat:$GROUP:msg:$MESSAGE_TIMESTAMP",
  timestamp: 123123123, // Unix EPOCH

  macro: "role_dice",
  command: "4d6",

  // This is the result of the macro execution.
  roll_dice: {
  
  },
  
  // Author is automatically added by server
  author: {
    name: "John Doe",
    id: "cryptical:userid:123234345" 
  }
}
```  

> These macro result properties cannot be set directly. If you add one of those props to a message the server will 
> automatically delete those. Thus, as a client you can trust that the `role_dice` prop is only set by the server.
  