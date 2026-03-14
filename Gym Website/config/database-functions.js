/**
 * Global Database Connection Usage Examples
 * This file demonstrates how to use the MySQL connection globally
 * across your Gym Website application
 */

const db = require('./config/database');

// =============================================
// USERS MANAGEMENT FUNCTIONS
// =============================================

/**
 * Get all users from database
 */
async function getAllUsers() {
  try {
    const connection = await db.getConnection();
    const [users] = await connection.query('SELECT id, fullName, username, role FROM users');
    connection.release();
    return users;
  } catch (err) {
    console.error('Error fetching users:', err);
    throw err;
  }
}

/**
 * Get user by username
 */
async function getUserByUsername(username) {
  try {
    const connection = await db.getConnection();
    const [users] = await connection.query('SELECT * FROM users WHERE username = ?', [username]);
    connection.release();
    return users[0] || null;
  } catch (err) {
    console.error('Error fetching user:', err);
    throw err;
  }
}

/**
 * Create a new user
 */
async function createUser(fullName, username, password, email, role = 'user') {
  try {
    const connection = await db.getConnection();
    const [result] = await connection.query(
      'INSERT INTO users (fullName, username, password, email, role) VALUES (?, ?, ?, ?, ?)',
      [fullName, username, password, email, role]
    );
    connection.release();
    return result.insertId;
  } catch (err) {
    console.error('Error creating user:', err);
    throw err;
  }
}

/**
 * Update user information
 */
async function updateUser(userId, fullName, email) {
  try {
    const connection = await db.getConnection();
    await connection.query(
      'UPDATE users SET fullName = ?, email = ? WHERE id = ?',
      [fullName, email, userId]
    );
    connection.release();
    return true;
  } catch (err) {
    console.error('Error updating user:', err);
    throw err;
  }
}

/**
 * Delete a user
 */
async function deleteUser(userId) {
  try {
    const connection = await db.getConnection();
    await connection.query('DELETE FROM users WHERE id = ?', [userId]);
    connection.release();
    return true;
  } catch (err) {
    console.error('Error deleting user:', err);
    throw err;
  }
}

// =============================================
// MEMBERSHIP MANAGEMENT FUNCTIONS
// =============================================

/**
 * Create a new membership
 */
async function createMembership(userId, membershipType, startDate, endDate, price) {
  try {
    const connection = await db.getConnection();
    const [result] = await connection.query(
      'INSERT INTO memberships (user_id, membership_type, start_date, end_date, price) VALUES (?, ?, ?, ?, ?)',
      [userId, membershipType, startDate, endDate, price]
    );
    connection.release();
    return result.insertId;
  } catch (err) {
    console.error('Error creating membership:', err);
    throw err;
  }
}

/**
 * Get user memberships
 */
async function getUserMemberships(userId) {
  try {
    const connection = await db.getConnection();
    const [memberships] = await connection.query(
      'SELECT * FROM memberships WHERE user_id = ?',
      [userId]
    );
    connection.release();
    return memberships;
  } catch (err) {
    console.error('Error fetching memberships:', err);
    throw err;
  }
}

/**
 * Update membership status
 */
async function updateMembershipStatus(membershipId, status) {
  try {
    const connection = await db.getConnection();
    await connection.query(
      'UPDATE memberships SET status = ? WHERE id = ?',
      [status, membershipId]
    );
    connection.release();
    return true;
  } catch (err) {
    console.error('Error updating membership:', err);
    throw err;
  }
}

// =============================================
// NUTRITION PLANS FUNCTIONS
// =============================================

/**
 * Get all nutrition plans
 */
async function getNutritionPlans() {
  try {
    const connection = await db.getConnection();
    const [plans] = await connection.query('SELECT * FROM nutrition_plans');
    connection.release();
    return plans;
  } catch (err) {
    console.error('Error fetching nutrition plans:', err);
    throw err;
  }
}

/**
 * Add a new nutrition plan
 */
async function addNutritionPlan(name, description, protein, carbs, fats, calories) {
  try {
    const connection = await db.getConnection();
    const [result] = await connection.query(
      'INSERT INTO nutrition_plans (name, description, protein, carbs, fats, calories) VALUES (?, ?, ?, ?, ?, ?)',
      [name, description, protein, carbs, fats, calories]
    );
    connection.release();
    return result.insertId;
  } catch (err) {
    console.error('Error adding nutrition plan:', err);
    throw err;
  }
}

// =============================================
// PAYMENT FUNCTIONS
// =============================================

/**
 * Record a payment
 */
async function recordPayment(userId, membershipId, amount, paymentMethod, status = 'pending') {
  try {
    const connection = await db.getConnection();
    const [result] = await connection.query(
      'INSERT INTO payments (user_id, membership_id, amount, payment_method, status) VALUES (?, ?, ?, ?, ?)',
      [userId, membershipId, amount, paymentMethod, status]
    );
    connection.release();
    return result.insertId;
  } catch (err) {
    console.error('Error recording payment:', err);
    throw err;
  }
}

/**
 * Get user payments
 */
async function getUserPayments(userId) {
  try {
    const connection = await db.getConnection();
    const [payments] = await connection.query(
      'SELECT * FROM payments WHERE user_id = ? ORDER BY payment_date DESC',
      [userId]
    );
    connection.release();
    return payments;
  } catch (err) {
    console.error('Error fetching payments:', err);
    throw err;
  }
}

/**
 * Update payment status
 */
async function updatePaymentStatus(paymentId, status) {
  try {
    const connection = await db.getConnection();
    await connection.query(
      'UPDATE payments SET status = ? WHERE id = ?',
      [status, paymentId]
    );
    connection.release();
    return true;
  } catch (err) {
    console.error('Error updating payment:', err);
    throw err;
  }
}

// =============================================
// EXPORT ALL FUNCTIONS
// =============================================

module.exports = {
  // User functions
  getAllUsers,
  getUserByUsername,
  createUser,
  updateUser,
  deleteUser,
  
  // Membership functions
  createMembership,
  getUserMemberships,
  updateMembershipStatus,
  
  // Nutrition functions
  getNutritionPlans,
  addNutritionPlan,
  
  // Payment functions
  recordPayment,
  getUserPayments,
  updatePaymentStatus
};

// =============================================
// USAGE EXAMPLE
// =============================================
/*

// In your server.js or any other file:
const dbFunctions = require('./config/database-functions');

// Get all users
(async () => {
  const users = await dbFunctions.getAllUsers();
  console.log(users);
})();

// Create a new user
(async () => {
  const userId = await dbFunctions.createUser('John Doe', 'johndoe', 'password123', 'john@example.com', 'user');
  console.log('Created user with ID:', userId);
})();

// Get user by username
(async () => {
  const user = await dbFunctions.getUserByUsername('johndoe');
  console.log(user);
})();

*/
