import json

def escape_csharp_string(s):
    if s is None:
        return "null"
    return '"' + s.replace('"', '""') + '"'

def format_tags(tags):
    if not tags:
        return "new List<string>()"
    items = ", ".join([f'"{t}"' for t in tags])
    return f"new List<string> {{ {items} }}"

with open(r'd:\Class\scrl_app\beSCRL\scratch\templates_data_utf8.json', 'r', encoding='utf-8-sig') as f:
    data = json.load(f)

print("            var templates = new List<Template>")
print("            {")

for item in data:
    name = escape_csharp_string(item.get('name', 'Untitled'))
    category = escape_csharp_string(item.get('category'))
    category_code = escape_csharp_string(item.get('categoryCode'))
    format_val = escape_csharp_string(item.get('format'))
    description = escape_csharp_string(item.get('description'))
    preview_url = escape_csharp_string(item.get('previewImageUrl'))
    thumbnail_url = escape_csharp_string(item.get('thumbnailUrl'))
    sort_order = item.get('sortOrder', 0)
    is_default = str(item.get('isDefault', False)).lower()
    tags = format_tags(item.get('tags', []))
    
    # TemplateData as BsonDocument.Parse(@"...")
    template_data_json = json.dumps(item.get('templateData', {}), indent=4)
    template_data_escaped = template_data_json.replace('"', '""')
    
    print(f"""                new Template
                {{
                    Name = {name},
                    Category = {category},
                    CategoryCode = {category_code},
                    Format = {format_val},
                    Description = {description},
                    PreviewImageUrl = {preview_url},
                    ThumbnailUrl = {thumbnail_url},
                    SortOrder = {sort_order},
                    IsDefault = {is_default},
                    Tags = {tags},
                    TemplateData = BsonDocument.Parse(@"{template_data_escaped}")
                }},""")

print("            };")
