# Quick Start: Table Formatting for SQL Results

## What You Get

When you run SQL queries in Zeppelin notebooks, results now automatically display as:
- 📊 **Beautiful HTML tables** with sticky headers
- ⬇️ **Download buttons** for CSV, JSON, and TSV formats
- 📋 **Copy button** to quickly copy data to clipboard
- 🎨 **Theme-aware** styling that matches your VS Code theme

## Example Usage

### Basic SQL Query
```sql
%sql
SELECT 
    id,
    name,
    email,
    created_at
FROM users
LIMIT 100
```

**Result**: Automatically formatted table with download options above it

### Download Your Data

Click any of the buttons in the toolbar above the table:
- **⬇ CSV** - Download as Excel-compatible format
- **⬇ JSON** - Download as structured JSON
- **⬇ TSV** - Download as tab-separated (original format)
- **📋 Copy** - Copy to clipboard as CSV

### What's Displayed

Each table shows:
- Number of rows and columns
- Scrollable content (if more than ~20 rows)
- Clean, readable formatting
- Proper alignment

## Behind the Scenes

The extension automatically:
1. Detects `%table` format in Zeppelin output
2. Parses tab-separated values
3. Generates interactive HTML table
4. Adds download/copy functionality
5. Applies VS Code theme colors

## File Formats Explained

### CSV (Comma-Separated Values)
```csv
id,name,email
1,John Doe,john@example.com
2,Jane Smith,jane@example.com
```
- Opens in Excel, Google Sheets, Numbers
- Universal compatibility
- Proper escaping of commas and quotes

### JSON (JavaScript Object Notation)
```json
[
  {
    "id": "1",
    "name": "John Doe",
    "email": "john@example.com"
  },
  {
    "id": "2",
    "name": "Jane Smith",
    "email": "jane@example.com"
  }
]
```
- Use in APIs, Python, JavaScript
- Easy to parse programmatically
- Pretty-printed with 2-space indent

### TSV (Tab-Separated Values)
```
id	name	email
1	John Doe	john@example.com
2	Jane Smith	jane@example.com
```
- Original Zeppelin format
- Import back into databases
- No escaping complications

## Common Scenarios

### Exporting for Excel Analysis
1. Run your SQL query
2. Click **⬇ CSV**
3. Open in Excel/Google Sheets
4. Create charts, pivot tables, etc.

### Sharing Results with Team
1. Run your query
2. Click **📋 Copy**
3. Paste into Slack, email, or document
4. Data is neatly formatted

### Saving for Later Processing
1. Run your query
2. Click **⬇ JSON**
3. Use in Python scripts:
```python
import json

with open('table_data.json', 'r') as f:
    data = json.load(f)
    
for row in data:
    print(row['name'], row['email'])
```

### Large Result Sets
- Tables automatically scroll after ~600px height
- Headers stay visible at top
- Download full dataset regardless of display

## Troubleshooting

### Table not appearing?
- Check that query succeeded (no errors)
- Verify Zeppelin returned `%table` format
- Try running query again

### Download button not working?
- Check browser/VS Code permissions
- Use **Copy** button as alternative
- Check file save location settings

### Formatting looks wrong?
- Restart VS Code to refresh theme
- Check VS Code theme is properly loaded
- Verify HTML output is enabled

## Advanced: Integration Details

### Detection Logic
```typescript
// Extension checks output for:
msg.type === 'TABLE' || msg.data.startsWith('%table')
```

### Parse Format
```
%table
header1	header2	header3
value1	value2	value3
value4	value5	value6
```
- First line after `%table` is headers
- Each subsequent line is a data row
- Columns separated by tabs (`\t`)

### HTML Escaping
All values are properly escaped:
- `<` becomes `&lt;`
- `>` becomes `&gt;`
- `&` becomes `&amp;`
- `"` becomes `&quot;`
- `'` becomes `&#39;`

This prevents XSS attacks and display issues.

## Tips

1. **Large queries**: Add `LIMIT` clause to test first
2. **Column names**: Use aliases for readable headers
3. **Dates**: Format dates in SQL for consistent display
4. **Nulls**: They appear as empty cells
5. **Long text**: Cells wrap and truncate at 400px width

## More Examples

### Aggregation
```sql
%sql
SELECT 
    category,
    COUNT(*) as count,
    AVG(price) as avg_price,
    SUM(revenue) as total_revenue
FROM products
GROUP BY category
ORDER BY total_revenue DESC
```

### Join
```sql
%sql
SELECT 
    u.name as user_name,
    o.order_id,
    p.product_name,
    o.total_amount
FROM users u
JOIN orders o ON u.id = o.user_id
JOIN products p ON o.product_id = p.id
WHERE o.created_at >= '2024-01-01'
```

### Window Functions
```sql
%sql
SELECT 
    date,
    revenue,
    LAG(revenue, 1) OVER (ORDER BY date) as prev_day,
    revenue - LAG(revenue, 1) OVER (ORDER BY date) as change
FROM daily_sales
ORDER BY date DESC
LIMIT 30
```

All will display as formatted tables with download options!

---

**Questions or issues?** Check out `TABLE_FORMATTING.md` for detailed documentation.
