/*
Q2: MongoDB Collection Information

📌 Definition:
A collection in MongoDB is a group of documents stored inside a database. 
It is similar to a table in SQL but does not enforce a fixed schema.

📌 Concept:
- Database → container of collections
- Collection → container of documents
- Document → JSON-like record

👉 Key Feature: Documents in the same collection can have different fields.

📌 Collection Commands:

1. Show All Collections
   show collections

2. Create a Collection
   db.createCollection("students")

3. Insert Document (auto-creates collection if not exists)
   db.students.insertOne({ name: "Ali", age: 21, course: "MERN" })

4. Get Collection Info
   db.getCollectionInfos()

5. Drop (Delete) a Collection
   db.students.drop()

📌 Collection Stats Example:
   db.students.stats()
   // Returns document count, size, indexes, etc.
*/

// ----------------------
// Example Code
// ----------------------

// Create a collection explicitly
db.createCollection("students")

// Insert document (auto creates if not exists)
db.students.insertOne({ name: "Ali", age: 21, course: "MERN" })

// Show all collections in current database
show collections

// Get metadata about all collections
db.getCollectionInfos()

// Get stats for the "students" collection
db.students.stats()

// Drop the collection
db.students.drop()
