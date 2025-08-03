/*
Q1: What is MongoDB and Important Topics in It?

📌 Definition:
MongoDB is an open-source, document-oriented NoSQL database 
that stores data in flexible, JSON-like documents instead of 
tables and rows. It uses BSON (Binary JSON) internally.

📌 Concept:
- MongoDB stores data as documents inside collections.
- Each document is a JSON-like object.
- Collections are like tables in SQL, but schema-less.
- MongoDB is popular in MERN stack because it works 
  naturally with JavaScript/Node.js.

📌 Why Use MongoDB?
- Flexible schema (no need to predefine fields).
- Scalable and high performance.
- JSON-friendly and easy to integrate with Node.js.
- Free + Cloud-ready (MongoDB Atlas).

📌 MongoDB Roadmap:
1. Basics → Databases, Collections, Documents
2. CRUD Operations → insert, find, update, delete
3. Data Modeling → embedding vs referencing
4. Indexes → faster queries
5. Aggregation Framework → advanced analytics
6. Schema Validation → using Mongoose
7. MongoDB Atlas → cloud deployment
8. Advanced Topics → Transactions, Replication, Sharding
*/

// ----------------------
// Example CRUD Operations
// ----------------------

// Insert a document
db.users.insertOne({ name: "Sami", age: 22, role: "Student" });

// Find documents
db.users.find({ age: { $gte: 20 } });

// Update a document
db.users.updateOne({ name: "Sami" }, { $set: { role: "MERN Developer" } });

// Delete a document
db.users.deleteOne({ name: "Sami" });
