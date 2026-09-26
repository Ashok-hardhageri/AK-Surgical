package AK.Sergicals.DTO;

import java.util.List;

public class BillResponse {

    private List<BillItemResponse> items;
    private double totalAmount;

    public BillResponse(List<BillItemResponse> items, double totalAmount) {
        this.items = items;
        this.totalAmount = totalAmount;
    }

    public List<BillItemResponse> getItems() {
        return items;
    }

    public double getTotalAmount() {
        return totalAmount;
    }
}