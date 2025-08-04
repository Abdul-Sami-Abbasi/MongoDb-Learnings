/*
Q8: Aggregation Framework in MongoDB

📌 Definition:
The Aggregation Framework is a pipeline-based system in MongoDB 
for processing, transforming, and analyzing data.

📌 Concept:
- Documents pass through a sequence of stages (pipeline).
- Each stage performs an operation (filter, group, sort, join, etc.).
- Similar to SQL's GROUP BY and JOIN, but more flexible.

📌 Common Stages:
1. $match   → Filter documents
2. $project → Select fields / reshape documents
3. $group   → Group by field and apply accumulators ($sum, $avg, $min, $max)
4. $sort    → Sort results
5. $limit   → Limit documents
6. $skip    → Skip documents
7. $lookup  → Join with another collection
8. $unwind  → Break arrays into multiple documents

📌 Accumulators (for $group):
- $sum → total
- $avg → average
- $min / $max → min or max value
- $push → create array of values
- $addToSet → unique array of values
*/

// ----------------------
// Example 1: Count students per course
// ----------------------
db.students.aggregate([
  { $group: { _id: "$course", total: { $sum: 1 } } }
])

// ----------------------
// Example 2: Filter students age >= 22 and sort by name
// ----------------------
db.students.aggregate([
  { $match: { age: { $gte: 22 } } },
  { $sort: { name: 1 } }
])

// ----------------------
// Example 3: Join with Courses Collection
// ----------------------
db.students.aggregate([
  {
    $lookup: {
      from: "courses",
      localField: "courseId",
      foreignField: "_id",
      as: "courseDetails"
    }
  }
])

// ----------------------
// Example 4: Average age per course
// ----------------------
db.students.aggregate([
  { $group: { _id: "$course", avgAge: { $avg: "$age" } } }
])

// ----------------------
// Example 5: Unwind skills array to count individual skills
// ----------------------
db.students.aggregate([
  { $unwind: "$skills" },
  { $group: { _id: "$skills", totalStudents: { $sum: 1 } } }
])
