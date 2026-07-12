import os
import re

controller_file = r'D:\Gym Website zip\backend\src\main\java\com\gym\backend\controller\UserController.java'

with open(controller_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the userData block in login
old_user_data = """            // Mock the user object format the frontend expects
            Map<String, Object> userData = new HashMap<>();
            userData.put("id", userDetails.getId());
            userData.put("username", userDetails.getUsername());
            userData.put("email", userDetails.getEmail());
            userData.put("role", role);"""

new_user_data = """            // Fetch full user to return all settings to frontend
            Map<String, Object> userData = new HashMap<>();
            User user = userRepository.findByUsername(userDetails.getUsername()).orElse(null);
            if (user != null) {
                userData.put("id", user.getId());
                userData.put("username", user.getUsername());
                userData.put("email", user.getEmail());
                userData.put("role", role);
                userData.put("fullName", user.getFullName());
                userData.put("themePreference", user.getThemePreference());
                userData.put("pushNotifications", user.getPushNotifications());
                userData.put("marketingEmails", user.getMarketingEmails());
                userData.put("avatarUrl", user.getAvatarUrl());
                userData.put("currentStreak", user.getCurrentStreak());
            } else {
                userData.put("id", userDetails.getId());
                userData.put("username", userDetails.getUsername());
                userData.put("email", userDetails.getEmail());
                userData.put("role", role);
            }"""

content = content.replace(old_user_data, new_user_data)

# Add PUT /users/{id}/settings
settings_endpoint = """
    @PutMapping("/users/{id}/settings")
    public ResponseEntity<Map<String, Object>> updateSettings(@PathVariable Long id, @RequestBody Map<String, Object> payload) {
        Map<String, Object> response = new HashMap<>();
        try {
            Optional<User> userOpt = userRepository.findById(id);
            if (!userOpt.isPresent()) {
                response.put("success", false);
                response.put("message", "User not found");
                return ResponseEntity.status(404).body(response);
            }
            User user = userOpt.get();
            
            if (payload.containsKey("themePreference")) user.setThemePreference((String) payload.get("themePreference"));
            if (payload.containsKey("pushNotifications")) user.setPushNotifications((Boolean) payload.get("pushNotifications"));
            if (payload.containsKey("marketingEmails")) user.setMarketingEmails((Boolean) payload.get("marketingEmails"));
            if (payload.containsKey("avatarUrl")) user.setAvatarUrl((String) payload.get("avatarUrl"));
            if (payload.containsKey("fullName")) user.setFullName((String) payload.get("fullName"));
            
            userRepository.save(user);
            
            response.put("success", true);
            response.put("message", "Settings updated");
            
            // return updated user data
            Map<String, Object> userData = new HashMap<>();
            userData.put("id", user.getId());
            userData.put("username", user.getUsername());
            userData.put("email", user.getEmail());
            userData.put("role", user.getRole());
            userData.put("fullName", user.getFullName());
            userData.put("themePreference", user.getThemePreference());
            userData.put("pushNotifications", user.getPushNotifications());
            userData.put("marketingEmails", user.getMarketingEmails());
            userData.put("avatarUrl", user.getAvatarUrl());
            userData.put("currentStreak", user.getCurrentStreak());
            
            response.put("user", userData);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }
"""

idx = content.rfind("}")
content = content[:idx] + settings_endpoint + "\n" + content[idx:]

with open(controller_file, 'w', encoding='utf-8') as f:
    f.write(content)

print("UserController.java updated successfully.")
