package AK.Sergicals.Service;

import AK.Sergicals.DTO.BillItemRequest;
import AK.Sergicals.DTO.BillRequest;
import AK.Sergicals.Entity.SurgicalItem;
import AK.Sergicals.Repository.SurgicalItemRepository;
import org.springframework.stereotype.Service;
import AK.Sergicals.DTO.BillItemResponse;
import AK.Sergicals.DTO.BillResponse;
import AK.Sergicals.Repository.BillRepository;
import AK.Sergicals.Repository.BillItemRepository;
import AK.Sergicals.Entity.Bill;
import AK.Sergicals.Entity.BillItem;

import java.time.LocalDate;


import java.util.ArrayList;
import java.util.List;

@Service
public class BillService {

    private final SurgicalItemRepository surgicalItemRepository;
    private final BillRepository billRepository;
    private final BillItemRepository billItemRepository;

    public BillService(
            SurgicalItemRepository surgicalItemRepository,
            BillRepository billRepository,
            BillItemRepository billItemRepository) {

        this.surgicalItemRepository = surgicalItemRepository;
        this.billRepository = billRepository;
        this.billItemRepository = billItemRepository;
    }

//    public double calculateTotal(BillRequest billRequest) {
//
//        double total = 0;
//
//        for (BillItemRequest itemRequest : billRequest.getItems()) {
//
//            SurgicalItem surgicalItem = surgicalItemRepository
//                    .findById(itemRequest.getItemId())
//                    .orElseThrow(() -> new RuntimeException("Surgical item not found"));
//
//            double itemTotal =
//                    surgicalItem.getPrice() * itemRequest.getQuantity();
//
//            total = total + itemTotal;
//        }
//
//        return total;
//    }
    public BillResponse calculateBill(BillRequest billRequest) {

        List<BillItemResponse> billItems = new ArrayList<>();
        double total = 0;

        for (BillItemRequest itemRequest : billRequest.getItems()) {

            SurgicalItem surgicalItem = surgicalItemRepository
                    .findById(itemRequest.getItemId())
                    .orElseThrow(() -> new RuntimeException("Surgical item not found"));

            double itemTotal =
                    surgicalItem.getPrice() * itemRequest.getQuantity();

            BillItemResponse itemResponse = new BillItemResponse(
                    surgicalItem.getId(),
                    surgicalItem.getName(),
                    itemRequest.getQuantity(),
                    surgicalItem.getPrice(),
                    itemTotal
            );

            billItems.add(itemResponse);
            total = total + itemTotal;
        }

        // Save Bill
        Bill bill = new Bill();

        bill.setBillNumber("BILL-" + System.currentTimeMillis());
        bill.setBillDate(LocalDate.now());
        bill.setTotalAmount(total);

        Bill savedBill = billRepository.save(bill);

        // Save Bill Items
        for (BillItemResponse itemResponse : billItems) {

            BillItem billItem = new BillItem();

            billItem.setBillId(savedBill.getId());
            billItem.setItemId(itemResponse.getItemId());
            billItem.setItemName(itemResponse.getItemName());
            billItem.setPrice(itemResponse.getPrice());
            billItem.setQuantity(itemResponse.getQuantity());
            billItem.setItemTotal(itemResponse.getItemTotal());

            billItemRepository.save(billItem);
        }

        return new BillResponse(billItems, total);
    }
}