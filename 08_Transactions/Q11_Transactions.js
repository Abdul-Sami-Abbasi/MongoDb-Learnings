/*
Q11: Transactions in MongoDB

📌 Definition:
A transaction is a sequence of operations executed as a single unit of work.
MongoDB transactions guarantee ACID properties:
- Atomicity: All or nothing
- Consistency: Database remains valid
- Isolation: Transactions don't interfere
- Durability: Committed changes persist

📌 Concept:
- Supported in replica sets (4.0+) and sharded clusters (4.2+).
- Use sessions to run transactions.
- Default MongoDB operations are atomic at the document level,
  but transactions extend atomicity to multiple documents/collections.

📌 Steps:
1. Start a session
2. Start a transaction
3. Perform operations
4. Commit or abort transaction

📌 When to Use:
- Multi-collection updates (e.g., banking transfers, e-commerce orders)
- When strict data consistency is required
- Avoid for single-document operations (already atomic)
*/

// ----------------------
// Node.js with Mongoose Example
// ----------------------
const mongoose = require("mongoose")

async function runTransaction() {
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    await Account.updateOne(
      { name: "Ali" },
      { $inc: { balance: -100 } },
      { session }
    )

    await Account.updateOne(
      { name: "Sami" },
      { $inc: { balance: 100 } },
      { session }
    )

    await session.commitTransaction()
    console.log("Transaction Successful")
  } catch (err) {
    await session.abortTransaction()
    console.error("Transaction Aborted:", err.message)
  } finally {
    session.endSession()
  }
}

runTransaction()

// ----------------------
// MongoDB Shell Example
// ----------------------
session = db.getMongo().startSession()
studentsColl = session.getDatabase("school").students
coursesColl = session.getDatabase("school").courses

session.startTransaction()

try {
  studentsColl.insertOne({ name: "Ali", course: "MongoDB" })
  coursesColl.updateOne({ title: "MongoDB" }, { $inc: { enrolled: 1 } })
  session.commitTransaction()
  print("Transaction committed")
} catch (e) {
  session.abortTransaction()
  print("Transaction aborted due to error:", e)
}
