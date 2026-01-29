# Table Formatting Feature

## Overview

This extension now includes enhanced table formatting for SQL query results in Zeppelin notebooks. When you run SQL queries, the results are automatically formatted into interactive HTML tables with download capabilities.

## Features

### 1. **Beautiful Table Display**
- Sticky headers that stay visible when scrolling
- Alternating row colors for better readability
- Hover effects on rows
- Responsive layout that adapts to your VS Code theme
- Maximum height with scrolling for large datasets
- Cell text wrapping for long content

### 2. **Download Options**
The toolbar above each table provides multiple download formats:

- **CSV**: Download as comma-separated values (ideal for Excel, Google Sheets)
- **JSON**: Download as JSON array of objects (ideal for APIs, data processing)
- **TSV**: Download as tab-separated values (preserves original Zeppelin format)

### 3. **Copy to Clipboard**
Click the "Copy" button to copy the table data as CSV to your clipboard, ready to paste into other applications.

### 4. **Table Information**
Each table displays:
- Total number of rows
- Total number of columns
- Helpful indicators for scrolling

## Usage

### Running SQL Queries

1. Open a Zeppelin notebook (`.zpln` file)
2. Create a cell with SQL interpreter:
   ```sql
   %sql
   SELECT * FROM your_table LIMIT 100
   ```
3. Run the cell (Shift+Enter)
4. The results will automatically display as a formatted table

### Table Data Format

Zeppelin returns table data with the `%table` prefix. The extension automatically detects this format and renders it beautifully. Example:

```
%table
id	name	age	city
1	John	30	New York
2	Jane	25	San Francisco
3	Bob	35	Chicago
```

This will be rendered as an interactive HTML table with all formatting and download features.

### Downloading Data

1. **CSV Download**: Click "⬇ CSV" to download as comma-separated values
   - Opens in Excel, Google Sheets, Numbers, etc.
   - Properly escapes special characters

2. **JSON Download**: Click "⬇ JSON" to download as JSON
   - Array of objects format
   - Each row becomes an object with column headers as keys
   - Pretty-printed with 2-space indentation

3. **TSV Download**: Click "⬇ TSV" to download as tab-separated values
   - Original Zeppelin format
   - Can be imported back into other tools

4. **Copy**: Click "📋 Copy" to copy CSV data to clipboard
   - Shows "✓ Copied!" confirmation
   - Ready to paste anywhere

## Theme Support

The table formatting automatically adapts to your VS Code theme:
- Uses VS Code color variables
- Works with both light and dark themes
- Consistent with VS Code's native table styling

## Technical Details

### File Structure
- `src/common/tableFormatter.ts`: Core table formatting logic
- `src/common/parser.ts`: Integration with Zeppelin output parsing

### Table Detection
The extension detects table data by:
1. Checking for `%table` prefix in output
2. Parsing TSV (tab-separated values) format
3. Extracting headers and data rows

### HTML Generation
Tables are rendered as HTML with:
- Embedded CSS using VS Code theme variables
- Embedded JavaScript for download functionality
- XSS protection through HTML escaping

## Limitations

- Maximum display height: 600px (scrollable)
- Cell content truncation: 400px max width (with text wrapping)
- Large datasets may take a moment to render

## Future Enhancements

Potential improvements for future versions:
- Pagination for very large result sets
- Column sorting
- Column filtering
- Export to Excel format (.xlsx)
- Search within table
- Column resizing
- Cell value formatting (numbers, dates, etc.)

## Troubleshooting

### Table not displaying correctly
- Ensure your SQL query returns valid results
- Check that the Zeppelin server is responding correctly
- Verify the output contains the `%table` prefix

### Download not working
- Check browser/VS Code permissions
- Ensure the cell has finished executing
- Try the copy button as an alternative

### Theme colors look wrong
- Restart VS Code to refresh theme variables
- Check your VS Code theme settings

## Examples

### Basic SQL Query
```sql
%sql
SELECT 
    customer_id,
    customer_name,
    total_orders,
    total_spent
FROM customers
ORDER BY total_spent DESC
LIMIT 50
```

### Join Query
```sql
%sql
SELECT 
    o.order_id,
    c.customer_name,
    p.product_name,
    o.quantity,
    o.total_price
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
JOIN products p ON o.product_id = p.product_id
WHERE o.order_date >= '2024-01-01'
```

### Aggregation Query
```sql
%sql
SELECT 
    DATE_TRUNC('month', order_date) as month,
    COUNT(*) as order_count,
    SUM(total_amount) as revenue,
    AVG(total_amount) as avg_order_value
FROM orders
GROUP BY DATE_TRUNC('month', order_date)
ORDER BY month DESC
```

All of these queries will display results in the formatted table with download capabilities.

## Support

For issues or feature requests, please visit the GitHub repository:
https://github.com/allen-li1231/zeppelin-vscode
