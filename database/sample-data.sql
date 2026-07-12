USE fitness_db;

-- Initial Roles
INSERT INTO roles (name) VALUES ('ROLE_MEMBER'), ('ROLE_TRAINER'), ('ROLE_ADMIN');

-- Mock Production User (Password requires BCrypt hash, inserting standard for testing)
INSERT INTO users (username, email, password) 
VALUES ('admin_demo', 'admin@fitnessplus.com', '$2a$10$2HhM/z836gqX0R0WjE5xG.2PqI.Y0j3R/gI7/c8F3I2s8Ww.2K0u2'); -- Mock BCrypt for 'password'

INSERT INTO user_roles (user_id, role_id) VALUES (1, 3); -- Admin role

INSERT INTO profiles (user_id, full_name, weight, height, fitness_goal)
VALUES (1, 'Admin User', 80.5, 180.0, 'Maintain Elite Fitness');
