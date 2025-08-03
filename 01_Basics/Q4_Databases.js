/*
Q4: Databases in MongoDB

📌 Definition:
A database in MongoDB is a container for collections, 
which in turn store documents. It is the highest-level 
organizational unit.

📌 Concept:
- A single MongoDB server can host multiple databases.
- Each database is independent of others.
- Default DB: test
- Special system DBs:
  * admin → user authentication, roles, admin commands
  * local → local information, not replicated
  * config → stores sharding metadata

📌 Naming Rules:
- Use lowercase (recommended)
- Cannot be empty string
- Cannot contain / \ . " $ characters
- Maximum length: 64 bytes

📌 Common Commands:
1. Show all databases
   show dbs

2. Check current database
   db

3. Switch/Create a database
   use myDatabase

4. Drop (delete) current database
   db.dropDatabase()

5. Check database stats
   db.stats()
*/

// ----------------------
// Example Code
// ----------------------

// Switch to "school" database (creates when inserting docs)
use school

// Insert document into "students" collection (auto creates DB & collection)
db.students.insertOne({ name: "Sami", age: 22 })

// Show all databases
show dbs

// Display current database name
db

// Check database statistics
db.stats()

// Drop the current database (dangerous!)
db.dropDatabase()
