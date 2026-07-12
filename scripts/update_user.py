import os

user_file = r'D:\Gym Website zip\backend\src\main\java\com\gym\backend\entity\User.java'

with open(user_file, 'r', encoding='utf-8') as f:
    content = f.read()

new_fields = """
    @Column(name = "theme_preference")
    private String themePreference = "system";

    @Column(name = "push_notifications")
    private Boolean pushNotifications = true;

    @Column(name = "marketing_emails")
    private Boolean marketingEmails = false;

    @Column(name = "avatar_url")
    private String avatarUrl;

    @Column(name = "current_streak")
    private Integer currentStreak = 0;

    @Column(name = "last_workout_date")
    private LocalDateTime lastWorkoutDate;
"""

new_getters_setters = """
    public String getThemePreference() { return themePreference; }
    public void setThemePreference(String themePreference) { this.themePreference = themePreference; }
    public Boolean getPushNotifications() { return pushNotifications; }
    public void setPushNotifications(Boolean pushNotifications) { this.pushNotifications = pushNotifications; }
    public Boolean getMarketingEmails() { return marketingEmails; }
    public void setMarketingEmails(Boolean marketingEmails) { this.marketingEmails = marketingEmails; }
    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }
    public Integer getCurrentStreak() { return currentStreak; }
    public void setCurrentStreak(Integer currentStreak) { this.currentStreak = currentStreak; }
    public LocalDateTime getLastWorkoutDate() { return lastWorkoutDate; }
    public void setLastWorkoutDate(LocalDateTime lastWorkoutDate) { this.lastWorkoutDate = lastWorkoutDate; }
"""

# Insert fields before @PrePersist
content = content.replace("    @PrePersist", new_fields + "\n    @PrePersist")

# Insert getters/setters before the last }
idx = content.rfind("}")
content = content[:idx] + new_getters_setters + "\n" + content[idx:]

with open(user_file, 'w', encoding='utf-8') as f:
    f.write(content)

print("User.java updated successfully.")
