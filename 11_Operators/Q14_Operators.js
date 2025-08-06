/*
Q14: Operators in MongoDB

📌 Definition:
Operators are special keywords in MongoDB queries and updates 
that allow filtering, modifying, and aggregating data. 
They always start with a "$" symbol.

📌 Categories:

1. Comparison Operators:
- $eq, $ne, $gt, $gte, $lt, $lte, $in, $nin

2. Logical Operators:
- $and, $or, $not, $nor

3. Element Operators:
- $exists, $type

4. Array Operators:
- $all, $elemMatch, $size

5. Update Operators:
- $set, $unset, $inc, $push, $pull, $addToSet

6. Aggregation Operators:
- $sum, $avg, $min, $max, $push, $addToSet
*/

// ----------------------
// Comparison Operators
// ----------------------
db.students.find({ age: { $gt: 20 } })
db.students.find({ course: { $in: ["MongoDB", "React"] } })

// ----------------------
// Logical Operators
// ----------------------
db.students.find({ $and: [{ age: { $gte: 18 } }, { course: "MongoDB" }] })
db.students.find({ $or: [{ age: { $lt: 18 } }, { course: "React" }] })

// ----------------------
// Element Operators
// ----------------------
db.students.find({ email: { $exists: true } })
db.students.find({ age: { $type: "int" } })

// ----------------------
// Array Operators
// ----------------------
db.students.find({ skills: { $all: ["Node.js", "MongoDB"] } })
db.students.find({ scores: { $elemMatch: { $gte: 80, $lte: 90 } } })
db.students.find({ skills: { $size: 3 } })

// ----------------------
// Update Operators
// ----------------------
db.users.updateOne({ name: "Ali" }, { $inc: { balance: 500 } })
db.users.updateOne({ name: "Sami" }, { $set: { course: "MERN" } })
db.users.updateOne({ name: "John" }, { $unset: { email: "" } })
db.users.updateOne({ name: "Ali" }, { $push: { skills: "Express.js" } })
db.users.updateOne({ name: "Ali" }, { $pull: { skills: "PHP" } })
db.users.updateOne({ name: "Ali" }, { $addToSet: { skills: "React" } })

// ----------------------
// Aggregation Operators
// ----------------------
db.students.aggregate([
  { $group: { _id: "$course", total: { $sum: 1 }, avgAge: { $avg: "$age" } } }
])
