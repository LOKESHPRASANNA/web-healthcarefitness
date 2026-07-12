# Gym Website Enhancements - Implementation Guide

This guide details the new features added to the Gym Website project. All additions were made following a step-by-step approach ensuring NO modifications or breaks to existing login, signup, or frontend design.

## 1. Database Setup

The following tables must be created in your MySQL database (`gym_db`). You can find the full script in `database/new_features.sql`.

```sql
-- Create Attendance Table
CREATE TABLE IF NOT EXISTS attendance (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  date DATE NOT NULL,
  check_in_time TIME NOT NULL,
  UNIQUE(user_id, date),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create Nutrition Tracker Table
CREATE TABLE IF NOT EXISTS nutrition (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  calories INT NOT NULL,
  protein DECIMAL(10, 2) NOT NULL,
  fat DECIMAL(10, 2) NOT NULL,
  carbs DECIMAL(10, 2) NOT NULL,
  date DATE NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create Workout Tasks Table
CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  task_name VARCHAR(255) NOT NULL,
  status ENUM('pending', 'completed') DEFAULT 'pending',
  date DATE NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## 2. Updated API Endpoints

All routes are prefixed with `/api`.

### 💳 Payments
- **POST `/api/payment`**
  - Payload: `{ "user_id": 1, "amount": 2498 }`
  - Logic: Records payment, activates/updates membership, and sends email.

### 📅 Attendance
- **POST `/api/attendance`**
  - Payload: `{ "user_id": 1 }`
  - Logic: Marks daily attendance. Prevents multiple entries per day.
- **GET `/api/attendance/:userId`**
  - Logic: Retrieves attendance history.

### 🍎 Nutrition
- **POST `/api/nutrition`**
  - Payload: `{ "user_id": 1, "calories": 500, "protein": 30, "fat": 15, "carbs": 50, "date": "2023-10-25" }`
- **GET `/api/nutrition/:userId`**
  - Logic: Returns list of intakes + calculated summary (Fat %, Total Protein, Total Calories).

### 🏋️ Tasks
- **POST `/api/tasks`**
  - Payload: `{ "user_id": 1, "task_name": "Chest Workout", "date": "2023-10-25" }`
- **PUT `/api/tasks/:taskId`**
  - Payload: `{ "status": "completed" }`
- **GET `/api/tasks/:userId`**

### 📊 Dashboard
- **GET `/api/dashboard/:userId`**
  - Logic: Aggregated data for the User Dashboard (Welcome message, Membership Status, Last Payment, Monthly Attendance Count).

## 3. Postman Testing Examples

### Mark Attendance
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/attendance`
- **Body (JSON):** 
```json
{
  "user_id": 1
}
```

### Complete a Task
- **Method:** `PUT`
- **URL:** `http://localhost:3000/api/tasks/1` (Replace 1 with task ID)
- **Body (JSON):** 
```json
{
  "status": "completed"
}
```

## 4. Email Configuration
The system uses **Nodemailer** with Gmail SMTP.
Make sure to update the `.env` file with your credentials:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
```

## 5. New Frontend Pages
- `/dashboard`: Unified user dashboard.
- `/payment`: Functional membership purchase simulation.
