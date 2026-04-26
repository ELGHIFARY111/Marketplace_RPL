import os

extract_dir = r'c:\Users\LENOVO\OneDrive\Documents\KULIAH\semester 4\rpl\proyek\Marketplace_RPL\docs\extracted_images'
images = [f for f in os.listdir(os.path.join(extract_dir, 'word', 'media')) if f.endswith('.png') or f.endswith('.jpeg')]
images.sort()

html_content = '<html><body><h1>Extracted Images</h1>'
for img in images:
    html_content += f'<h2>{img}</h2><img src="word/media/{img}" style="max-width: 800px; border: 1px solid black; margin-bottom: 20px;"/><br/>'
html_content += '</body></html>'

with open(os.path.join(extract_dir, 'index.html'), 'w') as f:
    f.write(html_content)
