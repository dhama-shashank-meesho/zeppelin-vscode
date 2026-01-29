import { parseTableData, formatTableAsHTML, isTableData, formatTableOutput } from '../common/tableFormatter';

describe('Table Formatter', () => {
    
    describe('isTableData', () => {
        it('should detect table data with %table prefix', () => {
            const data = '%table\nid\tname\n1\tJohn\n2\tJane';
            expect(isTableData(data)).toBe(true);
        });

        it('should return false for non-table data', () => {
            const data = 'Some regular text output';
            expect(isTableData(data)).toBe(false);
        });

        it('should handle whitespace before %table', () => {
            const data = '  %table\nid\tname\n1\tJohn';
            expect(isTableData(data)).toBe(true);
        });
    });

    describe('parseTableData', () => {
        it('should parse simple table correctly', () => {
            const data = '%table\nid\tname\tage\n1\tJohn\t30\n2\tJane\t25';
            const result = parseTableData(data);
            
            expect(result).not.toBeNull();
            expect(result?.headers).toEqual(['id', 'name', 'age']);
            expect(result?.rows).toEqual([
                ['1', 'John', '30'],
                ['2', 'Jane', '25']
            ]);
        });

        it('should handle empty table', () => {
            const data = '%table\nid\tname';
            const result = parseTableData(data);
            
            expect(result).not.toBeNull();
            expect(result?.headers).toEqual(['id', 'name']);
            expect(result?.rows).toEqual([]);
        });

        it('should return null for non-table data', () => {
            const data = 'Not a table';
            const result = parseTableData(data);
            
            expect(result).toBeNull();
        });

        it('should trim whitespace from cells', () => {
            const data = '%table\n id \t name \n 1 \t John ';
            const result = parseTableData(data);
            
            expect(result?.headers).toEqual(['id', 'name']);
            expect(result?.rows).toEqual([['1', 'John']]);
        });

        it('should handle multi-line values correctly', () => {
            const data = '%table\nid\tdescription\n1\tFirst line\n2\tSecond line';
            const result = parseTableData(data);
            
            expect(result?.rows.length).toBe(2);
        });
    });

    describe('formatTableAsHTML', () => {
        it('should generate valid HTML with headers and rows', () => {
            const tableData = {
                headers: ['id', 'name', 'age'],
                rows: [
                    ['1', 'John', '30'],
                    ['2', 'Jane', '25']
                ]
            };
            
            const html = formatTableAsHTML(tableData, 'test');
            
            // Check for essential HTML elements
            expect(html).toContain('<table');
            expect(html).toContain('<thead');
            expect(html).toContain('<tbody');
            expect(html).toContain('<th>id</th>');
            expect(html).toContain('<th>name</th>');
            expect(html).toContain('<th>age</th>');
            expect(html).toContain('<td>John</td>');
            expect(html).toContain('<td>Jane</td>');
        });

        it('should include download buttons', () => {
            const tableData = {
                headers: ['id'],
                rows: [['1']]
            };
            
            const html = formatTableAsHTML(tableData, 'test');
            
            expect(html).toContain('CSV');
            expect(html).toContain('JSON');
            expect(html).toContain('TSV');
            expect(html).toContain('Copy');
        });

        it('should display row and column count', () => {
            const tableData = {
                headers: ['a', 'b', 'c'],
                rows: [['1', '2', '3'], ['4', '5', '6']]
            };
            
            const html = formatTableAsHTML(tableData, 'test');
            
            expect(html).toContain('2</strong> rows');
            expect(html).toContain('3</strong> columns');
        });

        it('should escape HTML special characters', () => {
            const tableData = {
                headers: ['<script>'],
                rows: [['<b>alert("xss")</b>']]
            };
            
            const html = formatTableAsHTML(tableData, 'test');
            
            expect(html).toContain('&lt;script&gt;');
            expect(html).toContain('&lt;b&gt;');
            expect(html).not.toContain('<script>');
        });

        it('should include JavaScript for download functionality', () => {
            const tableData = {
                headers: ['id'],
                rows: [['1']]
            };
            
            const html = formatTableAsHTML(tableData, 'test');
            
            expect(html).toContain('<script>');
            expect(html).toContain('downloadTableData');
            expect(html).toContain('copyTableData');
            expect(html).toContain('convertToCSV');
            expect(html).toContain('convertToJSON');
            expect(html).toContain('convertToTSV');
        });

        it('should include CSS styling', () => {
            const tableData = {
                headers: ['id'],
                rows: [['1']]
            };
            
            const html = formatTableAsHTML(tableData, 'test');
            
            expect(html).toContain('<style>');
            expect(html).toContain('.zeppelin-table-container');
            expect(html).toContain('.zeppelin-table');
            expect(html).toContain('var(--vscode-');
        });

        it('should handle empty rows', () => {
            const tableData = {
                headers: ['id', 'name'],
                rows: []
            };
            
            const html = formatTableAsHTML(tableData, 'test');
            
            expect(html).toContain('0</strong> rows');
            expect(html).toContain('<tbody>');
        });

        it('should generate unique IDs for multiple tables', () => {
            const tableData = {
                headers: ['id'],
                rows: [['1']]
            };
            
            const html1 = formatTableAsHTML(tableData, 'test1');
            const html2 = formatTableAsHTML(tableData, 'test2');
            
            // Both should contain unique identifiers
            expect(html1).toContain('zeppelin-table-test1');
            expect(html2).toContain('zeppelin-table-test2');
        });
    });

    describe('Integration: Full workflow', () => {
        it('should parse and format complete table data', () => {
            const sqlResult = `%table
order_id	customer_name	product	quantity	total
1001	John Doe	Laptop	1	999.99
1002	Jane Smith	Mouse	2	29.98
1003	Bob Johnson	Keyboard	1	79.99`;

            // Step 1: Check if it's table data
            expect(isTableData(sqlResult)).toBe(true);

            // Step 2: Parse the table
            const tableData = parseTableData(sqlResult);
            expect(tableData).not.toBeNull();
            expect(tableData?.headers).toEqual(['order_id', 'customer_name', 'product', 'quantity', 'total']);
            expect(tableData?.rows.length).toBe(3);

            // Step 3: Format as HTML
            const html = formatTableAsHTML(tableData!, 'test');
            expect(html).toContain('John Doe');
            expect(html).toContain('Laptop');
            expect(html).toContain('999.99');
        });

        it('should handle SQL query with special characters', () => {
            const sqlResult = `%table
name	description
Test & Demo	A "quoted" value
O'Brien	Value with apostrophe`;

            const tableData = parseTableData(sqlResult);
            const html = formatTableAsHTML(tableData!, 'test');

            // Should escape HTML entities
            expect(html).toContain('&amp;');
            expect(html).toContain('&quot;');
            expect(html).toContain('&#39;');
        });
    });

    describe('Edge cases', () => {
        it('should handle single column table', () => {
            const data = '%table\nid\n1\n2\n3';
            const result = parseTableData(data);
            
            expect(result?.headers).toEqual(['id']);
            expect(result?.rows.length).toBe(3);
        });

        it('should handle single row table', () => {
            const data = '%table\nid\tname\n1\tJohn';
            const result = parseTableData(data);
            
            expect(result?.rows.length).toBe(1);
        });

        it('should handle very long cell values', () => {
            const longText = 'A'.repeat(1000);
            const data = `%table\nid\ttext\n1\t${longText}`;
            const result = parseTableData(data);
            
            expect(result?.rows[0][1]).toBe(longText);
        });

        it('should handle null/undefined-like strings', () => {
            const data = '%table\nid\tvalue\n1\tnull\n2\tundefined\n3\t';
            const result = parseTableData(data);
            
            expect(result?.rows[0][1]).toBe('null');
            expect(result?.rows[1][1]).toBe('undefined');
            expect(result?.rows[2][1]).toBe('');
        });

        it('should handle numeric column names', () => {
            const data = '%table\n1\t2\t3\nA\tB\tC';
            const result = parseTableData(data);
            
            expect(result?.headers).toEqual(['1', '2', '3']);
        });
    });
});
