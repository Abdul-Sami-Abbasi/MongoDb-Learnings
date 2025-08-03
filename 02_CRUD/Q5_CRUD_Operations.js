/*
Q5: CRUD Operations in MongoDB (Detailed)

📌 Definition:
CRUD stands for Create, Read, Update, and Delete. 
These are the four basic operations to manage documents in MongoDB.

📌 Concept:
1. Create → Add documents (insertOne, insertMany)
2. Read   → Fetch documents (find, findOne, projection, sort, limit)
3. Update → Modify documents (updateOne, updateMany, replaceOne)
4. Delete → Remove documents (deleteOne, deleteMany)

📌 Notes:
- Each document has a unique "_id".
- MongoDB uses BSON internally for efficient storage.
- Be careful with deleteMany to avoid removing large amounts of data.
- Use .pretty() with find() for formatted output.
*/

// ----------------------
// CREATE
// ----------------------
db.students.insertOne({ name: "Sami", age: 22, course: "MERN" })
db.students.insertMany([
  { name: "Ali", age: 21, course: "Node.js" },
  { name: "Fatima", age: 23, course: "React" }
])

// ----------------------
// READ
// ----------------------
// Fetch all documents
db.students.find()

// Fetch one document
db.students.findOne({ name: "Ali" })

// Conditional query: students age >= 22
db.students.find({ age: { $gte: 22 } })

// Projection: only name & course, hide _id
db.students.find({}, { name: 1, course: 1, _id: 0 })

// Sort results by age descending
db.students.find().sort({ age: -1 })

// Limit results to 2
db.students.find().limit(2)

// ----------------------
// UPDATE
// ----------------------
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

// Replace entire document
db.students.replaceOne(
  { name: "Ali" }, 
  { name: "Ali", age: 22, course: "MongoDB" }
)

// ----------------------
// DELETE
// ----------------------
// Delete one document
db.students.deleteOne({ name: "Fatima" })

// Delete multiple documents
db.students.deleteMany({ course: "Node.js" })
