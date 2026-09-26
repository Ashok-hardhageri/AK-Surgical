package AK.Sergicals.Service;

import AK.Sergicals.DTO.BillItemResponse;
import AK.Sergicals.DTO.BillResponse;
import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;

@Service
public class BillPdfService {

    public byte[] generateBillPdf(BillResponse billResponse) {

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        Document document = new Document();

        try {
            PdfWriter.getInstance(document, outputStream);

            document.open();

            // Header
            document.add(new Paragraph("AK SURGICALS"));
            document.add(new Paragraph("Surgical & Medical Supplies"));
            document.add(new Paragraph("----------------------------------------"));

            // Bill details
            document.add(new Paragraph("Bill No: BILL-0001"));
            document.add(new Paragraph("Date: 18-09-2026"));

            document.add(new Paragraph("----------------------------------------"));

            // Table
            PdfPTable table = new PdfPTable(5);

            table.addCell("ID");
            table.addCell("Item Name");
            table.addCell("Quantity");
            table.addCell("Unit Price");
            table.addCell("Total");

            for (BillItemResponse item : billResponse.getItems()) {

                table.addCell(String.valueOf(item.getItemId()));
                table.addCell(item.getItemName());
                table.addCell(String.valueOf(item.getQuantity()));
                table.addCell(String.valueOf(item.getPrice()));
                table.addCell(String.valueOf(item.getItemTotal()));
            }

            document.add(table);

            document.add(new Paragraph("----------------------------------------"));

            // Grand total
            document.add(
                    new Paragraph(
                            "Grand Total: ₹" + billResponse.getTotalAmount()
                    )
            );

            document.add(new Paragraph(""));
            document.add(new Paragraph("Thank You!"));
            document.add(new Paragraph("AK SURGICALS"));

            document.close();

        } catch (DocumentException e) {

            throw new RuntimeException(
                    "Error while generating PDF",
                    e
            );
        }

        return outputStream.toByteArray();
    }
}