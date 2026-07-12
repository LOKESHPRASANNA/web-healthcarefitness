import os

frontend_src = r"D:\Gym Website zip\frontend\src"

# Mass replacement of heavy dark themes to light/premium themes
replacements = {
    # Typography
    'text-white': 'text-slate-800',
    'text-slate-400': 'text-slate-500',
    'text-slate-300': 'text-slate-600',
    'text-slate-200': 'text-slate-700',
    'text-slate-100': 'text-slate-800',
    'dark:text-white': '',
    
    # Backgrounds & Cards
    'bg-slate-950': 'bg-[#F7F9FC]',
    'bg-slate-900': 'bg-white',
    'bg-slate-800': 'bg-[#EEF4FF]',
    'bg-slate-900/50': 'bg-white/70',
    'bg-slate-900/80': 'bg-white/80',
    'bg-slate-800/50': 'bg-white/50',
    'dark:bg-slate-900': '',
    'dark:bg-slate-800': '',
    'dark:bg-slate-950': '',
    'dark:bg-primary-dark': '',
    'bg-primary-dark': 'bg-[#F8FAFD]',
    
    # Borders
    'border-white/5': 'border-slate-100',
    'border-white/10': 'border-slate-200',
    'border-slate-800': 'border-blue-50',
    'border-slate-700': 'border-blue-100',
    
    # Gradients
    'from-slate-900': 'from-white',
    'to-slate-900': 'to-white',
    'from-slate-950': 'from-[#F7F9FC]',
    'to-slate-950': 'to-[#F7F9FC]',
    
    # Shadows
    'shadow-2xl': 'shadow-xl shadow-blue-900/5',
    'shadow-lg': 'shadow-lg shadow-blue-900/5'
}

def replace_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    original_content = content
    for old_cls, new_cls in replacements.items():
        content = content.replace(f'"{old_cls}"', f'"{new_cls}"')
        content = content.replace(f' {old_cls} ', f' {new_cls} ')
        content = content.replace(f'"{old_cls} ', f'"{new_cls} ')
        content = content.replace(f' {old_cls}"', f' {new_cls}"')
        
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated themes in {filepath}")

for root, _, files in os.walk(frontend_src):
    for file in files:
        if file.endswith('.jsx') or file.endswith('.js') or file.endswith('.css'):
            replace_in_file(os.path.join(root, file))

print("Theme conversion complete.")
