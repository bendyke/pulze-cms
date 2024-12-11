# 🚀 Credit Management System API

A Node.js Express API for managing user credits with automatic expiration and batch management capabilities.


## 🛠️ Setup

### Prerequisites
- Docker & Docker Compose
- Node.js (v18+)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies
```bash
npm install
```

3. Setup environment variables
```bash
cp .env.example .env
```

4. Start MongoDB using Docker
```bash
docker run --name pulze-cms -d -p 27017:27017 mongo:latest
```

## 🔧 Environment Configuration

Configure your `.env` file with the following variables:
<br><i>Note: .env.example comes with these filled out for you</i>
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/pulze-cms
NODE_ENV=development
```

## 🏃‍♂️ Running the Application

Running Development mode:
```bash
npm run dev
```

<i>Note: Production mode not supported yet.</i>




## 📋 Models

### User Model
```typescript
interface User {
id: ObjectId;
name: string;
email: string;
createdAt: Date;
updatedAt: Date;
}
```

### Credit Batch Model
```typescript
interface CreditBatch {
  _id: ObjectId;
  userId: ObjectId;
  totalCredits: number;
  remainingCredits: number;
  expirationDate: Date;
  grant_event_type: CreditGrantEventType;
  createdAt: Date;
  updatedAt: Date;
}
```

## 🚪 API Endpoints - Swagger is recommended in the future!

### User Routes
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Credit Batch Routes
- `GET /api/credit-batches` - Get all credit batches
- `GET /api/credit-batches/:id` - Get credit batch by ID
- `POST /api/credit-batches` - Create new credit batch
- `PUT /api/credit-batches/:id` - Update credit batch
- `DELETE /api/credit-batches/:id` - Delete credit batch

#### Special Credit Operations
- `GET /api/credit-batches/user/:userId` - Get all credit batches for a specific user
- `POST /api/credit-batches/consume/:userId` - Consume credits for a user
  ```json
  // Request body example
  {
    "creditsToConsume": 100
  }
  ```

---
Made with ❤️ by Bendeguz Kassai