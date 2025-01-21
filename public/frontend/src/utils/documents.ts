import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { getDateNow, getDateTime } from './data';

// set part of letter structure

function setHeader(doc) {
    
    const img = new Image()
    img.src = "/lambang.jpg"

    doc.addImage(img, "JPG", 10, 5, 25, 25);

    doc.setFontSize(13);
    doc.text("PEMERINTAH KABUPATEN PAMEKASAN", 65, 12);

    doc.setFontSize(15);
    doc.setFont("helvetica", "bold")
    doc.text("DINAS PENDIDIKAN DAN KEBUDAYAAN", 60, 18);
    
    doc.setFont("helvetica", "normal")
    doc.setFontSize(10);

    doc.text("JL. Raya Proppo - Pamekasan", 87, 23);
    doc.text("Telp. ( 0324 ) 322 349 Fax. ( 0324 ) 327 276", 75, 28);
    
    doc.setLineWidth(1);
    doc.line(10, 32, 200, 32);
    doc.setLineWidth(0.5);
    doc.line(10, 33, 200, 33);
}


function setDate(doc) {
    doc.setFontSize(10)
    doc.text(`Pamekasan, ${getDateNow()}`, 153, 42)
}


// Exports

function exportAsPdf(data, excludes: string[]) {

    if (Object.keys(data[0]).length == 0) return

    const doc = new jsPDF();

    doc.text('Employee List', 14, 10);

    const tableColumn = Object.keys(data[0]).filter(item => !excludes.some(excludeItem => item == excludeItem)).map(col => col);
    const tableRows = data.filter(item => !excludes.some(excludeItem => item == excludeItem)).map(item => Object.values(item));

    // console.log(tableRows)
    // return 

    autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        headStyles: {
            cellWidth: 'wrap'
        }
    });


    // Save the PDF
    doc.save('table_data.pdf');
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


export function exportDocument(type, data, excludes: string[]) {
    if (type == "pdf") {
        exportAsPdf(data, excludes)
    } else if (type == "csv") {
        exportAsCsv(data)
    }
}


export function exportLetter() {
    const doc = new jsPDF()

    setHeader(doc)
    setDate(doc)

    // doc.setFontSize(12);
    // doc.text("This is the content of the first page.", 10, 30);

    doc.save("example.pdf");


}