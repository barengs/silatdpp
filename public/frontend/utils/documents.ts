function exportAsPdf(data) {
    return
}


function exportAsCsv(data) {
    const csvContent =
    'data:text/csv;charset=utf-8,' +
    [
      Object.keys(data[0]).join(','), // Add headers
      ...data.map(row => Object.values(row).join(',')), // Add rows
    ].join('\n');

    const link = document.createElement("a")
    link.href = encodeURI(csvContent)
    link.download = "data.csv"
    link.click()
}


export function exportDocument(type, data) {
    if (type == "pdf") {
        exportAsPdf(data)
    } else if (type == "csv") {
        exportAsCsv(data)
    }
}