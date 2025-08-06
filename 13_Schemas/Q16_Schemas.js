/*
Q16: Schemas in Mongoose

📌 Definition:
A Schema in Mongoose is a blueprint that defines the structure, 
validation, and behavior of documents in a MongoDB collection.
Schemas are used to create Models.

📌 Features:
- Define fields & their types
- Add validation rules
- Nested objects & arrays
- Relationships with references
- Custom methods
- Middleware (hooks)
*/

// ----------------------
// 1. Basic Schema
// ----------------------
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, min: 18, max: 60 },
  email: { type: String, unique: true, lowercase: true },
  createdAt: { type: Date, default: Date.now }
})

// ----------------------
// 2. Nested Schema Example
// ----------------------
userSchema.add({
  address: {
    street: String,
    city: String,
    zip: String
  }
})

// ----------------------
// 3. Array Example
// ----------------------
const blogSchema = new mongoose.Schema({
  title: String,
  tags: [String],
  comments: [{ body: String, date: Date }]
})

// ----------------------
// 4. References Example
// ----------------------
const postSchema = new mongoose.Schema({
  title: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
})

// ----------------------
// 5. Custom Validation Example
// ----------------------
const productSchema = new mongoose.Schema({
  price: {
    type: Number,
    validate: {
      validator: value => value > 0,
      message: "Price must be greater than 0"
    }
  }
})

// ----------------------
// 6. Custom Method Example
// ----------------------
userSchema.methods.sayHello = function() {
  return `Hello, my name is ${this.name}`
}

// ----------------------
// 7. Middleware Example
// ----------------------
userSchema.pre("save", function(next) {
  console.log(`Saving user: ${this.name}`)
  next()
})

// ----------------------
// 8. Create Model
// ----------------------
const User = mongoose.model("User", userSchema)
