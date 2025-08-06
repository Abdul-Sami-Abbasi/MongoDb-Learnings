/*
Q17: Models in Mongoose

📌 Definition:
A Model in Mongoose is a compiled version of a Schema. 
It represents a MongoDB collection and provides methods 
to create, read, update, and delete documents.

📌 Features:
- Based on a Schema
- Provides CRUD operations
- Supports static and instance methods
- Works with relationships using populate()
*/

// ----------------------
// 1. Create Schema & Model
// ----------------------
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  email: { type: String, unique: true }
})

// Static Method
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email })
}

// Instance Method
userSchema.methods.sayHello = function() {
  return `Hello, my name is ${this.name}`
}

const User = mongoose.model("User", userSchema)

// ----------------------
// 2. CRUD Examples
// ----------------------
async function main() {
  // Create
  const newUser = new User({ name: "Sami", age: 22, email: "sami@mail.com" })
  await newUser.save()

  // Read
  const users = await User.find({ age: { $gte: 18 } })
  console.log("Users:", users)

  // Update
  await User.updateOne({ name: "Sami" }, { $set: { age: 23 } })

  // Delete
  await User.deleteOne({ name: "Sami" })

  // Using Static Method
  const ali = await User.findByEmail("ali@mail.com")
  console.log("Found User:", ali)

  // Using Instance Method
  const sami = new User({ name: "Sami" })
  console.log(sami.sayHello())
}

main()

// ----------------------
// 3. Relationships with populate()
// ----------------------
const postSchema = new mongoose.Schema({
  title: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
})
const Post = mongoose.model("Post", postSchema)

async function fetchPosts() {
  const posts = await Post.find().populate("author")
  console.log("Posts with author details:", posts)
}
