import re
import os

with open('public/stack.svg', 'r') as f:
    content = f.read()

# Find all nested <svg ...>...</svg> inside <g> tags
svgs = re.findall(r'<svg[^>]*>.*?</svg>', content, re.DOTALL)
# First SVG is the outer one, the rest are inner ones
inner_svgs = svgs[1:]

names = ['ubuntu', 'typescript', 'python', 'postgresql', 'nodejs', 'react', 'vite', 'nextjs']

os.makedirs('public/stack-icons', exist_ok=True)

for name, svg_str in zip(names, inner_svgs):
    with open(f'public/stack-icons/{name}.svg', 'w') as out:
        out.write(svg_str)

print("Created", len(inner_svgs), "SVGs in public/stack-icons/")
