import json
import re

filepath = r"D:\Gym Website zip\frontend\src\data\nutritionData.js"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Fix Oats (book stack) -> premium oats bowl
content = content.replace('1517673132405-a56a62b18caf', '1511690655006-258dc7042502')

# 2. Fix empty/broken links that might be causing blank cards
content = content.replace('"image": ""', '"image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=400&auto=format&fit=crop"')
content = content.replace('"image": "undefined"', '"image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=400&auto=format&fit=crop"')
content = content.replace('https://images.unsplash.com/photo-undefined', 'https://images.unsplash.com/photo-1490645935967-10de6ba17061')
content = content.replace('photo-undefined', 'photo-1490645935967-10de6ba17061')

# 3. Check for specific ones like cabbage (often 1517594422315 is weird)
# Let's fix cabbage if it's there
content = content.replace('1517594422315-df6eeed62340', '1518977676-a05da82c5f93')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed nutrition images.")
