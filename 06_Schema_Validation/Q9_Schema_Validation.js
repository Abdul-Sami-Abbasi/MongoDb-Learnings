/*
Q9: Schema Validation in MongoDB (with Mongoose)

📌 Definition:
Schema Validation ensures documents follow a set of rules (types, ranges, required fields).
MongoDB is schema-less by default, but we can enforce structure using:
1. MongoDB's built-in JSON Schema validation.
2. Mongoose (ODM) in Node.js.

📌 MongoDB JSON Schema Example:
db.createCollection("students", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "age", "course"],
      properties: {
        name: { bsonType: "string" },
        age: { bsonType: "int", minimum: 18 },
        course: { bsonType: "string" }
      }
    }
  }
})

📌 Mongoose Schema Example:
- Required fields
- Min/Max for numbers
- MinLength/MaxLength for strings
- Enum for allowed values
- Regex for format matching
- Unique constraint
*/

// ----------------------
// Mongoose Example
// ----------------------

const mongoose = require("mongoose")

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/school")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("Connection Error:", err))

// Define Schema
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Name must be at least 3 characters long"]
  },
  age: {
    type: Number,
    min: [18, "Minimum age is 18"],
    max: [60, "Maximum age is 60"]
  },
  course: {
    type: String,
    enum: ["MERN", "Node.js", "React", "MongoDB"],
    required: true
  },
  email: {
    type: String,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// Create Model
const Student = mongoose.model("Student", studentSchema)

// Example Insert
Student.create({ name: "Sami", age: 22, course: "MERN", email: "sami@gmail.com" })
  .then(doc => console.log("Student Saved:", doc))
  .catch(err => console.error("Validation Error:", err.message))

// Example Invalid Insert (age too low)
Student.create({ name: "Ali", age: 15, course: "Node.js", email: "ali@gmail.com" })
  .catch(err => console.error("Validation Error:", err.message))
