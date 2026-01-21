export function printTable(reportName: string headerGroups: any[], page: any, data: any[], prepareRow: (row: any) => void) {
    // if (window.confirm('This will open a new window with a printer-friendly version of the table. Continue?')) {
    //   const printWindow = window.open('', '_blank', 'width=800,height=600');
    // }
    console.log('Print table');
    console.log('headerGroups', headerGroups);
    console.log('page', page);
    console.log('data', data);
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    if (printWindow) {
        printWindow.document.write(`<html><head><title>${reportName}</title>`);
        printWindow.document.write(
            '<style>table {width: 100%;border-collapse: collapse;}th, td {border: 1px solid black;padding: 8px;text-align: left;}th {background-color: #f2f2f2;}</style>',
        );
        printWindow.document.write('</head><body>');
        printWindow.document.write(`<h1>${reportName}</h1>`);
        printWindow.document.write('<table>');
        // Table Header
        printWindow.document.write('<thead>');
        headerGroups.forEach(headerGroup => {
            printWindow.document.write('<tr>');
            headerGroup.headers.forEach(header => {
                printWindow.document.write(
                    `<th>${header.columnKey}</th>`,
                );
            });
            printWindow.document.write('</tr>');
        });
        printWindow.document.write('</thead>');
        // Table Body
        printWindow.document.write('<tbody>');
        page.forEach(row => {
            prepareRow(row);
            printWindow.document.write('<tr>');
            row.cells.forEach(cell => {
                printWindow.document.write(
                    `<td>${cell.value?.toString() || cell.value}</td>`,
                );
            });
            printWindow.document.write('</tr>');
        });
        printWindow.document.write('</tbody>');
        printWindow.document.write('</table>');
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
        printWindow.addEventListener("afterprint", (event) => {
            console.log("After print", event);
            printWindow.close();
        });

    }
}