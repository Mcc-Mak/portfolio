db.createUser(
   {
     user: "change_me",
     pwd: "change_me",
     roles: [ { role: 'root', db: 'admin' } ],
   }
)

db.getUsers()
