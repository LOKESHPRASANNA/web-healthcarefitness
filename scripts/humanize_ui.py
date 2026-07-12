import os
import re

frontend_src = r"D:\Gym Website zip\frontend\src"

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # Typography: Headings get font-display and surface-900
    content = content.replace('text-4xl font-bold text-slate-800', 'font-display text-4xl md:text-5xl font-bold text-surface-900')
    content = content.replace('text-3xl font-bold text-slate-800', 'font-display text-3xl md:text-4xl font-bold text-surface-900')
    content = content.replace('text-xl font-bold text-slate-800', 'font-display text-xl font-bold text-surface-900')
    content = content.replace('text-lg font-bold text-slate-800', 'font-display text-lg font-bold text-surface-900')
    
    # Typography: Text colors
    content = content.replace('text-slate-800', 'text-surface-800')
    content = content.replace('text-slate-600', 'text-surface-600')
    content = content.replace('text-slate-500', 'text-surface-500')
    content = content.replace('text-slate-400', 'text-surface-400')
    
    # Borders
    content = content.replace('border-slate-100', 'border-surface-200/50')
    content = content.replace('border-slate-200', 'border-surface-200')
    
    # Backgrounds
    content = content.replace('bg-slate-50', 'bg-surface-50')
    content = content.replace('bg-white', 'bg-surface-100')
    
    # Spacing adjustments (Add breathing room)
    content = content.replace('mb-10 flex', 'mb-12 flex')
    content = content.replace('mb-8 flex', 'mb-10 flex')
    
    # Microinteractions
    # Replace static cards with card-interactive where applicable (if it's in a grid map)
    content = re.sub(r'className="card (.*?) hover:shadow-xl(.*?)"', r'className="card-interactive \1"', content)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Humanized {os.path.basename(filepath)}")

for root, _, files in os.walk(frontend_src):
    for file in files:
        if file.endswith('.jsx'):
            process_file(os.path.join(root, file))

print("UI Humanization Script Complete.")
