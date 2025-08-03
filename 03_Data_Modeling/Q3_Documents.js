/*
Q3: Documents in MongoDB

📌 Definition:
A document in MongoDB is a JSON-like record stored in a collection. 
Internally, it uses BSON (Binary JSON) for efficiency.

📌 Concept:
- Each document is made up of key-value pairs.
- Every document has a unique "_id" field (auto-generated if not provided).
- Documents can contain nested objects and arrays.
- Documents in the same collection can have different fields.

📌 Example Document:
{
  "_id": ObjectId("64f8f0b2f6c2a12345678901"),
  "name": "Sami",
  "age": 22,
  "skills": ["JavaScript", "React", "MongoDB"],
  "isStudent": true,
  "address": { "city": "Karachi", "country": "Pakistan" }
}

📌 Common Operations:
1. Insert → insertOne, insertMany
2. Read   → find, findOne, projection
3. Update → updateOne, updateMany
4. Delete → deleteOne, deleteMany
*/

// ----------------------
// Example Code
// ----------------------

// Insert one document
db.students.insertOne({ name: "Sami", age: 22, course: "MERN" })

// Insert multiple documents
db.students.insertMany([
  { name: "Ali", age: 21, course: "Node.js" },
  { name: "Fatima", age: 23, course: "React" }
])

// Find all documents
db.students.find()

// Find one document
db.students.findOne({ name: "Ali" })

// Projection (return only name & course fields, exclude _id)
db.students.find({}, { name: 1, course: 1, _id: 0 })

// Update one document
db.students.updateOne(
  { name: "Sami" },
  { $set: { course: "Full Stack Development" } }
)

// Update multiple documents
db.students.updateMany(
  { course: "React" },
  { $set: { level: "Intermediate" } }
)

// Delete one document
db.students.deleteOne({ name: "Ali" })

// Delete multiple documents
db.students.deleteMany({ course: "Node.js" })
