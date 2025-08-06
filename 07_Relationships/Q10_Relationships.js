/*
Q10: Relationships in MongoDB (One-to-One, One-to-Many, Many-to-Many)

📌 Definition:
Relationships define how documents in one collection relate 
to documents in another. In MongoDB, these are managed through
Embedding (storing data together) or Referencing (storing IDs).

📌 Types of Relationships:
1. One-to-One
   - One document relates to exactly one other document.
   - Use embedding for small, tightly-bound data.
   - Use referencing if data is large or optional.

2. One-to-Many
   - One document relates to multiple documents.
   - Use embedding for few items.
   - Use referencing for potentially large sets.

3. Many-to-Many
   - Many documents relate to many others.
   - Typically implemented using referencing with arrays of IDs.

📌 Tip:
- Embed for performance when the dataset is small and read together.
- Reference for flexibility when the dataset is large or grows over time.
*/

// ----------------------
// 1. One-to-One Example
// ----------------------

// Embedding
db.users.insertOne({
  _id: 1,
  name: "Sami",
  profile: { age: 22, bio: "MERN Developer" }
})

// Referencing
db.users.insertOne({ _id: 1, name: "Sami", profileId: 101 })
db.profiles.insertOne({ _id: 101, age: 22, bio: "MERN Developer" })

// ----------------------
// 2. One-to-Many Example
// ----------------------

// Embedding
db.customers.insertOne({
  _id: 1,
  name: "Ali",
  orders: [
    { item: "Laptop", price: 1200 },
    { item: "Mouse", price: 20 }
  ]
})

// Referencing
db.customers.insertOne({ _id: 1, name: "Ali" })
db.orders.insertMany([
  { _id: 201, customerId: 1, item: "Laptop", price: 1200 },
  { _id: 202, customerId: 1, item: "Mouse", price: 20 }
])

// ----------------------
// 3. Many-to-Many Example
// ----------------------
db.students.insertOne({ _id: 1, name: "Sami", courseIds: [101, 102] })
db.courses.insertMany([
  { _id: 101, title: "MongoDB" },
  { _id: 102, title: "React" }
])

// Aggregation Join to get student with courses
db.students.aggregate([
  {
    $lookup: {
      from: "courses",
      localField: "courseIds",
      foreignField: "_id",
      as: "enrolledCourses"
    }
  }
])
