# BankQL - GraphQL Banking Backend

🚀 A full banking-style backend API built with Koa.js, Apollo GraphQL Server, MongoDB (Mongoose), and Redis PubSub, fully typed with TypeScript.

Built from scratch following clean architecture principles.

---

## 📚 Tech Stack

- **Backend:** Node.js, Koa.js
- **API:** Apollo Server (GraphQL)
- **Database:** MongoDB (with Mongoose ORM)
- **Realtime PubSub:** Redis (wired, ready for Subscriptions)
- **Language:** TypeScript
- **Development Server:** ts-node-dev

---

## 🧠 Features

- Create Accounts with initial balances
- Create Transactions between Accounts
- Query all Accounts
- Query all Transactions
- MongoDB population of sender and receiver Accounts inside Transactions
- Clean modular structure ready for production scale
- Redis PubSub wired for future real-time GraphQL Subscriptions

---

## 🏦 Architecture Overview

```plaintext
[Account] <---> [Transaction] <---> [Account]
    ^                                        ^
    |                                         |
Create Account                        Create Transaction
    |                                         |
GraphQL Mutation --------------------> Resolver
            |
        MongoDB

## Project Structure

```plaintext
backend/
├── src/
│   ├── db/
│   │   ├── mongoose.ts
│   │   └── models/
│   │       ├── account.model.ts
│   │       └── transaction.model.ts
│   ├── graphql/
│   │   └── index.ts
│   ├── pubsub/
│   │   └── redis.ts
│   └── server.ts
├── .env
├── package.json
├── tsconfig.json
├── docker-compose.yml (optional for Mongo + Redis setup)
```

## 📖 Example Queries

```graphql
mutation {
  createAccount(name: "Luis", balance: 1000) {
    id
    name
    balance
  }
}
```

```graphql
mutation {
  createTransaction(
    senderAccountId: "ACCOUNT_ID_1",
    receiverAccountId: "ACCOUNT_ID_2",
    amount: 200
  ) {
    id
    amount
    createdAt
    senderAccount {
      name
    }
    receiverAccount {
      name
    }
  }
}
```

```graphql
query {
  transactions {
    id
    amount
    createdAt
    senderAccount {
      name
    }
    receiverAccount {
      name
    }
  }
}
```
