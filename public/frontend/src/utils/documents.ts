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

function setRecipent(doc, recipent) {
    doc.setFontSize(10)
    doc.text('Kepada', 155, 55)
    doc.text('Yth. ', 155, 60)
    doc.text(`Sdr. ${recipent}\ndi\n        PAMEKASAN`, 162, 60)
}


function setLetterAttachment(doc) {
    doc.setFontSize(10)
    doc.text('Nomor      :   312312312321321', 10, 55)
    doc.text('Sifat          :   Penting', 10, 62)
    doc.text('Lampiran  :   -', 10, 69)
    doc.text('Perihal      :   Rekomendasi', 10, 76)
}

function setSignature(doc) {
    doc.setFontSize(10)
    doc.setFont("helvetica", "bold")
    doc.text('KEPALA', 130, 150)
    doc.text('DINAS PENDIDIKAN DAN KEBUDAYAAN', 130, 155)
    doc.text('KEPALA BIDANG BIMBINGAN SD', 130, 160)
    doc.text('TAUFIK HIDAYAT, S.Pd, M.Pd', 130, 190)
    doc.text('NIP. 19820426 200604 1 010', 130, 195)
}

function setFootNote(doc) {
    doc.setFont("helvetica", "normal")
    doc.text('Tembusan:', 10, 235)
    doc.text('Yth. Kepala Dinas Pendidikan Dan Kebudayaan Kabupaten Pamekasan', 10, 240)
}

// Exports

function exportAsPdf(data, excludes: string[]) {

    if (Object.keys(data[0]).length == 0) return

    const doc = new jsPDF();

    doc.text('Employee List', 14, 10);

    const tableColumn = Object.keys(data[0]).filter(item => !excludes.some(excludeItem => item == excludeItem)).map(col => col);
    const tableRows = data.filter(item => !excludes.some(excludeItem => item == excludeItem)).map(item => Object.values(item));


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


export function exportRecomendation(content) {
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.width

    setHeader(doc)
    setDate(doc)
    setRecipent(doc, "Kepala Bank Jatim\nCabang Pamekasan")
    setLetterAttachment(doc)

    doc.setFontSize(10);
    const resized = doc.splitTextToSize(`          ${content}`, pageWidth - 23);
    doc.text(resized, 17, 95, { lineHeightFactor: 2})
    doc.text("          Demikian permohonan ini atas perhatian dan kerjasamanya kami sampaikan terimakasih", 17, 120, { lineHeightFactor: 2});
    
    setSignature(doc)
    setFootNote(doc)

    doc.save("Surat Permohonan.pdf");

}