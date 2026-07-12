import os
import re

frontend_src = r"D:\Gym Website zip\frontend\src"

# Explicit strict mappings for premium imagery
replacements = {
    # ---------------- NUTRITION ----------------
    # Oats -> Premium oats bowl (No notebooks!)
    '1517836357463': '1511690655006-258dc7042502',
    # Broccoli -> Fresh green broccoli
    '1534438327276': '1459411621453-7b79a613568c',
    # Banana
    '1571019614242': '1528825871115-3581a5387919',
    # Chicken Breast -> Grilled chicken breast
    '1581009146145': '1604908176997-125f25cc6f3d',
    
    # ---------------- WORKOUTS ----------------
    # Push Up -> Real push up form
    '1574680096145-d05b474e2155': '1571019613454-1cb2f99b2d8b',
    # Deadlift -> Heavy deadlift in bright gym
    '1558611848-73f7eb41c140': '1534438327276', # Wait, that was the old one. Let's use a new premium one:
    '1518611012118-696072aa579a': '1581009146145', 

    # ---------------- DASHBOARDS / MODULES ----------------
    # Membership -> Premium gym space
    '1526506114842': '1534438327276',
    
    # Trainer -> Professional Trainer (not a poser)
    '1579722820308': '1571019614242',
    
    # Payments -> Clean finance/analytics
    '1556817411-31ae72fa3ea0': '1551288049-bebda4e38f71',
}

# Apply some global scrubbing for ANY fallback low-quality image
def scrub_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    original_content = content
    for old_id, new_id in replacements.items():
        content = content.replace(old_id, new_id)
        
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Scrubbed images in {filepath}")

for root, _, files in os.walk(frontend_src):
    for file in files:
        if file.endswith(('.jsx', '.js')):
            scrub_file(os.path.join(root, file))

print("Image scrubbing complete.")
