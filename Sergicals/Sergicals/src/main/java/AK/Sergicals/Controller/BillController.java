package AK.Sergicals.Controller;

import AK.Sergicals.DTO.BillRequest;
import AK.Sergicals.DTO.BillResponse;
import AK.Sergicals.Service.BillPdfService;
import AK.Sergicals.Service.BillService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bills")
public class BillController {

    private final BillService billService;
    private final BillPdfService billPdfService;

    public BillController(BillService billService, BillPdfService billPdfService) {
        this.billService = billService;
        this.billPdfService = billPdfService;
    }

    @PostMapping
    public BillResponse calculateBill(@RequestBody BillRequest billRequest) {
        return billService.calculateBill(billRequest);
    }

    @PostMapping("/pdf")
    public ResponseEntity<byte[]> generateBillPdf(
            @RequestBody BillRequest billRequest) {

        BillResponse billResponse = billService.calculateBill(billRequest);

        byte[] pdf = billPdfService.generateBillPdf(billResponse);

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=AK-Surgicals-Bill.pdf"
                )
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }
}