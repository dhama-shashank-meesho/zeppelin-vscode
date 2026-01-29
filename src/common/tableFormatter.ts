import * as vscode from 'vscode';

export interface TableData {
    headers: string[];
    rows: string[][];
}

/**
 * Parse Zeppelin table format (%table) from text output
 */
export function parseTableData(data: string): TableData | null {
    // Check if data starts with %table
    if (!data.trim().startsWith('%table')) {
        return null;
    }

    // Remove %table prefix and trim
    const lines = data.replace(/^%table\s*\n?/, '').trim().split('\n');
    
    if (lines.length === 0) {
        return null;
    }

    // First line is headers
    const headers = lines[0].split('\t').map(h => h.trim());
    
    // Remaining lines are data rows
    const rows: string[][] = [];
    for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim()) {
            rows.push(lines[i].split('\t').map(cell => cell.trim()));
        }
    }

    return { headers, rows };
}

/**
 * Generate HTML table with enhanced formatting and download buttons
 */
export function formatTableAsHTML(tableData: TableData, tableId: string = 'table'): string {
    const { headers, rows } = tableData;
    const rowCount = rows.length;
    const colCount = headers.length;

    // Generate unique ID for this table
    const uniqueId = `zeppelin-table-${tableId}-${Date.now()}`;

    // Build HTML with embedded CSS and JavaScript
    let html = `
<style>
    .zeppelin-table-container {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        margin: 10px 0;
        background: var(--vscode-editor-background);
        color: var(--vscode-editor-foreground);
        border-radius: 4px;
        overflow: hidden;
    }
    
    .zeppelin-table-toolbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 12px;
        background: var(--vscode-input-background);
        border-bottom: 1px solid var(--vscode-panel-border);
        gap: 8px;
        flex-wrap: wrap;
    }
    
    .zeppelin-table-info {
        font-size: 12px;
        color: var(--vscode-descriptionForeground);
    }
    
    .zeppelin-table-actions {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
    }
    
    .zeppelin-table-btn {
        padding: 4px 10px;
        font-size: 12px;
        background: var(--vscode-button-background);
        color: var(--vscode-button-foreground);
        border: none;
        border-radius: 3px;
        cursor: pointer;
        transition: background 0.2s;
        white-space: nowrap;
    }
    
    .zeppelin-table-btn:hover {
        background: var(--vscode-button-hoverBackground);
    }
    
    .zeppelin-table-btn:active {
        opacity: 0.8;
    }
    
    .zeppelin-table-wrapper {
        overflow-x: auto;
        overflow-y: auto;
        max-height: 600px;
        border-bottom: 1px solid var(--vscode-panel-border);
    }
    
    .zeppelin-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 13px;
    }
    
    .zeppelin-table thead {
        position: sticky;
        top: 0;
        z-index: 10;
        background: var(--vscode-editor-background);
    }
    
    .zeppelin-table th {
        text-align: left;
        padding: 10px 12px;
        font-weight: 600;
        background: var(--vscode-input-background);
        border-bottom: 2px solid var(--vscode-panel-border);
        white-space: nowrap;
        color: var(--vscode-editor-foreground);
    }
    
    .zeppelin-table td {
        padding: 8px 12px;
        border-bottom: 1px solid var(--vscode-panel-border);
        max-width: 400px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: pre-wrap;
        word-wrap: break-word;
    }
    
    .zeppelin-table tbody tr:hover {
        background: var(--vscode-list-hoverBackground);
    }
    
    .zeppelin-table tbody tr:nth-child(even) {
        background: var(--vscode-list-inactiveSelectionBackground);
    }
    
    .zeppelin-table tbody tr:nth-child(even):hover {
        background: var(--vscode-list-hoverBackground);
    }
    
    .zeppelin-table-footer {
        padding: 8px 12px;
        background: var(--vscode-input-background);
        border-top: 1px solid var(--vscode-panel-border);
        font-size: 11px;
        color: var(--vscode-descriptionForeground);
        text-align: right;
    }
</style>

<div class="zeppelin-table-container" id="${uniqueId}">
    <div class="zeppelin-table-toolbar">
        <div class="zeppelin-table-info">
            <strong>${rowCount}</strong> rows × <strong>${colCount}</strong> columns
        </div>
        <div class="zeppelin-table-actions">
            <button class="zeppelin-table-btn" onclick="downloadTableData_${uniqueId}('csv')">
                ⬇ CSV
            </button>
            <button class="zeppelin-table-btn" onclick="downloadTableData_${uniqueId}('json')">
                ⬇ JSON
            </button>
            <button class="zeppelin-table-btn" onclick="downloadTableData_${uniqueId}('tsv')">
                ⬇ TSV
            </button>
            <button class="zeppelin-table-btn" onclick="copyTableData_${uniqueId}()">
                📋 Copy
            </button>
        </div>
    </div>
    
    <div class="zeppelin-table-wrapper">
        <table class="zeppelin-table">
            <thead>
                <tr>
${headers.map(h => `                    <th>${escapeHtml(h)}</th>`).join('\n')}
                </tr>
            </thead>
            <tbody>
${rows.map(row => `                <tr>
${row.map(cell => `                    <td>${escapeHtml(cell)}</td>`).join('\n')}
                </tr>`).join('\n')}
            </tbody>
        </table>
    </div>
    
    <div class="zeppelin-table-footer">
        Scroll for more data
    </div>
</div>

<script>
(function() {
    const tableData_${uniqueId} = ${JSON.stringify({ headers, rows })};
    
    window.downloadTableData_${uniqueId} = function(format) {
        let content, mimeType, filename;
        
        if (format === 'csv') {
            content = convertToCSV(tableData_${uniqueId});
            mimeType = 'text/csv';
            filename = 'table_data.csv';
        } else if (format === 'json') {
            content = convertToJSON(tableData_${uniqueId});
            mimeType = 'application/json';
            filename = 'table_data.json';
        } else if (format === 'tsv') {
            content = convertToTSV(tableData_${uniqueId});
            mimeType = 'text/tab-separated-values';
            filename = 'table_data.tsv';
        }
        
        downloadFile(content, mimeType, filename);
    };
    
    window.copyTableData_${uniqueId} = function() {
        const csv = convertToCSV(tableData_${uniqueId});
        navigator.clipboard.writeText(csv).then(() => {
            // Show temporary feedback
            const btn = event.target;
            const originalText = btn.textContent;
            btn.textContent = '✓ Copied!';
            btn.style.background = 'var(--vscode-testing-iconPassed)';
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    };
    
    function convertToCSV(data) {
        const escapeCSV = (str) => {
            if (str == null) return '';
            str = String(str);
            if (str.includes(',') || str.includes('"') || str.includes('\\n')) {
                return '"' + str.replace(/"/g, '""') + '"';
            }
            return str;
        };
        
        const headerRow = data.headers.map(escapeCSV).join(',');
        const dataRows = data.rows.map(row => 
            row.map(escapeCSV).join(',')
        ).join('\\n');
        
        return headerRow + '\\n' + dataRows;
    }
    
    function convertToJSON(data) {
        const jsonData = data.rows.map(row => {
            const obj = {};
            data.headers.forEach((header, i) => {
                obj[header] = row[i];
            });
            return obj;
        });
        return JSON.stringify(jsonData, null, 2);
    }
    
    function convertToTSV(data) {
        const headerRow = data.headers.join('\\t');
        const dataRows = data.rows.map(row => row.join('\\t')).join('\\n');
        return headerRow + '\\n' + dataRows;
    }
    
    function downloadFile(content, mimeType, filename) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
})();
</script>
`;

    return html;
}

/**
 * Escape HTML special characters to prevent XSS
 */
function escapeHtml(text: string): string {
    if (text == null) {
        return '';
    }
    
    const str = String(text);
    const htmlEscapes: { [key: string]: string } = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    };
    
    return str.replace(/[&<>"']/g, (char) => htmlEscapes[char]);
}

/**
 * Check if text contains table data
 */
export function isTableData(data: string): boolean {
    return data.trim().startsWith('%table');
}

/**
 * Format table data for notebook output
 */
export function formatTableOutput(
    data: string,
    tableId: string = 'table'
): vscode.NotebookCellOutputItem | null {
    const tableData = parseTableData(data);
    
    if (!tableData) {
        return null;
    }
    
    const html = formatTableAsHTML(tableData, tableId);
    const encoder = new TextEncoder();
    
    return new vscode.NotebookCellOutputItem(
        encoder.encode(html),
        'text/html'
    );
}
