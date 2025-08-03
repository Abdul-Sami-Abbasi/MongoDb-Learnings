/*
Q6: Data Modeling in MongoDB (Embedding vs Referencing)

📌 Definition:
Data Modeling in MongoDB is the process of structuring documents 
in collections for efficient storage and queries. 
The two main strategies are Embedding and Referencing.

📌 Embedding:
- Store related data in the same document.
- Best for "one-to-few" relationships and data usually read together.
- Faster reads, but documents can become large.

📌 Referencing:
- Store related data in different documents/collections, linked by IDs.
- Best for "one-to-many" or "many-to-many" relationships.
- Keeps documents small and flexible, but requires additional queries.

📌 When to Use:
- Use Embedding → small, frequently-read-together data (e.g., user with profile settings).
- Use Referencing → large, growing, or frequently updated data (e.g., blog posts with many comments).
*/

// ----------------------
// Example: Embedding
// ----------------------
db.posts.insertOne({
  _id: 1,
  title: "MongoDB Basics",
  author: "Sami",
  comments: [
    { user: "Ali", text: "Great post!" },
    { user: "Fatima", text: "Very helpful!" }
  ]
})

// ----------------------
// Example: Referencing
// ----------------------

// Posts collection
db.posts.insertOne({
  _id: 1,
  title: "MongoDB Basics",
  author: "Sami",
  commentIds: [101, 102]
})

// Comments collection
db.comments.insertMany([
  { _id: 101, postId: 1, user: "Ali", text: "Great post!" },
  { _id: 102, postId: 1, user: "Fatima", text: "Very helpful!" }
])

// Later, you can join with $lookup (aggregation)
db.posts.aggregate([
  {
    $lookup: {
      from: "comments",
      localField: "commentIds",
      foreignField: "_id",
      as: "postComments"
    }
  }
])
