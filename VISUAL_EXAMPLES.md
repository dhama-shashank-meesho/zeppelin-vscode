# Table Formatting Feature - Visual Examples

## Example 1: Basic SQL Query Result

### Input (SQL Query):
```sql
%sql
SELECT 
    customer_id,
    customer_name,
    total_orders,
    total_spent,
    last_order_date
FROM customers
ORDER BY total_spent DESC
LIMIT 10
```

### Output (Zeppelin Server Response):
```
%table
customer_id	customer_name	total_orders	total_spent	last_order_date
1001	John Doe	15	2549.85	2024-01-28
1002	Jane Smith	23	3120.50	2024-01-29
1003	Bob Johnson	8	1250.00	2024-01-27
1004	Alice Williams	31	4850.75	2024-01-29
1005	Charlie Brown	12	1899.99	2024-01-26
1006	Diana Prince	19	3450.25	2024-01-28
1007	Erik Lehnsherr	7	980.50	2024-01-25
1008	Fiona Gallagher	28	4125.80	2024-01-29
1009	George Martin	14	2340.90	2024-01-27
1010	Helen Troy	22	3680.45	2024-01-28
```

### Visual Representation in VS Code:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ ⚙ Toolbar                                                                   │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ 10 rows × 5 columns      [⬇ CSV] [⬇ JSON] [⬇ TSV] [📋 Copy]          │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ customer_id │ customer_name    │ total_orders │ total_spent │ last_...│ │
│ ├─────────────┼──────────────────┼──────────────┼─────────────┼─────────┤ │
│ │ 1001        │ John Doe         │ 15           │ 2549.85     │ 2024... │ │
│ │ 1002        │ Jane Smith       │ 23           │ 3120.50     │ 2024... │ │
│ │ 1003        │ Bob Johnson      │ 8            │ 1250.00     │ 2024... │ │
│ │ 1004        │ Alice Williams   │ 31           │ 4850.75     │ 2024... │ │
│ │ 1005        │ Charlie Brown    │ 12           │ 1899.99     │ 2024... │ │
│ │ 1006        │ Diana Prince     │ 19           │ 3450.25     │ 2024... │ │
│ │ 1007        │ Erik Lehnsherr   │ 7            │ 980.50      │ 2024... │ │
│ │ 1008        │ Fiona Gallagher  │ 28           │ 4125.80     │ 2024... │ │
│ │ 1009        │ George Martin    │ 14           │ 2340.90     │ 2024... │ │
│ │ 1010        │ Helen Troy       │ 22           │ 3680.45     │ 2024... │ │
│ └─────────────┴──────────────────┴──────────────┴─────────────┴─────────┘ │
│                                                                             │
│ Footer: Scroll for more data                                               │
└─────────────────────────────────────────────────────────────────────────────┘

Features Visible:
✓ Clean table layout
✓ Clear column headers
✓ Aligned data
✓ Download buttons in toolbar
✓ Row/column count
✓ Scrollable if needed
```

---

## Example 2: Large Dataset with Scrolling

### Input (SQL Query):
```sql
%sql
SELECT * FROM transactions LIMIT 100
```

### Visual Representation:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ ⚙ Toolbar                                                                   │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ 100 rows × 8 columns     [⬇ CSV] [⬇ JSON] [⬇ TSV] [📋 Copy]          │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ tx_id │ date       │ customer │ product  │ quantity │ price  │ total  │ │ ← Headers stay here
│ ├───────┼────────────┼──────────┼──────────┼──────────┼────────┼────────┤ │
│ │ 10001 │ 2024-01-29 │ John Doe │ Widget A │ 2        │ 49.99  │ 99.98  │ │
│ │ 10002 │ 2024-01-29 │ Jane S.  │ Widget B │ 1        │ 79.99  │ 79.99  │ │
│ │ 10003 │ 2024-01-28 │ Bob J.   │ Widget C │ 3        │ 29.99  │ 89.97  │ │
│ │ ...   │ ...        │ ...      │ ...      │ ...      │ ...    │ ...    │ │
│ │ [Scrollable area - 100 rows total]                                     │ │
│ │ ...   │ ...        │ ...      │ ...      │ ...      │ ...    │ ...    │ │
│ │ 10098 │ 2024-01-20 │ Zoe W.   │ Widget X │ 1        │ 199.99 │ 199.99 │ │
│ │ 10099 │ 2024-01-20 │ Alice K. │ Widget Y │ 2        │ 149.99 │ 299.98 │ │
│ │ 10100 │ 2024-01-19 │ Frank M. │ Widget Z │ 4        │ 19.99  │ 79.96  │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│   ↑ Scroll bar appears                                                      │
│                                                                             │
│ Footer: Scroll for more data                                               │
└─────────────────────────────────────────────────────────────────────────────┘

Scrolling Features:
✓ Sticky headers remain at top
✓ Smooth scrolling
✓ Max 600px height
✓ All 100 rows accessible
```

---

## Example 3: Download Dialog

### When user clicks "⬇ CSV":

```
┌───────────────────────────────────┐
│  Save File                         │
│                                    │
│  Save As: table_data.csv          │
│                                    │
│  Location: [Downloads ▼]          │
│                                    │
│           [Cancel]  [Save]         │
└───────────────────────────────────┘

Downloaded file contains:
customer_id,customer_name,total_orders,total_spent,last_order_date
1001,John Doe,15,2549.85,2024-01-28
1002,Jane Smith,23,3120.50,2024-01-29
...
```

