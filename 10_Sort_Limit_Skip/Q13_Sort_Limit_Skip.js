/*
Q13: MongoDB sort(), limit(), skip()

📌 Definition:
- sort(): Orders documents by specified field(s).
- limit(): Restricts number of documents returned.
- skip(): Skips a given number of documents.
Together, they are commonly used for pagination.

📌 Concept:
- sort({ field: 1 }) → Ascending
- sort({ field: -1 }) → Descending
- limit(n) → Return only n documents
- skip(n) → Skip first n documents
- skip + limit → Pagination

📌 Pagination Formula:
skip = (pageNumber - 1) * pageSize
limit = pageSize
*/

// ----------------------
// sort() Examples
// ----------------------
db.students.find().sort({ age: 1 })     // Ascending order by age
db.students.find().sort({ age: -1 })    // Descending order by age
db.students.find().sort({ age: 1, name: -1 }) // Multi-field sort

// ----------------------
// limit() Example
// ----------------------
db.students.find().limit(5)             // First 5 students

// ----------------------
// skip() Example
// ----------------------
db.students.find().skip(5)              // Skip first 5 students

// ----------------------
// Pagination Example (page 2, 5 students per page)
// ----------------------
db.students.find().skip(5).limit(5)

// ----------------------
// Using with Aggregation
// ----------------------
db.students.aggregate([
  { $sort: { age: -1 } },
  { $skip: 5 },
  { $limit: 5 }
])
