import json
import re

file_path = r'D:\Gym Website zip\frontend\src\data\nutritionData.js'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Extract the JSON array from the file
json_str = re.search(r'export const nutritionData = (\[.*?\]);', content, re.DOTALL).group(1)
data = json.loads(json_str)

images = {
    "Broccoli": "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?q=80&w=400&auto=format&fit=crop",
    "Spinach": "https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=400&auto=format&fit=crop",
    "Carrot": "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=400&auto=format&fit=crop",
    "Apple": "https://images.unsplash.com/photo-1560806887-1e4cd0b6fac6?q=80&w=400&auto=format&fit=crop",
    "Banana": "https://images.unsplash.com/photo-1528825871115-3581a5387915?q=80&w=400&auto=format&fit=crop",
    "Chicken Breast": "https://images.unsplash.com/photo-1587593810167-a84920ea0781?q=80&w=400&auto=format&fit=crop",
    "Egg": "https://images.unsplash.com/photo-1582562124811-c09040d0a901?q=80&w=400&auto=format&fit=crop",
    "Greek Yogurt": "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?q=80&w=400&auto=format&fit=crop",
    "Almonds": "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?q=80&w=400&auto=format&fit=crop",
    "Avocado": "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=400&auto=format&fit=crop",
    "Oats": "https://images.unsplash.com/photo-1511690655006-258dc7042502?q=80&w=400&auto=format&fit=crop",
    "Brown Rice": "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?q=80&w=400&auto=format&fit=crop",
    "Cabbage": "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?q=80&w=400&auto=format&fit=crop",
    "Beans": "https://images.unsplash.com/photo-1551326844-4fd41459a0f4?q=80&w=400&auto=format&fit=crop",
    "Beetroot": "https://images.unsplash.com/photo-1590868309235-ea34bed7bd7f?q=80&w=400&auto=format&fit=crop",
    "Tomato": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=400&auto=format&fit=crop",
    "Cucumber": "https://images.unsplash.com/photo-1604977042946-1ce02340ae13?q=80&w=400&auto=format&fit=crop",
    "Bell Pepper": "https://images.unsplash.com/photo-1563565375-f3fbfc222f86?q=80&w=400&auto=format&fit=crop",
    "Sweet Potato": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=400&auto=format&fit=crop",
    "Orange": "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?q=80&w=400&auto=format&fit=crop",
    "Kiwi": "https://images.unsplash.com/photo-1585059895524-72359e06138a?q=80&w=400&auto=format&fit=crop",
    "Blueberry": "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?q=80&w=400&auto=format&fit=crop",
    "Strawberry": "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=400&auto=format&fit=crop",
    "Mango": "https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=400&auto=format&fit=crop",
    "Papaya": "https://images.unsplash.com/photo-1617112848923-cc2234394a8a?q=80&w=400&auto=format&fit=crop",
    "Watermelon": "https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?q=80&w=400&auto=format&fit=crop",
    "Pineapple": "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?q=80&w=400&auto=format&fit=crop",
    "Fish": "https://images.unsplash.com/photo-1511833614418-5ee5ed71ab93?q=80&w=400&auto=format&fit=crop",
    "Paneer": "https://images.unsplash.com/photo-1631452180519-c014fe946bc0?q=80&w=400&auto=format&fit=crop",
    "Tofu": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400&auto=format&fit=crop",
    "Lentils": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?q=80&w=400&auto=format&fit=crop",
    "Soybeans": "https://images.unsplash.com/photo-1596328329437-023a9d5fb46a?q=80&w=400&auto=format&fit=crop"
}

for item in data:
    if item['name'] in images:
        item['image'] = images[item['name']]

new_content = 'export const nutritionData = ' + json.dumps(data, indent=2) + ';\n'

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Updated nutritionData.js successfully with literal images.")
