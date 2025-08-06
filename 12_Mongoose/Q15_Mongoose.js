/*
Q15: What is Mongoose?

📌 Definition:
Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.
It provides a schema-based way to model application data.

📌 Features:
- Schemas for defining data structure
- Models to represent MongoDB collections
- Validation for data integrity
- Middleware (hooks) for pre/post operations
- Population to manage relationships
*/

// ----------------------
// 1. Connect to MongoDB
// ----------------------
const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/myDatabase")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("Connection Error:", err))

// ----------------------
// 2. Define a Schema
// ----------------------
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, min: 18 },
  email: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now }
})

// Middleware Example
userSchema.pre("save", function(next) {
  console.log("Saving user:", this.name)
  next()
})

// ----------------------
// 3. Create a Model
// ----------------------
const User = mongoose.model("User", userSchema)

// ----------------------
// 4. CRUD Operations
// ----------------------
async function main() {
  // Create
  await User.create({ name: "Sami", age: 22, email: "sami@mail.com" })

  // Read
  const users = await User.find({ age: { $gte: 18 } })
  console.log("Users:", users)

  // Update
  await User.updateOne({ name: "Sami" }, { $set: { age: 23 } })

  // Delete
  await User.deleteOne({ name: "Sami" })
}

main()

// ----------------------
// 5. Relationships Example with populate()
// ----------------------
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
})
const Post = mongoose.model("Post", postSchema)

// Example: Fetch posts with author details
async function fetchPosts() {
  const posts = await Post.find().populate("author")
  console.log("Posts with authors:", posts)
}
