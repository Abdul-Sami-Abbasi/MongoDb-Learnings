/*
Q7: Indexes in MongoDB

📌 Definition:
An index is a data structure that improves query performance 
by allowing MongoDB to quickly locate documents without scanning 
the entire collection.

📌 Concept:
- MongoDB automatically creates a default index on the "_id" field.
- Indexes are stored as B-trees.
- Without indexes → COLLSCAN (collection scan).
- With indexes → IXSCAN (index scan).

📌 Types of Indexes:
1. Single Field Index
2. Compound Index
3. Text Index
4. Unique Index
5. Hashed Index (for sharding)

📌 Commands:
- Create Index:
    db.collection.createIndex({ field: 1 })
- Show Indexes:
    db.collection.getIndexes()
- Drop Index:
    db.collection.dropIndex({ field: 1 })
- Drop All Indexes:
    db.collection.dropIndexes()
- Explain Query Performance:
    db.collection.find(query).explain("executionStats")

📌 Tip:
Use indexes for fields that are queried often, but avoid over-indexing.
*/

// ----------------------
// Example Code
// ----------------------

// Single Field Index on "age"
db.students.createIndex({ age: 1 })

// Compound Index on "age" (asc) and "name" (desc)
db.students.createIndex({ age: 1, name: -1 })

// Text Index on "title" and "content"
db.articles.createIndex({ title: "text", content: "text" })

// Unique Index on "email"
db.users.createIndex({ email: 1 }, { unique: true })

// Hashed Index (useful for sharding)
db.students.createIndex({ studentId: "hashed" })

// Show all indexes in "students"
db.students.getIndexes()

// Drop single index
db.students.dropIndex({ age: 1 })

// Drop all indexes in "students"
db.students.dropIndexes()

// Check query performance
db.students.find({ age: 22 }).explain("executionStats")
