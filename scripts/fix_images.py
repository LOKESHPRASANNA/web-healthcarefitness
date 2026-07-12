import json
import re

def process_file(filepath, mapping, default_image):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract the JSON array part
    match = re.search(r'export const \w+ = (\[.*?\]);', content, re.DOTALL)
    if not match:
        print(f"Could not find array in {filepath}")
        return

    json_str = match.group(1)
    # The JSON in these files might have trailing commas or weird formatting, but let's try to parse it
    try:
        data = json.loads(json_str)
        for item in data:
            category = item.get('category', '')
            name = item.get('name', '').lower()
            
            # Find best match based on name first, then category
            new_img = default_image
            for key, img_url in mapping.items():
                if key.lower() in name or key.lower() == category.lower():
                    new_img = img_url
                    break
            
            item['image'] = new_img
        
        new_json_str = json.dumps(data, indent=2)
        new_content = content.replace(json_str, new_json_str)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Successfully updated images in {filepath}")
    except Exception as e:
        print(f"Error parsing {filepath}: {e}")

workout_map = {
    'deadlift': 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?q=80&w=400&auto=format&fit=crop',
    'plank': 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=400&auto=format&fit=crop',
    'downward dog': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=400&auto=format&fit=crop',
    'crunch': 'https://images.unsplash.com/photo-1598266663412-702cd1f3cb8b?q=80&w=400&auto=format&fit=crop',
    'overhead press': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    'lateral raise': 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=400&auto=format&fit=crop',
    'leg press': 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=400&auto=format&fit=crop',
    'squat': 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=400&auto=format&fit=crop',
    'bench press': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b-d25dfeac3438?q=80&w=400&auto=format&fit=crop',
    'pull-up': 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?q=80&w=400&auto=format&fit=crop',
    'curl': 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=400&auto=format&fit=crop',
    'jump rope': 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=400&auto=format&fit=crop',
    'back': 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?q=80&w=400&auto=format&fit=crop',
    'abs': 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=400&auto=format&fit=crop',
    'yoga': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=400&auto=format&fit=crop',
    'shoulders': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    'legs': 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=400&auto=format&fit=crop',
    'chest': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b-d25dfeac3438?q=80&w=400&auto=format&fit=crop',
    'cardio': 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=400&auto=format&fit=crop',
    'biceps': 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=400&auto=format&fit=crop',
}

nutrition_map = {
    'broccoli': 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?q=80&w=400&auto=format&fit=crop',
    'apple': 'https://images.unsplash.com/photo-1560806887-1e4cd0b6fac6?q=80&w=400&auto=format&fit=crop',
    'chicken': 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=400&auto=format&fit=crop',
    'vegetables': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=400&auto=format&fit=crop',
    'fruits': 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=400&auto=format&fit=crop',
    'proteins': 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=400&auto=format&fit=crop',
    'healthy fats': 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=400&auto=format&fit=crop',
    'carbohydrates': 'https://images.unsplash.com/photo-1511690655006-258dc7042502?q=80&w=400&auto=format&fit=crop',
}

process_file(r'D:\Gym Website zip\frontend\src\data\workoutData.js', workout_map, 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop')
process_file(r'D:\Gym Website zip\frontend\src\data\nutritionData.js', nutrition_map, 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=400&auto=format&fit=crop')