### When user clicks "⬇ JSON":

```
Downloaded file (table_data.json) contains:
[
  {
    "customer_id": "1001",
    "customer_name": "John Doe",
    "total_orders": "15",
    "total_spent": "2549.85",
    "last_order_date": "2024-01-28"
  },
  {
    "customer_id": "1002",
    "customer_name": "Jane Smith",
    "total_orders": "23",
    "total_spent": "3120.50",
    "last_order_date": "2024-01-29"
  }
  ...
]
```

---

## Example 4: Copy to Clipboard

### When user clicks "📋 Copy":

```
Button changes to: [✓ Copied!] (green)
↓
2 seconds later
↓
Button returns to: [📋 Copy]

Clipboard now contains CSV format:
customer_id,customer_name,total_orders,total_spent,last_order_date
1001,John Doe,15,2549.85,2024-01-28
1002,Jane Smith,23,3120.50,2024-01-29
...

Can paste into:
• Excel/Google Sheets
• Slack message
• Email
• Text editor
• Any application
```

---

## Example 5: Theme Integration

### Dark Theme (Default Dark+):
```
Background: Dark gray (#1e1e1e)
Text: Light gray (#d4d4d4)
Headers: Slightly darker (#252526)
Borders: Subtle gray (#3e3e42)
Hover: Highlighted (#2a2d2e)
Buttons: Blue accent (#0e639c)
```

### Light Theme (Default Light+):
```
Background: White (#ffffff)
Text: Dark gray (#333333)
Headers: Light gray (#f3f3f3)
Borders: Light gray (#e5e5e5)
Hover: Highlighted (#e8e8e8)
Buttons: Blue accent (#007acc)
```

Both automatically applied based on user's VS Code theme!

---

## Example 6: Special Characters Handling

### Input with special characters:
```
%table
name	description	price
Product "A"	Item with & symbol	$99.99
O'Brien's Item	Product <special>	$49.99
```

### Displayed as:
```
┌──────────────────────────────────────────────────────┐
│ name             │ description           │ price     │
├──────────────────┼───────────────────────┼───────────┤
│ Product "A"      │ Item with & symbol    │ $99.99    │
│ O'Brien's Item   │ Product <special>     │ $49.99    │
└──────────────────┴───────────────────────┴───────────┘

HTML properly escaped:
• & → &amp;
• " → &quot;
• ' → &#39;
• < → &lt;
• > → &gt;
```

---

## Example 7: Empty Result Set

### Input:
```sql
%sql
SELECT * FROM users WHERE age > 200
```

### Output:
```
%table
id	name	email	age
```

### Displayed as:
```
┌─────────────────────────────────────────────────────┐
│ 0 rows × 4 columns  [⬇ CSV] [⬇ JSON] [⬇ TSV] [📋] │
├─────────────────────────────────────────────────────┤
│ id    │ name    │ email     │ age                   │
├───────┼─────────┼───────────┼───────                ┤
│       │ (empty table - no data rows)                │
└─────────────────────────────────────────────────────┘

Headers are shown, but no data rows.
Download still works (downloads just headers).
```

---

## Example 8: Mobile/Narrow View

### When VS Code window is narrow:

```
┌─────────────────────────┐
│ 10 rows × 5 columns     │
│ [⬇ CSV] [⬇ JSON]       │
│ [⬇ TSV] [📋 Copy]      │  ← Buttons wrap
├─────────────────────────┤
│ customer_id │ customer_...│  ← Table scrolls horizontally
├─────────────┼─────────────┤
│ 1001        │ John Doe    │
│ 1002        │ Jane Smith  │
└─────────────┴─────────────┘
     ↔ Scroll →

Responsive features:
✓ Toolbar wraps
✓ Table scrolls horizontally
✓ Maintains readability
```

---

## Color Reference

### VS Code Theme Variables Used:

```css
Background Colors:
--vscode-editor-background          /* Main table background */
--vscode-input-background           /* Toolbar/header background */

Text Colors:
--vscode-editor-foreground          /* Table text */
--vscode-descriptionForeground      /* Info text */

Interactive:
--vscode-button-background          /* Button background */
--vscode-button-foreground          /* Button text */
--vscode-button-hoverBackground     /* Button hover */
--vscode-list-hoverBackground       /* Row hover */

Borders:
--vscode-panel-border               /* All borders */

Selection:
--vscode-list-inactiveSelectionBackground  /* Alternating rows */
```

These automatically match your theme!

---

## Size References

```
Toolbar height: ~40px
Header height: ~42px
Row height: ~36px
Max table height: 600px
Max cell width: 400px
Font size (table): 13px
Font size (toolbar): 12px
Button padding: 4px 10px
Table padding: 8-12px
```

---

## Interaction States

### Button States:

**Normal:**
```
[⬇ CSV]  ← Blue background
```

**Hover:**
```
[⬇ CSV]  ← Darker blue background
```

**Active (clicking):**
```
[⬇ CSV]  ← Slightly transparent
```

**Copy Success:**
```
[✓ Copied!]  ← Green background, 2 second duration
```

### Row States:

**Normal (even rows):**
```
│ 1001  │ John Doe  │  ← Slightly gray background
```

**Normal (odd rows):**
```
│ 1002  │ Jane Smith│  ← White/transparent background
```

**Hover:**
```
│ 1003  │ Bob Johnson│  ← Highlighted background
```

---

This visual guide shows exactly what users will see when the feature is active!
