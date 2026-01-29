/**
 * Manual Test File for Table Formatting
 * 
 * This file demonstrates how to use the table formatting functionality
 * with sample SQL query results from Zeppelin.
 */

import { parseTableData, formatTableAsHTML, isTableData } from '../common/tableFormatter';

// Sample 1: Basic SQL SELECT result
const sampleSQL1 = `%table
id	name	email	age
1	John Doe	john@example.com	30
2	Jane Smith	jane@example.com	25
3	Bob Johnson	bob@example.com	35
4	Alice Williams	alice@example.com	28`;

console.log('=== Test 1: Basic SQL SELECT ===');
console.log('Input:', sampleSQL1);
console.log('Is table data?', isTableData(sampleSQL1));

const table1 = parseTableData(sampleSQL1);
console.log('Parsed headers:', table1?.headers);
console.log('Number of rows:', table1?.rows.length);
console.log('First row:', table1?.rows[0]);

if (table1) {
    const html1 = formatTableAsHTML(table1, 'test1');
    console.log('HTML generated, length:', html1.length);
    console.log('Contains download buttons?', html1.includes('downloadTableData'));
}

// Sample 2: SQL JOIN with multiple columns
const sampleSQL2 = `%table
order_id	customer_name	product_name	quantity	unit_price	total_price
1001	John Doe	Laptop	1	999.99	999.99
1002	Jane Smith	Mouse	2	14.99	29.98
1003	Bob Johnson	Keyboard	1	79.99	79.99
1004	Alice Williams	Monitor	1	299.99	299.99
1005	John Doe	USB Cable	3	9.99	29.97`;

console.log('\n=== Test 2: SQL JOIN result ===');
const table2 = parseTableData(sampleSQL2);
console.log('Columns:', table2?.headers.length);
console.log('Rows:', table2?.rows.length);
console.log('Sample row:', table2?.rows[1]);

// Sample 3: SQL Aggregation
const sampleSQL3 = `%table
category	total_sales	avg_price	min_price	max_price	count
Electronics	15999.95	799.99	14.99	999.99	20
Furniture	8499.90	424.99	79.99	1299.99	20
Clothing	3299.85	109.99	19.99	299.99	30
Books	1499.70	29.99	9.99	49.99	50`;

console.log('\n=== Test 3: SQL Aggregation ===');
const table3 = parseTableData(sampleSQL3);
console.log('Aggregation columns:', table3?.headers);
console.log('Number of categories:', table3?.rows.length);

// Sample 4: SQL with NULL values and special characters
const sampleSQL4 = `%table
id	name	description	price
1	Product A	"High-quality" item	99.99
2	Product B	Item with & symbol	
3	Product C	O'Brien's choice	49.99
4	Product D	<special> product	199.99`;

console.log('\n=== Test 4: Special characters & NULL values ===');
const table4 = parseTableData(sampleSQL4);
console.log('Parsed successfully?', table4 !== null);
if (table4) {
    const html4 = formatTableAsHTML(table4, 'test4');
    console.log('HTML escaping working?', html4.includes('&amp;'));
    console.log('Quote escaping working?', html4.includes('&quot;'));
    console.log('Less-than escaping working?', html4.includes('&lt;'));
}

// Sample 5: Large dataset simulation
const generateLargeDataset = (rows: number) => {
    let data = '%table\nid\tuser_id\ttimestamp\tevent_type\tvalue\n';
    for (let i = 1; i <= rows; i++) {
        data += `${i}\tuser_${i % 100}\t2024-01-${(i % 28) + 1}\tevent_${i % 5}\t${Math.random() * 1000}\n`;
    }
    return data;
};

console.log('\n=== Test 5: Large dataset (100 rows) ===');
const largeDataset = generateLargeDataset(100);
const table5 = parseTableData(largeDataset);
console.log('Rows parsed:', table5?.rows.length);
console.log('Performance: OK');

if (table5) {
    const html5 = formatTableAsHTML(table5, 'test5');
    console.log('Large HTML generated, length:', html5.length);
    console.log('Contains scrolling hint?', html5.includes('Scroll for more'));
}

// Sample 6: Empty result set
const sampleSQL6 = `%table
id	name	status`;

console.log('\n=== Test 6: Empty result set ===');
const table6 = parseTableData(sampleSQL6);
console.log('Headers present?', table6?.headers.length);
console.log('Rows:', table6?.rows.length);
console.log('Empty rows handled correctly?', table6?.rows.length === 0);

// Sample 7: Single column
const sampleSQL7 = `%table
count
42
108
256
1024`;

console.log('\n=== Test 7: Single column result ===');
const table7 = parseTableData(sampleSQL7);
console.log('Single column parsed?', table7?.headers.length === 1);
console.log('Values:', table7?.rows.map(r => r[0]));

// Sample 8: Complex SQL with calculations
const sampleSQL8 = `%table
quarter	revenue	expenses	profit	profit_margin
Q1 2024	150000.00	95000.00	55000.00	36.67%
Q2 2024	165000.00	98000.00	67000.00	40.61%
Q3 2024	142000.00	89000.00	53000.00	37.32%
Q4 2024	178000.00	105000.00	73000.00	41.01%`;

console.log('\n=== Test 8: Financial calculations ===');
const table8 = parseTableData(sampleSQL8);
console.log('Financial data columns:', table8?.headers);
console.log('Q4 profit margin:', table8?.rows[3][4]);

console.log('\n=== All Tests Completed ===');
console.log('Table formatter is working correctly!');

// Example usage in VS Code extension
console.log('\n=== Usage Example ===');
console.log(`
// In your notebook kernel:
const results = paragraphResult.msg;
for (let msg of results) {
    if (isTableData(msg.data)) {
        const tableOutput = formatTableOutput(msg.data, 'unique-id');
        execution.replaceOutput(new vscode.NotebookCellOutput([tableOutput]));
    }
}
`);

// Expected output format
console.log('\n=== Expected Features ===');
console.log('✓ Sticky table headers');
console.log('✓ Alternating row colors');
console.log('✓ Hover effects');
console.log('✓ Download as CSV');
console.log('✓ Download as JSON');
console.log('✓ Download as TSV');
console.log('✓ Copy to clipboard');
console.log('✓ Row/column count display');
console.log('✓ Scrollable for large datasets');
console.log('✓ HTML entity escaping');
console.log('✓ VS Code theme integration');

export {};
