# 💡 Consistency and Transactions in Banking APIs

---

## 1. What is Consistency in Databases?

**Consistency** ensures your data remains correct and reliable, even in the face of errors, crashes, or concurrent operations.

> **Example (Banking App):**  
> Money should never disappear or be created out of thin air.  
> If ₹100 is transferred from A to B, A’s balance must decrease by ₹100 and B’s must increase by ₹100—**both must happen, or neither.**

---

## 2. The Problem Without Transactions

If you update the sender’s balance first, and then the server crashes before updating the receiver’s balance, the money is lost from the sender but not credited to the receiver.

**This is called an _inconsistent state_.**

---

## 3. What is a Transaction?

A **transaction** is a sequence of operations performed as a single logical unit of work.

### ACID Properties of Transactions

- **Atomicity:** All operations in a transaction succeed, or none do (all-or-nothing).
- **Consistency:** The database moves from one valid state to another.
- **Isolation:** Concurrent transactions do not interfere with each other.
- **Durability:** Once committed, changes are permanent, even if the system crashes.

---

## 4. How to Ensure Consistency: Using Transactions

In MongoDB (and most databases), you can use **transactions** to group multiple operations.

> If any operation in the transaction fails, the entire transaction is rolled back, and the database returns to its previous state.

---

## 5. How to Implement Transactions in MongoDB with Mongoose

- Use `session` and `startTransaction()`:
    - This ensures that either **both balances are updated, or neither is**.

---

## 6. Topics to Understand for Consistency

- ACID properties
- Database transactions
- Error handling and rollback
- Concurrency and isolation
- Idempotency (handling repeated requests safely)
- Atomic operations

---

## 📝 Summary

- Without transactions, your app can **lose or duplicate money** if a crash happens mid-operation.
- Transactions guarantee that your operations are **atomic and consistent**.
- **Always use transactions** for multi-step operations that must succeed or fail as a unit—especially in financial applications.

---

## 🚀 Example: MongoDB Transaction with Node.js

Below is a sample code that demonstrates how to use transactions in MongoDB using the native Node.js driver:

```js
const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function runTransaction() {
  const session = client.startSession();

  try {
    await session.withTransaction(async () => {
      const usersCollection = client.db('mydb').collection('users');
      const ordersCollection = client.db('mydb').collection('orders');

      // Operation 1: Insert a new user
      const userResult = await usersCollection.insertOne(
        { name: 'Sahil' },
        { session }
      );

      // Operation 2: Create an order for the new user
      await ordersCollection.insertOne(
        {
          userId: userResult.insertedId,
          amount: 1000,
        },
        { session }
      );
    });

    console.log('Transaction committed successfully!');
  } catch (err) {
    console.error('Transaction aborted due to error:', err);
  } finally {
    await session.endSession();
    await client.close();
  }
}

runTransaction();
```

### 🧩 **Code Explanation**

- **Start a Session:**  
  `const session = client.startSession();`  
  Sessions are required to use transactions in MongoDB.

- **Begin Transaction:**  
  `session.withTransaction(async () => { ... })`  
  All operations inside this function are part of a single transaction.

- **Operation 1:**  
  Insert a new user into the `users` collection.

- **Operation 2:**  
  Insert a new order for the user into the `orders` collection.

- **Rollback on Failure:**  
  If any operation fails, MongoDB automatically aborts the transaction and rolls back all changes.

- **Commit on Success:**  
  If all operations succeed, the transaction is committed and changes are saved.

---

> **Tip:**  
> Always use transactions for multi-step operations that must be atomic, especially in financial or critical systems.

